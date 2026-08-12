# Laboratorio Euronutec — API

Backend en **FastAPI + SQLAlchemy async + PostgreSQL**.

## Estructura del proyecto

```
euronutec-api/
├── app/
│   ├── core/
│   │   ├── config.py       # Variables de entorno (pydantic-settings)
│   │   ├── security.py     # JWT + hashing
│   │   └── email.py        # Envío async de correos
│   ├── db/
│   │   └── session.py      # Engine async + dependencia get_db
│   ├── models/
│   │   ├── service.py      # Service, ServiceCheck, ServiceFAQ
│   │   ├── news.py         # NewsPost, NewsCategory
│   │   └── user.py         # AdminUser, ContactMessage
│   ├── schemas/
│   │   ├── service.py      # Pydantic schemas de servicios
│   │   ├── news.py         # Pydantic schemas de noticias
│   │   └── auth.py         # Token, AdminUser, ContactMessage
│   ├── crud/
│   │   ├── service.py      # CRUD servicios
│   │   ├── news.py         # CRUD noticias
│   │   └── auth.py         # Auth + mensajes de contacto
│   ├── routers/
│   │   ├── services.py     # /api/v1/servicios
│   │   ├── news.py         # /api/v1/noticias
│   │   ├── contact.py      # /api/v1/contacto
│   │   └── auth.py         # /api/v1/auth
│   └── main.py             # Punto de entrada
├── alembic/                # Migraciones
├── requirements.txt
└── .env.example
```

## Instalación

```bash
# 1. Clonar y crear entorno virtual
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales reales

# 4. Crear la base de datos en PostgreSQL
createdb euronutec_db

# 5. Ejecutar migraciones
alembic upgrade head

# 6. Cargar datos iniciales (los 9 servicios)
psql -d euronutec_db -f euronutec_services.sql

# 7. Levantar el servidor
uvicorn app.main:app --reload
```

La API estará disponible en `http://localhost:8000`
Documentación interactiva en `http://localhost:8000/docs`

---

## Endpoints

### Públicos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/servicios` | Cards de servicios (home) |
| GET | `/api/v1/servicios/{slug}` | Detalle de servicio |
| GET | `/api/v1/noticias` | Listado de noticias publicadas |
| GET | `/api/v1/noticias/{slug}` | Detalle de noticia |
| GET | `/api/v1/noticias/categorias` | Categorías del blog |
| POST | `/api/v1/contacto` | Enviar mensaje de contacto |
| POST | `/api/v1/auth/token` | Login (obtener JWT) |

### Admin (requieren Bearer token)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/v1/servicios/admin/all` | Todos los servicios |
| POST | `/api/v1/servicios/admin` | Crear servicio |
| PUT | `/api/v1/servicios/admin/{id}` | Actualizar servicio |
| DELETE | `/api/v1/servicios/admin/{id}` | Eliminar servicio |
| GET | `/api/v1/noticias/admin/all` | Borradores + publicadas |
| POST | `/api/v1/noticias/admin` | Crear noticia |
| PUT | `/api/v1/noticias/admin/{id}` | Actualizar noticia |
| DELETE | `/api/v1/noticias/admin/{id}` | Eliminar noticia |
| GET | `/api/v1/contacto/admin/mensajes` | Ver mensajes |
| PATCH | `/api/v1/contacto/admin/mensajes/{id}/leer` | Marcar como leído |
| POST | `/api/v1/auth/register` | Crear admin (solo admins) |

---

## Crear primer usuario admin

```python
# Ejecutar una vez con Python directamente
import asyncio
from app.db.session import AsyncSessionLocal
from app.crud.auth import create_admin
from app.schemas.auth import AdminUserCreate

async def seed():
    async with AsyncSessionLocal() as db:
        await create_admin(db, AdminUserCreate(
            email="admin@gponutec.com",
            password="CambiaEstaContraseña123",
            full_name="Administrador"
        ))
        await db.commit()
        print("Admin creado")

asyncio.run(seed())
```

## Migraciones con Alembic

```bash
# Crear nueva migración después de cambiar modelos
alembic revision --autogenerate -m "descripcion del cambio"

# Aplicar migraciones pendientes
alembic upgrade head

# Revertir última migración
alembic downgrade -1
```

## Deploy

ng build --configuration production --base-href=http://137.184.132.38/EUROLAB/