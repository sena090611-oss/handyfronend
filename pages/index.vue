<script setup>
const mostrarImagenCompleta = ref(false)
const pasoSeleccionado = ref(null)
const rolSeleccionado = ref(null)
const pasoActivo = ref(0)

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
    etiqueta: 'Hogar',
    titulo: 'Limpieza del hogar',
    texto: 'Encuentra personal de limpieza verificado, con experiencia y buenas referencias.',
  },
  {
    img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80',
    etiqueta: 'Cocina',
    titulo: 'Cocina y preparación de alimentos',
    texto: 'Contrata cocineros y cocineras con formación empírica o profesional según lo que necesites.',
  },
  {
    img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1600&q=80',
    etiqueta: 'Cuidado',
    titulo: 'Cuidado de personas',
    texto: 'Cuidadores capacitados para el acompañamiento de niños, adultos mayores o personas en condición de discapacidad.',
  },
  {
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    etiqueta: 'Construcción',
    titulo: 'Albañilería',
    texto: 'Trabajadores de la construcción disponibles por zona y disponibilidad para arreglos y obras menores.',
  },
  {
    img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1600&q=80',
    etiqueta: 'Exterior',
    titulo: 'Jardinería',
    texto: 'Servicios de mantenimiento de jardines y zonas verdes con portafolio de trabajos anteriores.',
  },
]

const pasos = [
  {
    icono: 'bi-person-plus-fill',
    titulo: 'Regístrate',
    texto: 'Crea tu cuenta como cliente o como trabajador en pocos minutos.',
    detalle: 'Crea tu perfil eligiendo si necesitas contratar un servicio o si quieres ofrecer tus habilidades. Completa tus datos básicos para que la plataforma pueda mostrarte opciones relevantes y mantener una experiencia segura desde el primer momento.',
  },
  {
    icono: 'bi-search',
    titulo: 'Busca o publica',
    texto: 'Los clientes buscan trabajadores por oficio, zona y disponibilidad, o publican una solicitud de servicio.',
    detalle: 'Explora trabajadores según el oficio, la zona, la formación y la disponibilidad que necesitas. También puedes publicar una solicitud con los detalles del servicio para recibir postulaciones de personas interesadas.',
  },
  {
    icono: 'bi-patch-check-fill',
    titulo: 'Verificación',
    texto: 'Cada trabajador registra y sustenta sus documentos para generar confianza dentro de la plataforma.',
    detalle: 'Los trabajadores presentan la información y los documentos solicitados para respaldar su identidad, experiencia y formación. Esta revisión ayuda a que los clientes tomen decisiones con mayor confianza.',
  },
  {
    icono: 'bi-chat-dots-fill',
    titulo: 'Postulación y selección',
    texto: 'Los trabajadores se postulan a las solicitudes y los clientes eligen al candidato más adecuado.',
    detalle: 'Los trabajadores revisan las oportunidades disponibles y se postulan a las que coinciden con su perfil. El cliente compara las propuestas, revisa la información de cada candidato y selecciona la opción más conveniente.',
  },
  {
    icono: 'bi-clipboard-check-fill',
    titulo: 'Contrato y seguimiento',
    texto: 'La plataforma gestiona el contrato del servicio y su estado hasta finalizar el trabajo.',
    detalle: 'Cuando ambas partes llegan a un acuerdo, el servicio queda registrado con sus condiciones y estado. Así puedes hacer seguimiento al avance del trabajo y conservar la información importante del proceso.',
  },
  {
    icono: 'bi-star-fill',
    titulo: 'Calificación',
    texto: 'Al terminar, clientes y trabajadores se califican mutuamente, construyendo reputación dentro del sistema.',
    detalle: 'Al finalizar el servicio, ambas partes pueden compartir su experiencia mediante una calificación. Estas opiniones ayudan a construir una reputación confiable y orientan a futuros clientes y trabajadores.',
  },
]

