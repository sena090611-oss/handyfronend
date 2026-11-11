<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['ir-a-login'])

const nombres = ref('')
const apellidos = ref('')
const tipoDocumento = ref('')
const numeroDocumento = ref('')
const correoRegistro = ref('')
const celular = ref('')
const rol = ref('')
const documentos = ref([])
const codigoAdministrador = ref('')
const contrasenaRegistro = ref('')
const confirmarContrasena = ref('')
const mostrarContrasenaRegistro = ref(false)
const mostrarConfirmacion = ref(false)

const mensaje = ref('')
const tipoMensaje = ref('')
const cargando = ref(false)

const fuerzaContrasena = computed(() => {
  const clave = contrasenaRegistro.value
  let puntos = 0

  if (clave.length >= 8) puntos++
  if (/[A-Z]/.test(clave)) puntos++
  if (/[a-z]/.test(clave)) puntos++
  if (/[0-9]/.test(clave)) puntos++
  if (/[^A-Za-z0-9]/.test(clave)) puntos++

  if (puntos <= 2) return { texto: 'Débil', clase: 'debil' }
  if (puntos <= 4) return { texto: 'Media', clase: 'media' }
  return { texto: 'Fuerte', clase: 'fuerte' }
})

function limpiarMensaje() {
  mensaje.value = ''
  tipoMensaje.value = ''
}

function alternarContrasenaRegistro() {
  mostrarContrasenaRegistro.value = !mostrarContrasenaRegistro.value
}

function alternarConfirmacion() {
  mostrarConfirmacion.value = !mostrarConfirmacion.value
}

function actualizarRol() {
  if (rol.value !== 'trabajador') {
    documentos.value = []
  }

  if (rol.value !== 'administrador') {
    codigoAdministrador.value = ''
  }
}

function seleccionarDocumentos(event) {
  documentos.value = Array.from(event.target.files || [])
}

function crearCuenta() {
  limpiarMensaje()

  if (
    !nombres.value.trim() ||
    !apellidos.value.trim() ||
    !tipoDocumento.value ||
    !numeroDocumento.value.trim() ||
    !correoRegistro.value.trim() ||
    !celular.value.trim() ||
    !rol.value ||
    !contrasenaRegistro.value ||
    !confirmarContrasena.value
  ) {
    mensaje.value = 'Completa todos los campos.'
    tipoMensaje.value = 'error'
    return
  }

  if (rol.value === 'trabajador' && documentos.value.length === 0) {
    mensaje.value = 'Adjunta al menos un documento para registrarte como trabajador.'
    tipoMensaje.value = 'error'
    return
  }

  if (rol.value === 'administrador' && codigoAdministrador.value !== 'FAAA123') {
    mensaje.value = 'El código de administrador no es válido.'
    tipoMensaje.value = 'error'
    return
  }

  if (contrasenaRegistro.value.length < 8) {
    mensaje.value = 'La contraseña debe tener mínimo 8 caracteres.'
    tipoMensaje.value = 'error'
    return
  }

  if (contrasenaRegistro.value !== confirmarContrasena.value) {
    mensaje.value = 'Las contraseñas no coinciden.'
    tipoMensaje.value = 'error'
    return
  }

  const usuarioExistente = JSON.parse(
    localStorage.getItem('usuario') || 'null'
  )

  if (
    usuarioExistente &&
    usuarioExistente.correo === correoRegistro.value.trim()
  ) {
    mensaje.value = 'Ya existe una cuenta con ese correo.'
    tipoMensaje.value = 'error'
    return
  }

  cargando.value = true

  setTimeout(() => {
    const usuario = {
      nombres: nombres.value.trim(),
      apellidos: apellidos.value.trim(),
      tipoDocumento: tipoDocumento.value,
      numeroDocumento: numeroDocumento.value.trim(),
      correo: correoRegistro.value.trim(),
      celular: celular.value.trim(),
      rol: rol.value,
      documentos:
        rol.value === 'trabajador'
          ? documentos.value.map((documento) => ({
              nombre: documento.name,
              tipo: documento.type,
              tamano: documento.size
            }))
          : [],
      contrasena: contrasenaRegistro.value
    }

    localStorage.setItem('usuario', JSON.stringify(usuario))

    const correoCreado = usuario.correo

    nombres.value = ''
    apellidos.value = ''
    tipoDocumento.value = ''
    numeroDocumento.value = ''
    correoRegistro.value = ''
    celular.value = ''
    rol.value = ''
    documentos.value = []
    codigoAdministrador.value = ''
    contrasenaRegistro.value = ''
    confirmarContrasena.value = ''

    cargando.value = false

    emit('ir-a-login', correoCreado)
  }, 900)
}
</script>

