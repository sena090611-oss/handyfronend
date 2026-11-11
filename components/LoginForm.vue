<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  correoInicial: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['ir-a-registro'])

const correo = ref(props.correoInicial)
const contrasena = ref('')
const rol = ref('')
const codigoAdministrador = ref('')
const recordar = ref(false)
const mostrarContrasena = ref(false)

const mensaje = ref('')
const tipoMensaje = ref('')
const cargando = ref(false)

onMounted(() => {
  const correoGuardado = localStorage.getItem('correoRecordado')

  if (correoGuardado) {
    correo.value = correoGuardado
    recordar.value = true
  }
})

function limpiarMensaje() {
  mensaje.value = ''
  tipoMensaje.value = ''
}

function alternarContrasena() {
  mostrarContrasena.value = !mostrarContrasena.value
}

function actualizarRol() {
  if (rol.value !== 'administrador') {
    codigoAdministrador.value = ''
  }
}

function iniciarSesion() {
  limpiarMensaje()

  if (!correo.value.trim() || !contrasena.value || !rol.value) {
    mensaje.value = 'Completa todos los campos.'
    tipoMensaje.value = 'error'
    return
  }

  if (rol.value === 'administrador' && codigoAdministrador.value !== 'FAAA123') {
    mensaje.value = 'El código de administrador no es válido.'
    tipoMensaje.value = 'error'
    return
  }

  cargando.value = true

  setTimeout(() => {
    const usuarioGuardado = JSON.parse(
      localStorage.getItem('usuario') || 'null'
    )

    const credencialesValidas =
      usuarioGuardado &&
      usuarioGuardado.correo === correo.value.trim() &&
      usuarioGuardado.contrasena === contrasena.value

    if (credencialesValidas && usuarioGuardado.rol !== rol.value) {
      mensaje.value = 'Ese usuario no tiene el rol seleccionado.'
      tipoMensaje.value = 'error'
      cargando.value = false
      return
    }

    if (credencialesValidas) {
      if (recordar.value) {
        localStorage.setItem('correoRecordado', correo.value.trim())
      } else {
        localStorage.removeItem('correoRecordado')
      }

      mensaje.value = `¡Bienvenido, ${usuarioGuardado.nombres}!`
      tipoMensaje.value = 'exito'
    } else {
      mensaje.value = 'Correo o contraseña incorrectos.'
      tipoMensaje.value = 'error'
    }

    cargando.value = false
  }, 900)
}

function recuperarContrasena() {
  limpiarMensaje()

  if (!correo.value.trim()) {
    mensaje.value = 'Escribe tu correo para recuperar la contraseña.'
    tipoMensaje.value = 'error'
    return
  }

  mensaje.value =
    `Si existe una cuenta asociada a ${correo.value.trim()}, ` +
    'se enviarán instrucciones de recuperación.'
  tipoMensaje.value = 'exito'
}
</script>

<template>
  <div class="contenido">
    <div class="icono-principal">
      <i class="bi bi-lock-fill"></i>
    </div>

    <h1>Bienvenido</h1>
    <p class="subtitulo">Inicia sesión para continuar</p>

    <form @submit.prevent="iniciarSesion">
      <div class="campo">
        <label for="correo">Correo electrónico</label>
        <div class="input-con-icono">
          <i class="bi bi-envelope"></i>
          <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            autocomplete="email"
          />
        </div>
      </div>

      <div class="campo">
        <label for="rol">Rol</label>
        <div class="input-con-icono">
          <i class="bi bi-person-badge"></i>
          <select id="rol" v-model="rol" @change="actualizarRol">
            <option value="" disabled>Selecciona tu rol</option>
            <option value="cliente">Cliente</option>
            <option value="trabajador">Trabajador</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
      </div>

      <div v-if="rol === 'administrador'" class="campo">
        <label for="codigoAdministrador">Código de administrador</label>
        <div class="input-con-icono">
          <i class="bi bi-shield-lock"></i>
          <input
            id="codigoAdministrador"
            v-model="codigoAdministrador"
            type="password"
            placeholder="Ingresa el código de acceso"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="campo">
        <label for="contrasena">Contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock"></i>
          <input
            id="contrasena"
            v-model="contrasena"
            :type="mostrarContrasena ? 'text' : 'password'"
            placeholder="Ingresa tu contraseña"
            autocomplete="current-password"
          />
          <button type="button" class="boton-ojo" @click="alternarContrasena">
            <i :class="mostrarContrasena ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>

      <div class="opciones">
        <label class="recordar">
          <input v-model="recordar" type="checkbox" />
          <span>Recordarme</span>
        </label>

        <button type="button" class="enlace" @click="recuperarContrasena">
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button type="submit" class="boton-principal" :disabled="cargando">
        <span v-if="!cargando">INICIAR SESIÓN</span>
        <span v-else>
          <span class="spinner"></span>
          INICIANDO...
        </span>
      </button>
    </form>

    <Transition name="mensaje">
      <div v-if="mensaje" class="mensaje" :class="tipoMensaje">
        {{ mensaje }}
      </div>
    </Transition>

    <div class="separador"><span>o</span></div>

    <p class="cuenta">
      ¿No tienes una cuenta?
      <button type="button" class="enlace crear" @click="emit('ir-a-registro')">
        Crear cuenta
      </button>
    </p>

    <div class="sociales">
      <button type="button" title="Google">
        <i class="bi bi-google"></i>
      </button>
      <button type="button" title="Facebook">
        <i class="bi bi-facebook"></i>
      </button>
      <button type="button" title="Instagram">
        <i class="bi bi-instagram"></i>
      </button>
    </div>
  </div>
</template>