const roles = [
  {
    icono: 'bi-person-workspace',
    titulo: 'Clientes',
    texto: 'Buscan trabajadores según profesión, zona, formación, experiencia y disponibilidad, y publican solicitudes de servicio.',
    detalle: 'Los clientes pueden explorar perfiles confiables, comparar experiencia y disponibilidad, y publicar solicitudes con los detalles del servicio que necesitan. Así encuentran una opción adecuada para su hogar de forma más rápida y organizada.',
  },
  {
    icono: 'bi-tools',
    titulo: 'Trabajadores',
    texto: 'Administran su perfil, sus oficios, su nivel de formación, zonas de trabajo, disponibilidad y portafolio de trabajos anteriores.',
    detalle: 'Los trabajadores muestran sus habilidades, formación, experiencia y trabajos anteriores en un solo perfil. También pueden encontrar oportunidades compatibles con sus oficios y administrar sus postulaciones.',
  },
  {
    icono: 'bi-shield-lock-fill',
    titulo: 'Administradores',
    texto: 'Gestionan usuarios, verifican documentos de los trabajadores, revisan reportes y supervisan la plataforma.',
    detalle: 'Los administradores mantienen la calidad y seguridad de la plataforma. Revisan documentos, gestionan usuarios, atienden reportes y supervisan que el proceso funcione correctamente para todos.',
  },
]

const seleccionarPaso = (indice) => {
  pasoActivo.value = indice
  pasoSeleccionado.value = { ...pasos[indice], numero: indice + 1 }
}

const moverPaso = (direccion) => {
  const siguiente = pasoActivo.value + direccion

  if (siguiente >= 0 && siguiente < pasos.length) {
    seleccionarPaso(siguiente)
  }
}

const finalizarFlujo = () => {
  pasoSeleccionado.value = null
  window.location.reload()
}
</script>

