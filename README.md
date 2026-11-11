# Handy — Nuxt 3 + Vuetify

Plataforma web de mano de obra doméstica verificada, enfocada en Montería, que conecta
clientes con trabajadores de distintos oficios (limpieza, cocina, cuidado de personas,
albañilería, jardinería, entre otros).

Este proyecto fue migrado desde una app Vue 3 + Vite a **Nuxt 3**, e integra **Vuetify 3**
como librería de componentes (a través de `vuetify-nuxt-module`), manteniendo el login y
el registro que ya existían.

## 🚀 Instalación

```bash
npm install
npm run dev
```

La app quedará disponible en `http://localhost:3000`.

## 📁 Estructura principal

```
pages/
  index.vue      → Landing con carrusel, "nuestra idea", cómo funciona y roles
  login.vue      → Login/registro (antes era App.vue), reutiliza LoginForm/RegisterForm
components/
  LoginForm.vue
  RegisterForm.vue
layouts/
  default.vue    → Barra de navegación (v-app-bar) + footer, envuelve todo en <v-app>
assets/css/
  tema.css       → Variables de color del proyecto (se mantienen igual)
  formulario.css → Estilos compartidos de login/registro
public/img/
  hero.png       → Imagen usada en la sección "Nuestra idea"
```

## 🎠 Sobre las imágenes del carrusel

Las imágenes del carrusel de la página de inicio (`pages/index.vue`) se cargan
actualmente desde un servicio de imágenes de ejemplo (`loremflickr.com`) como
**placeholder temático** (limpieza, cocina, cuidado de personas, construcción,
jardinería), para que puedas ver el diseño funcionando de inmediato.

**Antes de pasar a producción**, reemplaza esas URLs en el array `slides` de
`pages/index.vue` por fotografías propias del proyecto (por ejemplo, guardadas en
`public/img/carrusel/` y referenciadas como `/img/carrusel/nombre.jpg`).

## 🧭 Navegación

- `/` → Página de inicio pública, con botones "Iniciar sesión" y "Crear cuenta" que
  llevan a `/login` y `/login?registro=1` respectivamente.
- `/login` → Formulario de login; si llega con `?registro=1` abre directamente el
  formulario de registro.

## 🔜 Próximos pasos sugeridos

- Conectar `LoginForm.vue` y `RegisterForm.vue` a una API real (actualmente simulan
  la autenticación con `localStorage`, tal como en el proyecto original).
- Agregar CAPTCHA y verificación de 6 dígitos en el login/recuperación de contraseña.
- Crear las vistas de perfil de trabajador, publicación de solicitudes, postulaciones,
  contratos, calificaciones, reportes y notificaciones descritas en la idea del proyecto.
- Definir los roles (cliente / trabajador / administrador) con middleware de Nuxt
  (`middleware/`) para proteger rutas según el tipo de usuario autenticado.