<template>
  <div class="contenido registro">
    <div class="icono-principal">
      <i class="bi bi-person-plus-fill"></i>
    </div>

    <h1>Crear cuenta</h1>
    <p class="subtitulo">Completa tus datos para registrarte</p>

    <form @submit.prevent="crearCuenta">
      <div class="fila">
        <div class="campo">
          <label for="nombres">Nombres</label>
          <div class="input-con-icono">
            <i class="bi bi-person"></i>
            <input
              id="nombres"
              v-model="nombres"
              type="text"
              placeholder="Tus nombres"
              autocomplete="given-name"
            />
          </div>
        </div>

        <div class="campo">
          <label for="apellidos">Apellidos</label>
          <div class="input-con-icono">
            <i class="bi bi-person"></i>
            <input
              id="apellidos"
              v-model="apellidos"
              type="text"
              placeholder="Tus apellidos"
              autocomplete="family-name"
            />
          </div>
        </div>
      </div>

      <div class="fila">
        <div class="campo">
          <label for="tipoDocumento">Tipo de documento</label>
          <div class="input-con-icono">
            <i class="bi bi-card-text"></i>
            <select id="tipoDocumento" v-model="tipoDocumento">
              <option value="" disabled>Selecciona</option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="PPT">Permiso por Protección Temporal</option>
              <option value="PAS">Pasaporte</option>
            </select>
          </div>
        </div>

        <div class="campo">
          <label for="numeroDocumento">Número de documento</label>
          <div class="input-con-icono">
            <i class="bi bi-credit-card"></i>
            <input
              id="numeroDocumento"
              v-model="numeroDocumento"
              type="text"
              inputmode="numeric"
              placeholder="Número"
            />
          </div>
        </div>
      </div>

      <div class="campo">
        <label for="correoRegistro">Correo</label>
        <div class="input-con-icono">
          <i class="bi bi-envelope"></i>
          <input
            id="correoRegistro"
            v-model="correoRegistro"
            type="email"
            placeholder="correo@ejemplo.com"
            autocomplete="email"
          />
        </div>
      </div>

      <div class="campo">
        <label for="celular">Celular</label>
        <div class="input-con-icono">
          <i class="bi bi-phone"></i>
          <input
            id="celular"
            v-model="celular"
            type="tel"
            inputmode="tel"
            placeholder="300 000 0000"
            autocomplete="tel"
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

      <div v-if="rol === 'trabajador'" class="campo">
        <label for="documentos">Documentos requeridos</label>
        <div class="input-con-icono">
          <i class="bi bi-file-earmark-arrow-up"></i>
          <input
            id="documentos"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            @change="seleccionarDocumentos"
          />
        </div>
        <small class="ayuda-campo">
          Adjunta los documentos solicitados por la plataforma (PDF, JPG o PNG).
        </small>
        <small v-if="documentos.length" class="archivos-seleccionados">
          {{ documentos.length }} documento(s) seleccionado(s)
        </small>
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
        <label for="contrasenaRegistro">Contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock"></i>
          <input
            id="contrasenaRegistro"
            v-model="contrasenaRegistro"
            :type="mostrarContrasenaRegistro ? 'text' : 'password'"
            placeholder="Mínimo 8 caracteres"
            autocomplete="new-password"
          />
          <button type="button" class="boton-ojo" @click="alternarContrasenaRegistro">
            <i :class="mostrarContrasenaRegistro ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
        <div v-if="contrasenaRegistro" class="fuerza" :class="fuerzaContrasena.clase">
          Seguridad: {{ fuerzaContrasena.texto }}
        </div>
      </div>

      <div class="campo">
        <label for="confirmarContrasena">Confirmación de la contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-shield-check"></i>
          <input
            id="confirmarContrasena"
            v-model="confirmarContrasena"
            :type="mostrarConfirmacion ? 'text' : 'password'"
            placeholder="Repite tu contraseña"
            autocomplete="new-password"
          />
          <button type="button" class="boton-ojo" @click="alternarConfirmacion">
            <i :class="mostrarConfirmacion ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>

      <button type="submit" class="boton-principal" :disabled="cargando">
        <span v-if="!cargando">CREAR CUENTA</span>
        <span v-else>
          <span class="spinner"></span>
          CREANDO...
        </span>
      </button>
    </form>

    <Transition name="mensaje">
      <div v-if="mensaje" class="mensaje" :class="tipoMensaje">
        {{ mensaje }}
      </div>
    </Transition>

    <p class="cuenta">
      ¿Ya tienes una cuenta?
      <button type="button" class="enlace crear" @click="emit('ir-a-login')">
        Iniciar sesión
      </button>
    </p>
  </div>
</template>