<template>
  <div>
    <!-- CARRUSEL PRINCIPAL -->
    <section class="carrusel-seccion">
      <v-carousel
        height="520"
        cycle
        hide-delimiter-background
        show-arrows="hover"
        interval="6000"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <div class="slide" :style="{ backgroundImage: `url(${slide.img})` }">
            <div class="slide-overlay" />
            <div class="slide-glow" />
            <v-container class="slide-contenido">
              <span class="slide-etiqueta">{{ slide.etiqueta }}</span>
              <h2>{{ slide.titulo }}</h2>
              <p>{{ slide.texto }}</p>
              <div class="slide-acciones">
                <v-btn color="secondary" class="text-primary" size="large" to="/login">
                  Solicitar servicio
                </v-btn>
              </div>
            </v-container>
          </div>
        </v-carousel-item>
      </v-carousel>

      <v-container class="texto-hero">
        <h1>Mano de obra doméstica verificada en Montería</h1>
        <p>
          Conectamos de forma sencilla y segura a personas que necesitan contratar
          servicios domésticos con trabajadores confiables de distintos oficios.
        </p>
        <div class="botones-hero">
          <v-btn size="large" color="primary" to="/login">
            Iniciar sesión
          </v-btn>
          <v-btn size="large" variant="outlined" color="primary" to="/login?registro=1">
            Crear cuenta
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- NUESTRA IDEA -->
    <section id="nosotros" class="seccion">
      <v-container>
        <v-row align="center" class="idea-row">
          <v-col cols="12" md="6">
            <div class="idea-copy">
              <span class="eyebrow">Nuestra idea</span>
              <h2 class="titulo-seccion">Conectamos confianza y oportunidades</h2>
              <p class="parrafo">
                Handy nace para facilitar la contratación de mano de obra doméstica
                en Montería, ofreciendo un espacio donde los clientes puedan encontrar
                trabajadores confiables y los trabajadores puedan mostrar sus capacidades,
                experiencia y formación.
              </p>
              <p class="parrafo">
                Buscamos reducir la informalidad y aumentar la seguridad y la confianza
                durante todo el proceso de contratación, desde la búsqueda inicial hasta
                la calificación final del servicio.
              </p>
              <div class="beneficios-lista">
                <span>Verificación real</span>
                <span>Servicios por zona</span>
                <span>Reputación clara</span>
                <span>Selección segura</span>
              </div>
              <ul class="lista-check">
                <li><i class="bi bi-check-circle-fill"></i> Verificación real de documentos de los trabajadores</li>
                <li><i class="bi bi-check-circle-fill"></i> Búsqueda por oficio, zona, formación y disponibilidad</li>
                <li><i class="bi bi-check-circle-fill"></i> Portafolio de trabajos anteriores</li>
                <li><i class="bi bi-check-circle-fill"></i> Sistema de calificaciones y reputación</li>
                <li><i class="bi bi-check-circle-fill"></i> Autenticación con CAPTCHA y códigos de verificación</li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="idea-visual">
              <v-img
                src="/img/infografia-handy.png"
                alt="Infografía de Handy: cómo funciona la plataforma"
                class="rounded-xxl elevation-6 idea-imagen"
                contain
                role="button"
                tabindex="0"
                aria-label="Abrir infografía en pantalla completa"
                @click="mostrarImagenCompleta = true"
                @keydown.enter="mostrarImagenCompleta = true"
                @keydown.space.prevent="mostrarImagenCompleta = true"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-dialog
      v-model="mostrarImagenCompleta"
      fullscreen
      scrim="black"
      transition="dialog-bottom-transition"
    >
      <v-card class="visor-imagen">
        <v-toolbar color="transparent" class="visor-toolbar">
          <v-spacer />
          <v-btn
            icon="bi bi-x-lg"
            variant="text"
            color="white"
            aria-label="Cerrar imagen ampliada"
            @click="mostrarImagenCompleta = false"
          />
        </v-toolbar>
        <div class="visor-contenido">
          <img
            src="/img/infografia-handy.png"
            alt="Infografía de Handy ampliada"
            class="imagen-pantalla-completa"
          >
        </div>
      </v-card>
    </v-dialog>

    <!-- CÓMO FUNCIONA -->
    <section id="como-funciona" class="seccion seccion-alterna">
      <v-container>
        <div class="section-header text-center mb-8">
          <span class="eyebrow eyebrow-alt">¿Cómo funciona?</span>
          <h2 class="titulo-seccion text-center">Un proceso claro y seguro</h2>
          <p class="flujo-introduccion">
            Explora cada etapa para entender cómo Handy conecta una necesidad con un servicio confiable.
          </p>
        </div>
        <v-row class="flujo-grid">
          <v-col v-for="(paso, i) in pasos" :key="i" cols="12" sm="6" md="4" class="paso-col">
            <v-card
              class="pa-5 h-100 paso-card"
              :class="{
                'paso-activo': pasoActivo === i,
                'paso-completado': i < pasoActivo,
              }"
              variant="flat"
              color="surface"
              role="button"
              tabindex="0"
              :aria-label="`Ver más información sobre ${paso.titulo}`"
              @click="seleccionarPaso(i)"
              @keydown.enter="seleccionarPaso(i)"
              @keydown.space.prevent="seleccionarPaso(i)"
            >
              <div class="paso-topo">
                <div class="numero-paso">
                  <i v-if="i < pasoActivo" class="bi bi-check-lg"></i>
                  <span v-else>0{{ i + 1 }}</span>
                </div>
                <div class="icono-paso">
                  <i :class="`bi ${paso.icono}`"></i>
                </div>
              </div>
              <span class="paso-estado">
                {{ i < pasoActivo ? 'Completado' : pasoActivo === i ? 'En curso' : `Paso 0${i + 1}` }}
              </span>
              <h3>{{ paso.titulo }}</h3>
              <p>{{ paso.texto }}</p>
              <span class="paso-enlace">
                {{ pasoActivo === i ? 'Paso actual' : 'Ver detalles' }}
                <i :class="pasoActivo === i ? 'bi bi-check-circle-fill' : 'bi bi-arrow-right'"></i>
              </span>
            </v-card>
          </v-col>
        </v-row>
        <div class="flujo-controles" aria-label="Controles del flujo">
          <v-btn
            variant="outlined"
            color="primary"
            :disabled="pasoActivo === 0"
            @click="moverPaso(-1)"
          >
            <i class="bi bi-arrow-left me-2"></i>
            Anterior
          </v-btn>
          <span class="flujo-progreso">Paso {{ pasoActivo + 1 }} de {{ pasos.length }}</span>
          <v-btn
            color="primary"
            :disabled="pasoActivo === pasos.length - 1"
            @click="moverPaso(1)"
          >
            Siguiente
            <i class="bi bi-arrow-right ms-2"></i>
          </v-btn>
        </div>
      </v-container>
    </section>

    <v-dialog v-model="pasoSeleccionado" max-width="620">
      <v-card class="detalle-paso">
        <div class="detalle-paso-icono">
          <i :class="`bi ${pasoSeleccionado?.icono}`"></i>
        </div>
        <div class="detalle-paso-numero">
          Tarjeta {{ String(pasoSeleccionado?.numero).padStart(2, '0') }}
        </div>
        <h2>{{ pasoSeleccionado?.titulo }}</h2>
        <p>{{ pasoSeleccionado?.detalle }}</p>
        <div class="detalle-controles">
          <v-btn
            variant="outlined"
            color="primary"
            :disabled="pasoActivo === 0"
            @click="moverPaso(-1)"
          >
            <i class="bi bi-arrow-left me-2"></i>
            Anterior
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            @click="pasoActivo === pasos.length - 1 ? finalizarFlujo() : moverPaso(1)"
          >
            {{ pasoActivo === pasos.length - 1 ? 'Finalizar' : 'Siguiente' }}
            <i v-if="pasoActivo < pasos.length - 1" class="bi bi-arrow-right ms-2"></i>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- ROLES -->
    <section class="seccion">
      <v-container>
        <div class="section-header text-center mb-8">
          <span class="eyebrow">Plataforma</span>
          <h2 class="titulo-seccion text-center">Tres roles, una sola plataforma</h2>
        </div>
        <v-row>
          <v-col v-for="(rol, i) in roles" :key="i" cols="12" md="4">
            <v-card
              class="pa-6 text-center h-100 rol-card"
              variant="flat"
              role="button"
              tabindex="0"
              :aria-label="`Ver más información sobre el rol ${rol.titulo}`"
              @click="rolSeleccionado = rol"
              @keydown.enter="rolSeleccionado = rol"
              @keydown.space.prevent="rolSeleccionado = rol"
            >
              <div class="rol-badge">
                <i :class="`bi ${rol.icono} icono-rol`"></i>
              </div>
              <h3>{{ rol.titulo }}</h3>
              <p>{{ rol.texto }}</p>
              <span class="rol-enlace">Conocer más <i class="bi bi-arrow-right"></i></span>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <v-dialog v-model="rolSeleccionado" max-width="620">
      <v-card class="detalle-paso detalle-rol">
        <div class="detalle-paso-icono">
          <i :class="`bi ${rolSeleccionado?.icono}`"></i>
        </div>
        <div class="detalle-paso-numero">Rol dentro de Handy</div>
        <h2>{{ rolSeleccionado?.titulo }}</h2>
        <p>{{ rolSeleccionado?.detalle }}</p>
        <v-btn
          color="primary"
          variant="flat"
          class="mt-4"
          @click="rolSeleccionado = null"
        >
          Entendido
        </v-btn>
      </v-card>
    </v-dialog>

    <!-- CTA FINAL -->
    <section class="cta-final">
      <v-container class="text-center">
        <span class="eyebrow eyebrow-light">Empieza hoy</span>
        <h2>¿Listo para empezar?</h2>
        <p>Regístrate como cliente o como trabajador y forma parte de Handy.</p>
        <div class="cta-acciones">
          <v-btn size="x-large" color="secondary" class="text-primary" to="/login?registro=1">
            Crear mi cuenta
          </v-btn>
          <v-btn size="x-large" variant="outlined" color="white" to="/login">
            Iniciar sesión
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<style scoped>
:global(body) {
  background:
    radial-gradient(circle at top left, rgba(31, 184, 160, 0.12), transparent 26%),
    radial-gradient(circle at top right, rgba(25, 118, 210, 0.1), transparent 28%),
    linear-gradient(180deg, #f5faf8 0%, #f7f9fc 100%);
}

.carrusel-seccion {
  position: relative;
  background: linear-gradient(180deg, #edf5ff 0%, #f7f9fc 100%);
}

.slide {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(8, 27, 53, 0.9) 0%, rgba(8, 27, 53, 0.6) 35%, rgba(8, 27, 53, 0.25) 100%),
    linear-gradient(180deg, rgba(9, 18, 32, 0.05), rgba(9, 18, 32, 0.28));
}

.slide-glow {
  position: absolute;
  inset: auto auto -120px -80px;
  width: 380px;
  height: 380px;
  background: rgba(62, 206, 180, 0.22);
  filter: blur(32px);
  border-radius: 50%;
  z-index: 1;
}

.slide-contenido {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 680px;
  padding-top: 56px;
  padding-bottom: 56px;
}

.slide-etiqueta {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.13);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(3px);
  margin-bottom: 16px;
}

