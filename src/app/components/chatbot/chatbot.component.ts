import {
  Component, OnInit, AfterViewChecked, ElementRef, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface ChatAction {
  type: 'route' | 'download' | 'external' | 'whatsapp' | 'email';
  label: string;
  value: string;
}

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  time: Date;
  suggestions?: string[];
  actions?: ChatAction[];
}

interface Intent {
  name: string;
  keywords: string[];
  responses: string[];
  suggestions?: string[];
  actions?: ChatAction[];
}

// ── Acciones reutilizables ──────────────────────────────────────────────────
const ACTION_CONTACT_FORM: ChatAction = {
  type: 'route',
  label: 'Ir al formulario de contacto',
  value: '/contact'
};

const ACTION_EUROLAB: ChatAction = {
  type: 'external',
  label: 'Ir a EUROLAB',
  value: 'https://eurolab.gponutec.com:8082/'
};

const ACTION_CATALOGO: ChatAction = {
  type: 'download',
  label: 'Descargar Catálogo de Servicios',
  value: 'assets/docs/catalogo-servicios-2026.pdf'
};

const ACTION_WHATSAPP: ChatAction = {
  type: 'whatsapp',
  label: 'Chatear por WhatsApp',
  value: 'https://wa.me/524181098544'
};

const ACTION_EMAIL: ChatAction = {
  type: 'email',
  label: 'Enviar correo al laboratorio',
  value: 'mailto:eurolab@gponutec.com'
};

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('inputRef') inputRef!: ElementRef;

  isOpen = false;
  isTyping = false;
  userInput = '';
  messages: ChatMessage[] = [];
  private shouldScroll = false;

  private intents: Intent[] = [
    {
      name: 'greeting',
      keywords: ['hola', 'buenos', 'buen día', 'buenas', 'saludos', 'hey', 'hi', 'hello', 'qué tal', 'que tal', 'cómo están', 'como estan'],
      responses: [
        '¡Hola! Con gusto te ayudo. ¿Qué necesitas saber sobre nuestros servicios de laboratorio?',
        '¡Bienvenido a Euronutec! Soy tu asistente virtual. ¿En qué te puedo orientar hoy?',
        'Hola, ¿cómo estás? Estoy aquí para ayudarte con cualquier duda sobre nuestro laboratorio.',
      ],
      suggestions: ['Ver servicios de análisis', 'Tiempos de entrega', 'Cómo enviar muestras', 'Hablar con un asesor']
    },
    {
      name: 'servicios_generales',
      keywords: ['servicios', 'qué hacen', 'que hacen', 'qué ofrecen', 'que ofrecen', 'análisis', 'analisis', 'qué analizan', 'que analizan', 'catálogo', 'catalogo', 'oferta'],
      responses: [
        'Realizamos una amplia gama de análisis para la industria agropecuaria y alimentaria:\n\n• **Bromatológicos** (humedad, grasa, proteína, fibras, cenizas)\n• **Microbiológicos** (patógenos, indicadores de higiene)\n• **NIRS** – resultados el mismo día o en 2 días hábiles\n• **Minerales y metales pesados**\n• **Etiqueta nutrimental** (NOM-051 / FDA)\n• **Vida de anaquel**\n• **Residuos** (micotoxinas, plaguicidas)\n\n¿Sobre cuál te gustaría más detalle?',
        'Nuestro laboratorio ofrece análisis bromatológicos, microbiológicos, NIRS, minerales, etiquetado nutrimental, vida de anaquel y mucho más. Todos bajo normas AOAC, ISO y NOM. ¿Hay algún análisis específico que te interese?'
      ],
      suggestions: ['Bromatológico', 'Microbiología', 'Análisis NIRS', 'Minerales', 'Vida de anaquel'],
      actions: [ACTION_CATALOGO]
    },
    {
      name: 'bromatologico',
      keywords: ['bromatológic', 'bromatologic', 'humedad', 'grasa', 'fibra', 'ceniza', 'proteína bruta', 'proximal', 'composición'],
      responses: [
        'El análisis bromatológico tradicional incluye la determinación de: humedad, grasa, proteína (Kjeldahl o Dumas), fibra cruda o detergente (FDA/FDN), cenizas y extracto libre de nitrógeno. El tiempo de entrega es de **6 a 10 días hábiles**. ¿Necesitas alguno en particular o el panel completo?',
        'Para los análisis bromatológicos trabajamos con métodos oficiales AOAC. Cubrimos desde el panel básico (humedad, grasa, proteína, fibra, cenizas) hasta análisis más específicos. ¿Sabes qué parámetros necesitas para tu producto?'
      ],
      suggestions: ['Tiempos de entrega', 'Envío de muestras', 'Solicitar cotización']
    },
    {
      name: 'nirs',
      keywords: ['nirs', 'infrarrojo', 'análisis rápido', 'mismo día', 'onirslab', 'espectroscopía', 'espectroscopia'],
      responses: [
        'El análisis por **NIRS** es nuestra tecnología de espectroscopía de infrarrojo cercano. Las ventajas principales son:\n\n• Resultados en **2 días hábiles** (a veces el mismo día)\n• No destruye la muestra\n• Alta reproducibilidad\n• Ideal para control de calidad de rutina\n\nTambién desarrollamos **curvas y ecuaciones personalizadas** para tu equipo NIRS a través de ONIRSLAB. ¿Te interesa calibrar tu propio equipo?',
        'Con NIRS obtienes resultados en tiempo récord — hasta el mismo día en algunos casos. Es perfecta para control interno en planta. ¿Qué tipo de muestras manejas? Así te puedo decir si aplica para tu proceso.'
      ],
      suggestions: ['Ver análisis bromatológico', 'Equipos ONIRSLAB', 'Solicitar cotización']
    },
    {
      name: 'microbiologia',
      keywords: ['microbiolog', 'bacterias', 'patógenos', 'patogenos', 'hongos', 'levaduras', 'salmonella', 'e. coli', 'coliformes', 'inocuidad', 'plan microbiológ', 'plan microbiol', 'sanitiz', 'limpieza superficies', 'ambiental'],
      responses: [
        'Nuestros análisis microbiológicos incluyen indicadores de higiene (coliformes, aerobios mesófilos), patógenos (Salmonella, E. coli O157:H7, Listeria), hongos y levaduras, además de monitoreo ambiental y superficies. ¿Estás buscando un análisis puntual o un plan de control completo?',
        'Para microbiología manejamos desde pruebas básicas hasta planes completos de monitoreo. Un buen plan considera: puntos críticos de control, frecuencia de muestreo basada en riesgo, límites de tolerancia NOM y validación de limpieza. ¿Necesitas asesoría para diseñar el tuyo?'
      ],
      suggestions: ['Plan microbiológico completo', 'Tiempos de entrega', 'Asesoría con especialista'],
      actions: [ACTION_WHATSAPP, ACTION_EMAIL, ACTION_CONTACT_FORM]
    },
    {
      name: 'vida_anaquel',
      keywords: ['vida de anaquel', 'vida útil', 'shelf life', 'estabilidad', 'caducidad', 'fecha de vencimiento', 'deterioro', 'conservación'],
      responses: [
        'Nuestros estudios de **vida de anaquel** se fundamentan en pruebas de estabilidad físico-química y microbiológica bajo condiciones aceleradas de almacenamiento. ¿Te gustaría que un especialista diseñe el protocolo específico para tu producto?',
        'Para determinar la vida útil de un producto necesitamos conocer su naturaleza, condiciones de almacenamiento y los parámetros críticos de deterioro. ¿De qué tipo de producto se trata?\n\nContáctanos directamente y un especialista te orienta:'
      ],
      suggestions: ['Hablar con especialista', 'Análisis microbiológicos'],
      actions: [ACTION_WHATSAPP, ACTION_EMAIL, ACTION_CONTACT_FORM]
    },
    {
      name: 'proteina',
      keywords: ['proteína', 'proteina', 'kjeldahl', 'dumas', 'nitrógeno', 'nitrogeno', 'digestión ácida', 'digestion acida'],
      responses: [
        'Gran pregunta. **Kjeldahl** y **Dumas** son los dos métodos principales para medir proteína:\n\n**Kjeldahl:** digestión química con ácido sulfúrico, mide nitrógeno total. Es el método de referencia internacional.\n\n**Dumas:** quema la muestra y mide el nitrógeno liberado como gas. Es más rápido, automatizado y más amigable con el medio ambiente.\n\nAmbos suelen dar resultados muy similares cuando se realizan correctamente. ¿Tienes alguna especificación de norma que indique cuál usar?',
      ],
      suggestions: ['Análisis bromatológico completo', 'Tiempos de entrega', 'Solicitar cotización']
    },
    {
      name: 'minerales',
      keywords: ['mineral', 'metales', 'calcio', 'fósforo', 'fosforo', 'sodio', 'hierro', 'zinc', 'cobre', 'magnesio', 'metales pesados', 'plomo', 'cadmio', 'arsénico', 'arsenico'],
      responses: [
        'Realizamos determinaciones de macro y microminerales, así como metales pesados (plomo, cadmio, mercurio, arsénico). El tiempo de entrega para minerales es de hasta **10 días hábiles**. ¿Buscas el perfil de minerales para etiquetado, control de calidad o cumplimiento de alguna norma?',
        'El panel de minerales puede incluir calcio, fósforo, sodio, potasio, magnesio, hierro, zinc, cobre, manganeso y metales pesados. ¿Cuál es el objetivo del análisis?'
      ],
      suggestions: ['Etiqueta nutrimental', 'Tiempos de entrega', 'Solicitar cotización']
    },
    {
      name: 'etiqueta_nutrimental',
      keywords: ['etiqueta', 'nutrimental', 'nom-051', 'nom 051', 'fda', 'declaración nutricional', 'tabla nutricional', 'información nutrimental', 'nutricion', 'nutrición', 'etiquetado'],
      responses: [
        'Para la etiqueta nutrimental realizamos el panel completo: energía, proteína, grasa total, grasa saturada, carbohidratos, azúcares, fibra y sodio. Trabajamos con los formatos requeridos por **NOM-051** (México) y **FDA** (exportación). ¿Necesitas cumplir con algún mercado en específico?',
        'Desarrollamos el análisis fisicoquímico completo para generar tu declaración nutrimental conforme a NOM-051 o FDA. ¿Tu producto va al mercado mexicano, de exportación, o ambos?'
      ],
      suggestions: ['Ver análisis disponibles', 'Tiempos de entrega', 'Contactar asesor'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'tiempos_entrega',
      keywords: ['tiempo', 'cuánto tarda', 'cuanto tarda', 'días', 'dias', 'entrega', 'cuándo', 'cuando', 'plazo', 'resultados'],
      responses: [
        'Los tiempos de entrega varían según el tipo de análisis:\n\n• **Bromatológico tradicional:** 6 a 10 días hábiles\n• **NIRS:** 2 días hábiles\n• **Microbiológico:** 2 a 7 días naturales\n• **Minerales:** hasta 10 días hábiles\n• **Aminoácidos:** 22 días hábiles\n\nSi necesitas resultados antes, contamos con **Servicio Express** con un cargo adicional del 50%. ¿Tienes alguna fecha límite en mente?',
        'Depende del análisis que necesites. Los más rápidos son los NIRS (2 días) y los microbiológicos básicos. Los que más tiempo llevan son aminoácidos (22 días hábiles). ¿Quieres que te diga el tiempo para un análisis específico?'
      ],
      suggestions: ['Servicio express/urgente', 'Seguimiento de muestra', 'Ver todos los análisis']
    },
    {
      name: 'urgente',
      keywords: ['urgente', 'urgencia', 'rápido', 'rapido', 'express', 'prioritario', 'mismo día', 'hoy', 'pronto', 'inmediato', 'emergencia'],
      responses: [
        'Sí, contamos con **Servicio de Urgencia** (entrega prioritaria). Tiene un cargo adicional del **50%** sobre el costo normal del análisis y está sujeto a disponibilidad del laboratorio. ¿Tienes ya tu muestra lista o necesitas orientación para enviarla?',
        'Entiendo la urgencia. Nuestro servicio express tiene un costo adicional del 50% pero te garantiza atención prioritaria. ¿Tu muestra ya está lista para enviar?',
      ],
      suggestions: ['Sí, ya tengo mi muestra lista', 'Necesito orientación para enviarla', 'Contactar asesor'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'muestra_lista',
      keywords: ['ya tengo mi muestra', 'tengo mi muestra', 'muestra lista', 'ya la tengo lista', 'sí ya tengo', 'si ya tengo', 'está lista', 'esta lista', 'lista para enviar', 'muestra preparada', 'preparada', 'sí, ya tengo', 'si, ya tengo', 'ya tengo'],
      responses: [
        '¡Perfecto! Para que tu muestra llegue en las mejores condiciones y podamos procesarla sin contratiempos, sigue estas indicaciones:\n\n1. **Identifícala** claramente (nombre del producto, lote, fecha)\n2. Usa **envases limpios y herméticos** adecuados para el tipo de muestra\n3. Mantén la **temperatura correcta** durante el envío: refrigerada (2–8 °C), congelada (–18 °C) o temperatura ambiente según el análisis\n4. Si es para análisis microbiológico, **bolsa estéril obligatoria**\n\nRegistra tu solicitud y da seguimiento a través de nuestro portal EUROLAB:',
        '¡Excelente! Antes de enviar asegúrate de: identificar bien la muestra (nombre, lote, fecha), usar el envase adecuado, mantener la cadena de frío si aplica. Para microbiológicos es obligatoria la bolsa estéril. Registra tu solicitud en EUROLAB y nos coordinas el envío:'
      ],
      suggestions: ['Ver tiempos de entrega', 'Seguimiento de mi muestra', 'Hablar con especialista'],
      actions: [ACTION_EUROLAB, ACTION_CONTACT_FORM]
    },
    {
      name: 'estatus_seguimiento',
      keywords: ['estatus', 'seguimiento', 'avance', 'folio', 'portal', 'eurolab online', 'mis resultados', 'cómo voy', 'estado de mi muestra', 'rastrear'],
      responses: [
        'Puedes revisar el avance de tu muestra en **tiempo real** a través de nuestro portal **EUROLAB ONLINE**. Si ya tienes credenciales, ingresa con tu usuario. Si aún no tienes acceso, puedes solicitarlo con tu ejecutivo de cuenta. ¿Tienes tu folio a la mano?',
        'Todos los resultados están disponibles en nuestra plataforma EUROLAB ONLINE. Ahí puedes ver el estatus en tiempo real, descargar reportes en PDF e historial de análisis.'
      ],
      suggestions: ['Correcciones en mi reporte', 'Solicitar repetición', 'Contactar soporte'],
      actions: [
        { type: 'external', label: 'Acceder a EUROLAB Online', value: 'https://eurolab.gponutec.com:8082/login.aspx' }
      ]
    },
    {
      name: 'correcciones',
      keywords: ['corrección', 'correccion', 'error', 'equivocado', 'dato mal', 'nombre mal', 'lote incorrecto', 'aclaración', 'aclaracion', 'duda del resultado'],
      responses: [
        'Para **correcciones de datos** (número de lote, nombre de muestra, etc.) puedes enviar un correo a **lramirez@gponutec.com** indicando el folio y la corrección.\n\nSi tienes una **aclaración técnica** sobre un resultado, nuestro jefe de área te contactará en menos de 24 horas. ¿Me puedes dejar tu nombre y correo para coordinar?',
        'Claro, distingamos dos casos: si es un dato administrativo (lote, nombre), escribe a lramirez@gponutec.com. Si es una duda técnica sobre el resultado, lo más conveniente es que nuestro especialista te llame. ¿Cuál es tu caso?'
      ],
      suggestions: ['Repetición de análisis', 'Ver estatus'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'repeticion',
      keywords: ['repetir', 'repetición', 'repeticion', 'análisis duplicado', 'confirmar resultado', 'contraanálisis', 'contra-análisis', 'segunda opinión'],
      responses: [
        'Si tienes dudas sobre un resultado, puedes solicitar la **repetición del análisis** dentro de un plazo determinado posterior a la entrega. Si el resultado se confirma, se aplica el costo normal. Si hay desviación, la repetición corre por nuestra cuenta.\n\nIndícanos tu folio por cualquiera de estos canales y lo gestionamos de inmediato:',
      ],
      suggestions: ['Aclaraciones técnicas', 'Ver portal EUROLAB'],
      actions: [ACTION_WHATSAPP, ACTION_EMAIL, ACTION_CONTACT_FORM]
    },
    {
      name: 'alta_cliente',
      keywords: ['alta', 'nuevo cliente', 'registrar', 'contratar', 'cómo me registro', 'como me registro', 'quiero ser cliente', 'laboratorio externo', 'proveedor', 'constancia fiscal', 'situación fiscal'],
      responses: [
        'Para darte de alta como cliente y registrar tus solicitudes de análisis, todo el proceso se realiza a través de nuestro portal **EUROLAB**. Ahí podrás crear tu cuenta, cargar tus documentos y dar seguimiento a tus servicios.',
        'El proceso de alta es muy sencillo a través de nuestro portal EUROLAB. Regístrate ahí y un ejecutivo te dará seguimiento.'
      ],
      suggestions: ['Catálogo de precios', 'Ubicación del laboratorio'],
      actions: [ACTION_EUROLAB, ACTION_CONTACT_FORM]
    },
    {
      name: 'catalogo_precios',
      keywords: ['precio', 'costo', 'cuánto cuesta', 'cuanto cuesta', 'cotización', 'cotizacion', 'tarifa', 'valor', 'cuánto cobran', 'cuanto cobran', 'catálogo', 'catalogo'],
      responses: [
        'Los precios varían según el tipo de análisis, volumen y condiciones de servicio. Para una **cotización personalizada**, déjanos tu información a través del formulario de contacto y un ejecutivo te responde en menos de 24 horas.',
        'No manejamos lista de precios pública porque cada cliente tiene necesidades distintas. Lo ideal es contactarnos para darte un precio justo según tu volumen y tipo de análisis.'
      ],
      suggestions: ['Alta de cliente', 'Servicios disponibles'],
      actions: [ACTION_CATALOGO, ACTION_CONTACT_FORM]
    },
    {
      name: 'ubicacion_contacto',
      keywords: ['ubicación', 'ubicacion', 'dirección', 'direccion', 'dónde están', 'donde estan', 'querétaro', 'queretaro', 'visitar', 'oficina', 'contacto', 'teléfono', 'telefono', 'whatsapp', 'correo'],
      responses: [
        'Estamos ubicados en **Querétaro, Querétaro**. Para la dirección exacta y datos de contacto completos, visita nuestro formulario de contacto.',
        'Nuestras instalaciones están en Querétaro. También recibimos muestras de todo el país mediante mensajería especializada. ¿Necesitas más información?'
      ],
      suggestions: ['¿Cómo envío mi muestra?', 'Alta de cliente'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'acreditacion',
      keywords: ['acreditado', 'acreditación', 'acreditacion', 'certificado', 'iso 17025', 'iso17025', 'confiable', 'oficial', 'aprobado', 'sader', 'reconocimiento'],
      responses: [
        'Sí, contamos con **acreditación ISO/IEC 17025** ante la EMA (Entidad Mexicana de Acreditación), lo que garantiza nuestra competencia técnica. También estamos **aprobados por SADER** como laboratorio de constatación y de control interno. ¿Necesitas la constancia de acreditación para algún trámite?',
      ],
      suggestions: ['Ver servicios disponibles', 'Normas que utilizamos', 'Alta de cliente'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'tipo_muestras',
      keywords: ['qué muestras', 'que muestras', 'tipo de muestra', 'qué aceptan', 'que aceptan', 'qué reciben', 'que reciben'],
      responses: [
        'Recibimos una gran variedad de muestras:\n\n• **Alimentos balanceados** (para animales)\n• **Materias primas** (harinas, granos, subproductos)\n• **Agua** (potable, residual, de proceso)\n• **Alimentos para consumo humano**\n• **Suplementos y aditivos**\n\n¿Qué tipo de muestra tienes? Selecciona o escríbelo y te oriento sobre cómo prepararla y enviarla.',
      ],
      suggestions: ['Alimento balanceado', 'Materia prima o granos', 'Agua', 'Alimento consumo humano', 'Suplementos o aditivos']
    },
    {
      name: 'confirma_muestra',
      keywords: [
        'alimento balanceado', 'balanceado', 'pienso', 'alimento para animal',
        'materia prima', 'materia prima o granos', 'harina', 'grano', 'sorgo', 'maíz', 'maiz', 'soya', 'trigo', 'subproducto', 'salvado', 'pasta de soya',
        'agua potable', 'agua residual', 'agua de proceso', 'agua de pozo', 'agua de grifo',
        'alimento consumo humano', 'alimento para consumo humano', 'producto alimenticio', 'alimento humano',
        'suplemento', 'suplementos o aditivos', 'aditivo', 'premezcla', 'vitamina', 'mineral premix',
        'leche', 'carne', 'pescado', 'huevo', 'lácteo', 'lacteo', 'ingrediente', 'mi muestra es', 'tengo una muestra', 'quiero analizar', 'voy a enviar'
      ],
      responses: [
        '¡Perfecto! Para que tu muestra llegue en óptimas condiciones y podamos procesarla sin contratiempos:\n\n1. **Identifícala** claramente: nombre del producto, lote y fecha\n2. Usa **envases limpios y herméticos** adecuados al tipo de muestra\n3. Mantén la **temperatura correcta** durante el envío: refrigerada (2–8 °C), congelada (–18 °C) o temperatura ambiente según el análisis\n4. Si es microbiológico, **bolsa estéril obligatoria**\n\nRegistra tu solicitud a través de nuestro portal EUROLAB y contáctanos para coordinar la recepción:',
        '¡Excelente, podemos trabajar con esa muestra! Para enviarla correctamente: identifícala bien (nombre, lote, fecha), usa el envase adecuado, conserva la cadena de frío si aplica. Para microbiológicos siempre en bolsa estéril.\n\nRegistra tu solicitud en nuestro portal EUROLAB:'
      ],
      suggestions: ['Ver tiempos de entrega', 'Servicio urgente', 'Hablar con especialista'],
      actions: [ACTION_EUROLAB, ACTION_CONTACT_FORM]
    },
    {
      name: 'como_enviar',
      keywords: ['cómo envío', 'como envio', 'enviar muestra', 'mandar muestra', 'empacar', 'empaque', 'refrigerar', 'congelar', 'paquetería', 'envío', 'envio', 'requisitos de muestra', 'cuánta muestra', 'cuanta muestra'],
      responses: [
        'Para enviar tus muestras correctamente:\n\n1. **Identifícalas** claramente (nombre, lote, fecha)\n2. **Envases limpios y adecuados** para cada tipo de muestra\n3. **Temperatura correcta:** refrigeradas (2-8°C), congeladas (-18°C) o temperatura ambiente según el análisis\n4. Para microbiológicos: **bolsa estéril** es obligatoria\n\nRegistra tu solicitud a través de nuestro portal EUROLAB. ¿Quieres que te enviemos información adicional por correo?',
        'El cuidado en el envío es crucial para resultados confiables. Lo más importante: identificación clara, envase adecuado y temperatura correcta. Para microbiología siempre en bolsa estéril. Registra tu solicitud en el portal EUROLAB.'
      ],
      suggestions: ['Tipo de análisis', 'Tiempos de entrega', 'Contactar asesor'],
      actions: [ACTION_EUROLAB, ACTION_CONTACT_FORM]
    },
    {
      name: 'solicitar_formatos',
      keywords: ['formato', 'formatos', 'solicitud de servicio', 'formulario', 'descargar', 'descarga', 'documento', 'solicitar formato', 'solicitud análisis', 'solicitud credito'],
      responses: [
        'Claro, el registro de solicitudes y la documentación se manejan a través de nuestro portal EUROLAB. También puedes descargar nuestro catálogo de servicios:',
        'Con gusto. Ingresa a nuestro portal EUROLAB para registrar tu solicitud, y aquí puedes descargar el catálogo de servicios:'
      ],
      suggestions: ['Cómo enviar muestras', 'Alta de cliente', 'Contactar asesor'],
      actions: [ACTION_CATALOGO, ACTION_EUROLAB]
    },
    {
      name: 'normas_metodos',
      keywords: ['normas', 'métodos', 'metodos', 'aoac', 'iso', 'nom', 'método oficial', 'metodo oficial', 'referencia', 'validado', 'estándar', 'estandar'],
      responses: [
        'Trabajamos con los métodos más reconocidos a nivel internacional:\n\n• **AOAC International** – estándar de referencia para análisis de alimentos\n• **ISO** – métodos internacionales para diversas matrices\n• **NOM** – Normas Oficiales Mexicanas\n\nNuestros métodos están validados y son auditados bajo la norma ISO/IEC 17025. ¿Tienes algún requerimiento específico de método?',
      ],
      suggestions: ['Acreditación del laboratorio', 'Ver análisis disponibles', 'Contactar especialista']
    },
    {
      name: 'muestreo_campo',
      keywords: ['muestreo en campo', 'muestreo en sitio', 'visita', 'toma de muestra', 'ir a mi planta', 'a domicilio', 'in situ', 'in-situ'],
      responses: [
        'Sí, ofrecemos el servicio de **toma de muestras en sitio**, dependiendo de la ubicación y el tipo de análisis requerido. ¿En qué estado de la república se encuentra tu planta?',
      ],
      suggestions: ['Plan microbiológico', 'Solicitar cotización'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'ubicacion_planta',
      keywords: [
        'aguascalientes', 'baja california', 'baja california sur', 'campeche', 'chiapas', 'chihuahua',
        'ciudad de mexico', 'ciudad de méxico', 'cdmx', 'df', 'coahuila', 'colima', 'durango',
        'guanajuato', 'guerrero', 'hidalgo', 'jalisco', 'guadalajara', 'estado de mexico', 'estado de méxico',
        'edomex', 'michoacan', 'michoacán', 'morelos', 'nayarit', 'nuevo leon', 'nuevo león', 'monterrey',
        'oaxaca', 'puebla', 'queretaro', 'querétaro', 'quintana roo', 'san luis potosi', 'san luis potosí',
        'sinaloa', 'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatan', 'yucatán', 'zacatecas',
        'estoy en', 'mi planta está en', 'mi planta esta en', 'me encuentro en', 'ubicado en', 'ubicada en',
        'somos de', 'somos del', 'estamos en', 'norte', 'sur', 'occidente', 'oriente', 'bajio', 'bajío'
      ],
      responses: [
        '¡Perfecto! Con tu ubicación podemos verificar disponibilidad y coordinar todos los detalles de la visita: fecha, tipo de análisis en campo, logística y costos. Contáctanos y con gusto te preparamos una propuesta:',
        'Muy bien, con esa información podemos evaluar la factibilidad y planificar la visita. Ponemos en contacto a nuestro equipo de muestreo contigo para afinar los detalles:'
      ],
      suggestions: ['Plan microbiológico', 'Solicitar cotización', 'Ver tiempos de entrega'],
      actions: [ACTION_WHATSAPP, ACTION_EMAIL, ACTION_CONTACT_FORM]
    },
    {
      name: 'confidencialidad',
      keywords: ['confidencial', 'confidencialidad', 'privacidad', 'datos', 'información privada', 'discreción', 'sigilo'],
      responses: [
        'Todos los resultados e información de nuestros clientes se manejan bajo estrictos principios de **confidencialidad**. Solo personal autorizado tiene acceso a tus reportes, y bajo la norma ISO/IEC 17025 la confidencialidad es un requisito obligatorio. ¿Tienes alguna otra pregunta?',
      ],
      suggestions: ['Acreditación', 'Alta de cliente']
    },
    {
      name: 'equipos_tecnologia',
      keywords: ['equipo', 'nirslab', 'onirslab', 'durabilímetro', 'durabilimetro', 'dura-test', 'insumos', 'venta de equipo', 'verificación', 'verificacion', 'tecnología', 'tecnologia', 'pellet'],
      responses: [
        'Además de análisis de laboratorio, ofrecemos tecnología para tu empresa:\n\n• **ONIRSLAB** – desarrollo de curvas y ecuaciones para tus equipos NIRS\n• **Durabilímetro DURA-TEST** – para medir calidad de pellet\n• **Insumos para pruebas rápidas**\n• **Verificación y venta de equipo de laboratorio**\n\n¿Cuál de estas soluciones te interesa?',
      ],
      suggestions: ['Desarrollo NIRS', 'Durabilímetro DURA-TEST', 'Contactar ejecutivo'],
      actions: [ACTION_CONTACT_FORM]
    },
    {
      name: 'asesor_comercial',
      keywords: ['asesor', 'ejecutivo', 'vendedor', 'hablar con alguien', 'hablar con especialista', 'especialista', 'persona', 'humano', 'representante', 'comercial', 'llamar', 'llamada', 'whatsapp', 'dejar mis datos', 'dejar datos', 'asesoría con especialista', 'asesoria'],
      responses: [
        'Con gusto te comunico con uno de nuestros especialistas. Puedes contactarnos directamente por WhatsApp, enviarnos un correo o llenar el formulario y nosotros te llamamos:',
        'Claro, un especialista puede orientarte de forma personalizada. Elige la opción que te sea más cómoda:'
      ],
      suggestions: ['Solicitar cotización', 'Ver servicios'],
      actions: [ACTION_WHATSAPP, ACTION_EMAIL, ACTION_CONTACT_FORM]
    },
    {
      name: 'servicios_nacionales',
      keywords: ['nacional', 'todo el país', 'otro estado', 'fuera de querétaro', 'envío nacional', 'lejos', 'mensajería'],
      responses: [
        'Sí, atendemos clientes de **todo el país**. Recibimos muestras mediante servicios de mensajería especializados con cadena de frío cuando aplica. ¿En qué ciudad te encuentras?',
      ],
      suggestions: ['Cómo enviar muestras', 'Tiempos de entrega', 'Solicitar cotización']
    },
    {
      name: 'muestra_rechazada',
      keywords: ['muestra rechazada', 'no cumple', 'muestra inadecuada', 'rechazar', 'condiciones especiales'],
      responses: [
        'Si una muestra llega en condiciones que no cumplen los requisitos, te notificamos de inmediato. Podemos rechazarla para que envíes una nueva, o procesarla bajo condiciones especiales previa autorización tuya. Siempre te consultamos antes.',
      ],
      suggestions: ['Cómo enviar correctamente', 'Contactar soporte', 'Tiempos de entrega'],
      actions: [ACTION_EUROLAB]
    },
    {
      name: 'gracias',
      keywords: ['gracias', 'muchas gracias', 'muy amable', 'excelente', 'perfecto', 'entendido', 'adiós', 'adios', 'hasta luego', 'bye', 'ok gracias', 'listo'],
      responses: [
        'Con mucho gusto. Si en algún momento necesitas más información, aquí estaré. ¡Que tengas un excelente día!',
        '¡Para eso estamos! No dudes en escribir si tienes más preguntas. Hasta pronto.',
        'Fue un placer ayudarte. Estamos para servirte cuando lo necesites.'
      ],
      suggestions: ['Ver servicios', 'Hablar con ejecutivo']
    }
  ];

  private readonly GREETING_MESSAGE: ChatMessage = {
    role: 'bot',
    text: '¡Hola! Bienvenido al asistente virtual de **Laboratorio Euronutec**. Soy Diana y estoy aquí para ayudarte con cualquier duda sobre nuestros servicios de análisis. ¿En qué te puedo orientar?',
    time: new Date(),
    suggestions: ['Servicios de análisis', 'Tiempos de entrega', 'Cómo enviar muestras', 'Hablar con un asesor']
  };

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.messages.push({ ...this.GREETING_MESSAGE, time: new Date() });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.shouldScroll = true;
      setTimeout(() => this.inputRef?.nativeElement?.focus(), 100);
    }
  }

  closeChat() {
    this.isOpen = false;
  }

  sendMessage(text?: string) {
    const msg = (text ?? this.userInput).trim();
    if (!msg) return;

    this.messages.push({ role: 'user', text: msg, time: new Date() });
    this.userInput = '';
    this.shouldScroll = true;
    this.isTyping = true;

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      this.isTyping = false;
      const response = this.getResponse(msg);
      this.messages.push(response);
      this.shouldScroll = true;
      this.cdr.detectChanges();
    }, delay);
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  navigateTo(path: string) {
    this.isOpen = false;
    this.router.navigate([path]);
  }

  getActionIcon(action: ChatAction): string {
    if (action.type === 'route') return 'fa-solid fa-paper-plane';
    if (action.type === 'download') return 'fa-solid fa-download';
    return 'fa-solid fa-arrow-up-right-from-square';
  }

  private getResponse(input: string): ChatMessage {
    const normalized = input.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const intent = this.detectIntent(normalized);
    const responses = intent.responses;
    const text = responses[Math.floor(Math.random() * responses.length)];
    return {
      role: 'bot',
      text,
      time: new Date(),
      suggestions: intent.suggestions,
      actions: intent.actions
    };
  }

  private detectIntent(input: string): Intent {
    let bestMatch: Intent | null = null;
    let bestScore = 0;

    for (const intent of this.intents) {
      let score = 0;
      for (const kw of intent.keywords) {
        const normalizedKw = kw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (input.includes(normalizedKw)) score += normalizedKw.length;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = intent;
      }
    }

    if (bestMatch && bestScore > 0) return bestMatch;
    return this.getFallbackIntent();
  }

  private getFallbackIntent(): Intent {
    const fallbacks = [
      'Hmm, no estoy segura de haber entendido bien tu pregunta. ¿Me podrías dar un poco más de contexto? También puedo orientarte en estos temas:',
      'Quiero ayudarte bien. ¿Podrías reformular tu pregunta? Puedo informarte sobre análisis, tiempos de entrega, envío de muestras, precios y más.',
      'No quiero darte información incorrecta. ¿Podrías ser más específico? O si prefieres, te conecto directamente con un asesor.'
    ];
    return {
      name: 'fallback',
      keywords: [],
      responses: [fallbacks[Math.floor(Math.random() * fallbacks.length)]],
      suggestions: ['Servicios de análisis', 'Tiempos de entrega', 'Hablar con un asesor', 'Cómo enviar muestras'],
      actions: [ACTION_CONTACT_FORM]
    };
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  formatText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
}
