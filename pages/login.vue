<script setup>
const route = useRoute()
const router = useRouter()

// Si el usuario llega con /login?registro=1 (desde la landing) abrimos el registro directamente
const mostrarRegistro = ref(route.query.registro === '1')
const correoPrellenado = ref('')

function irARegistro() {
  mostrarRegistro.value = true
}

function irALogin(correoNuevo) {
  if (correoNuevo) {
    correoPrellenado.value = correoNuevo
  }

  mostrarRegistro.value = false
  router.replace({ path: '/login' })
}
</script>

<template>
  <main class="pagina">
    <div class="circulo circulo-1"></div>
    <div class="circulo circulo-2"></div>

    <NuxtLink to="/" class="volver">
      <i class="bi bi-arrow-left"></i> Volver al inicio
    </NuxtLink>

    <section class="tarjeta">
      <Transition name="entrada" mode="out-in">
        <LoginForm
          v-if="!mostrarRegistro"
          key="login"
          :correo-inicial="correoPrellenado"
          @ir-a-registro="irARegistro"
        />
        <RegisterForm
          v-else
          key="registro"
          @ir-a-login="irALogin"
        />
      </Transition>
    </section>
  </main>
</template>

<style scoped>
.pagina {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 15px;
  background: var(--color-fondo-secundario);
}

.volver {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primario);
  text-decoration: none;
  font-weight: 600;
}

.circulo {
  position: absolute;
  border-radius: 50%;
  opacity: 0.45;
  animation: flotar 7s ease-in-out infinite;
}

.circulo-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -80px;
  background: rgba(18, 53, 91, 0.12);
}

.circulo-2 {
  width: 240px;
  height: 240px;
  right: -70px;
  bottom: -70px;
  background: rgba(244, 185, 66, 0.18);
  animation-delay: -3s;
}

.tarjeta {
  width: 100%;
  max-width: 520px;
  position: relative;
  z-index: 2;
  padding: 42px;
  border-radius: 30px;
  background: var(--color-fondo-principal);
  box-shadow:
    18px 18px 35px var(--sombra-oscura),
    -18px -18px 35px var(--sombra-clara);
  animation: aparecer 0.8s ease both;
}

.entrada-enter-active,
.entrada-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.entrada-enter-from {
  opacity: 0;
  transform: translateX(25px);
}

.entrada-leave-to {
  opacity: 0;
  transform: translateX(-25px);
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes flotar {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(18px);
  }
}

@media (max-width: 600px) {
  .pagina {
    padding: 18px 12px;
  }

  .tarjeta {
    padding: 30px 20px;
    border-radius: 25px;
  }
}
</style>