.slide-contenido h2 {
  font-size: clamp(2.1rem, 4vw, 3.6rem);
  line-height: 1.05;
  font-weight: 800;
  margin-bottom: 14px;
  max-width: 520px;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}

.slide-contenido p {
  max-width: 540px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 26px;
}

.slide-acciones {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.texto-hero {
  text-align: center;
  padding: 48px 16px 16px;
}

.texto-hero h1 {
  font-size: 2.1rem;
  font-weight: 800;
  color: var(--color-primario);
  margin-bottom: 12px;
}

.texto-hero p {
  max-width: 640px;
  margin: 0 auto 24px;
  color: var(--color-texto-secundario);
  font-size: 1.05rem;
}

.botones-hero {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.seccion {
  padding: 64px 0;
}

.seccion-alterna {
  background: var(--color-fondo-secundario);
}

.titulo-seccion {
  font-weight: 800;
  color: var(--color-primario);
  margin-bottom: 14px;
}

.eyebrow {
  display: inline-block;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--color-primario);
  background: rgba(25, 118, 210, 0.1);
  border: 1px solid rgba(25, 118, 210, 0.12);
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  margin-bottom: 14px;
}

.eyebrow-alt {
  color: var(--color-primario);
  background: rgba(31, 180, 176, 0.12);
  border-color: rgba(31, 180, 176, 0.2);
}

.eyebrow-light {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.parrafo {
  color: var(--color-texto-secundario);
  line-height: 1.7;
  font-size: 1.02rem;
}

.idea-copy {
  max-width: 560px;
  padding: 12px 0;
}

.idea-row {
  align-items: center;
}

.beneficios-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 22px 0 24px;
}

.beneficios-lista span {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.08), rgba(30, 187, 197, 0.08));
  color: var(--color-primario);
  border: 1px solid rgba(25, 118, 210, 0.12);
  border-radius: 999px;
  padding: 0.55rem 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(25, 118, 210, 0.05);
}

