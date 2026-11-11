<script setup>
const route = useRoute()
const mostrarBarra = computed(() => route.path !== '/login')

const refrescarPagina = () => {
  window.location.assign('/')
}

const desplazarseASeccion = async (id) => {
  if (route.path !== '/') {
    await navigateTo({ path: '/', hash: `#${id}` })
    return
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <v-app>
    <v-app-bar
      v-if="mostrarBarra"
      color="primary"
      flat
      density="comfortable"
    >
      <v-container class="d-flex align-center">
        <a href="/" class="marca" @click.prevent="refrescarPagina">
          <img src="/img/handy-logo.png" alt="Handy" class="logo-marca">
        </a>

        <v-spacer />

        <div class="acciones-navegacion">
          <v-btn
            variant="text"
            color="white"
            class="boton-navegacion"
            @click="desplazarseASeccion('como-funciona')"
          >
            Cómo funciona
          </v-btn>
          <v-btn
            variant="text"
            color="white"
            class="boton-navegacion"
            @click="desplazarseASeccion('nosotros')"
          >
            Nuestra idea
          </v-btn>
          <v-btn variant="flat" color="secondary" class="boton-navegacion boton-ingresar text-primary" to="/login">
            Ingresar
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer v-if="mostrarBarra" color="primary" class="text-center d-flex flex-column py-6">
      <span class="text-white">
        © {{ new Date().getFullYear() }} Handy — Mano de obra doméstica verificada en Montería
      </span>
    </v-footer>
  </v-app>
</template>

<style scoped>
:global(html) {
  scroll-behavior: smooth;
}

.marca {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.2rem;
}

.logo-marca {
  display: block;
  width: 88px;
  height: auto;
  max-height: 64px;
  object-fit: contain;
}

.acciones-navegacion {
  display: flex;
  align-items: center;
  gap: 10px;
}

.boton-navegacion {
  min-height: 38px;
  padding: 0 18px;
  border-radius: 9px !important;
  background: #486b8f !important;
  color: white !important;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.boton-navegacion:hover {
  background: #587b9f !important;
}

.boton-ingresar {
  background: #f4b942 !important;
  color: #12355b !important;
}

.boton-ingresar:hover {
  background: #ffc752 !important;
}
</style>
