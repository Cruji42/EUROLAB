# Migración a estructura standalone (admin y auth)

- [x] Revisar módulos hijos de admin (services-manager, news-manager, users-manager) para extraer sus rutas.
- [x] Crear `src/app/admin/admin.routes.ts` con rutas standalone de admin.
- [x] Crear `src/app/auth/auth.routes.ts` con rutas standalone de auth.
- [x] Crear archivos `*.routes.ts` para módulos hijos de admin y apuntar lazy loading a rutas standalone.
- [x] Actualizar `src/app/app.routes.ts` para cargar `ADMIN_ROUTES` y `AUTH_ROUTES`.
- [x] Ajustar providers en rutas de admin (si aplica) para reemplazar providers de `AdminModule`.
- [ ] Ejecutar build para validar compilación.
- [ ] Marcar limpieza de módulos legacy no usados.