.lista-check {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.lista-check li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  color: var(--color-texto-principal);
  line-height: 1.5;
}

.lista-check i {
  color: var(--color-exito);
  font-size: 1.1rem;
}

.idea-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: none;
  min-height: 560px;
  margin-left: auto;
  padding: 18px;
  background: linear-gradient(135deg, rgba(12, 87, 88, 0.05), rgba(18, 53, 91, 0.06));
  border: 1px solid rgba(18, 53, 91, 0.06);
  border-radius: 32px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6);
  transition: transform 0.6s ease, box-shadow 0.6s ease;
}

.idea-visual:hover {
  transform: translateY(-4px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 18px 32px rgba(15, 23, 42, 0.08);
}

.idea-imagen {
  width: 100%;
  height: 520px;
  border-radius: 24px;
  overflow: hidden;
  display: block;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.11);
  border: 1px solid rgba(25, 118, 210, 0.06);
  transition: transform 0.7s ease, box-shadow 0.7s ease;
}

.idea-visual:hover .idea-imagen {
  transform: scale(1.02);
  box-shadow: 0 30px 46px rgba(15, 23, 42, 0.14);
}

.idea-imagen {
  cursor: zoom-in;
}

.visor-imagen {
  background: rgba(5, 18, 35, 0.96) !important;
}

.visor-toolbar {
  position: absolute;
  z-index: 2;
  inset: 0 0 auto;
}

.visor-contenido {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 64px 24px 24px;
}

.imagen-pantalla-completa {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.infografia {
  max-width: 100%;
}

.section-header {
  margin-bottom: 2rem;
}

.flujo-introduccion {
  max-width: 620px;
  margin: 0 auto;
  color: var(--color-texto-secundario);
  line-height: 1.65;
}

.flujo-grid {
  position: relative;
}

.paso-col {
  position: relative;
}

.paso-card {
  border-radius: 22px !important;
  border: 1px solid rgba(25, 118, 210, 0.08);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.paso-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 36px rgba(15, 23, 42, 0.08);
}

.paso-card.paso-activo {
  border-color: var(--color-primario);
  box-shadow: 0 18px 36px rgba(25, 118, 210, 0.16);
  transform: translateY(-4px);
}

.paso-card.paso-activo .numero-paso {
  color: white;
  background: var(--color-primario);
}

.paso-card.paso-activo .icono-paso {
  color: white;
  background: var(--color-primario);
}

.paso-card.paso-completado {
  border-color: rgba(34, 197, 94, 0.3);
}

.paso-card.paso-completado .numero-paso {
  color: white;
  background: var(--color-exito);
}

.paso-estado {
  display: inline-block;
  margin-bottom: 9px;
  color: var(--color-texto-secundario);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.paso-activo .paso-estado {
  color: var(--color-primario);
}

.paso-completado .paso-estado {
  color: var(--color-exito);
}

.paso-col:not(:nth-child(3n))::after {
  content: "\F138";
  position: absolute;
  top: 50%;
  right: -10px;
  z-index: 1;
  color: var(--color-primario);
  font-family: "bootstrap-icons";
  font-size: 1.2rem;
  transform: translateY(-50%);
}

.paso-col:nth-child(3)::before {
  content: "\F128";
  position: absolute;
  right: 50%;
  bottom: -29px;
  z-index: 1;
  color: var(--color-primario);
  font-family: "bootstrap-icons";
  font-size: 1.1rem;
  transform: translateX(50%);
}

.flujo-controles {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.flujo-progreso {
  min-width: 100px;
  color: var(--color-texto-secundario);
  font-size: 0.9rem;
  font-weight: 700;
  text-align: center;
}

.paso-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.numero-paso {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.12), rgba(26, 184, 217, 0.18));
  color: var(--color-primario);
  font-size: 0.9rem;
  font-weight: 800;
}

.icono-paso {
  font-size: 1.8rem;
  color: var(--color-primario);
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: rgba(25, 118, 210, 0.07);
}

.paso-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--color-primario);
}

.paso-card p {
  color: var(--color-texto-secundario);
  line-height: 1.65;
  margin-bottom: 16px;
}

.paso-enlace {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--color-primario);
  font-size: 0.88rem;
  font-weight: 700;
}

.paso-enlace i {
  transition: transform 0.2s ease;
}

.paso-card:hover .paso-enlace i {
  transform: translateX(4px);
}

.detalle-paso {
  padding: 32px;
  border-radius: 28px !important;
  color: var(--color-texto-principal);
  background: linear-gradient(145deg, #ffffff, #f0f8f7) !important;
}

.detalle-paso-icono {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  margin-bottom: 18px;
  border-radius: 20px;
  color: white;
  font-size: 1.8rem;
  background: linear-gradient(135deg, var(--color-primario), #18a999);
  box-shadow: 0 12px 24px rgba(18, 53, 91, 0.16);
}

.detalle-paso-numero {
  color: var(--color-primario);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.detalle-paso h2 {
  color: var(--color-primario);
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.detalle-paso p {
  color: var(--color-texto-secundario);
  font-size: 1.02rem;
  line-height: 1.75;
  margin: 0;
}

.detalle-controles {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
}

.rol-card {
  border-radius: 24px !important;
  border: 1px solid rgba(18, 53, 91, 0.1);
  background: linear-gradient(145deg, #ffffff 0%, #eaf7f5 100%) !important;
  color: var(--color-texto-principal);
  box-shadow: 0 14px 36px rgba(18, 53, 91, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.rol-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 42px rgba(18, 53, 91, 0.16);
}

.rol-badge {
  width: 76px;
  height: 76px;
  margin: 0 auto 16px;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(18, 53, 91, 0.1), rgba(24, 169, 153, 0.18));
}

.icono-rol {
  font-size: 2.4rem;
  display: block;
  color: var(--color-primario);
}

.rol-card h3 {
  font-size: 1.45rem;
  margin-bottom: 12px;
  color: var(--color-primario);
}

.rol-card p {
  color: var(--color-texto-secundario);
  line-height: 1.7;
  margin-bottom: 16px;
}

.rol-enlace {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--color-primario);
  font-size: 0.88rem;
  font-weight: 700;
}

.rol-enlace i {
  transition: transform 0.2s ease;
}

.rol-card:hover .rol-enlace i {
  transform: translateX(4px);
}

.cta-final {
  background: linear-gradient(135deg, var(--color-primario) 0%, #0a3d71 100%);
  color: white;
  padding: 72px 0 80px;
}

.cta-final h2 {
  font-weight: 800;
  margin-bottom: 10px;
  font-size: clamp(2rem, 4vw, 3rem);
}

.cta-final p {
  margin-bottom: 24px;
  opacity: 0.9;
  font-size: 1.05rem;
}

.cta-acciones {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .texto-hero h1 {
    font-size: 1.6rem;
  }

  .floating-card {
    position: static;
    margin-top: 18px;
    max-width: 100%;
  }

  .idea-row {
    gap: 18px;
  }

  .idea-visual {
    min-height: 360px;
    padding: 10px;
  }

  .idea-imagen {
    height: 340px;
  }

  .paso-col::after {
    display: none;
  }

  .paso-col:nth-child(3)::before {
    display: none;
  }

  .flujo-controles {
    gap: 10px;
  }

  .flujo-progreso {
    min-width: auto;
  }

  .detalle-controles {
    flex-direction: column-reverse;
  }

  .detalle-controles .v-btn {
    width: 100%;
  }
}
</style>
