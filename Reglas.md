# Reglas de Desarrollo y Trabajo en Equipo

Este documento reúne las pautas obligatorias que acordamos en el equipo para trabajar en el proyecto del restaurante El Encanto Campestre. Todo lo que subamos al repositorio debe seguir estas reglas para mantener el código ordenado, entendible y con un estilo humano y consistente.

---

## 1. Estabilidad de la rama `main`

- **Todo lo que esté en `main` debe funcionar al 100%:** Las funcionalidades presentadas en la rama `main` deben estar completas y sin errores de backend, frontend ni base de datos.
- **Cero código roto:** No se sube código a medias, funciones a medio terminar o pantallas que tiren error en consola. Si algo todavía no funciona o está en pruebas, se trabaja en rama propia y solo se une a `main` cuando esté probado y verificado.
- **Pruebas antes de integrar:** Antes de hacer merge a `main`, el integrante responsable debe verificar que el proyecto compile, que el contenedor o la base de datos levanten sin fallos y que la app móvil corra sin caerse.

---

## 2. Convención de Commits y Responsabilidad Única

Para que el historial de Git sea transparente y sepamos exactamente quién hizo cada cosa y por qué, definimos:

- **Responsabilidad única:** Cada commit debe resolver una sola cosa específica. No mezclar ajustes de diseño con cambios de base de datos o lógica de autenticación en un mismo commit.
- **Formato del mensaje de commit:** El mensaje debe iniciar obligatoriamente con el nombre de quien está trabajando, seguido de lo que hizo en minúsculas y separado por barra:
  - `yeison/{lo que está haciendo}`
  - `alex/{lo que está haciendo}`
  - `fabian/{lo que está haciendo}`

### Ejemplos válidos:

- `yeison/inicializa-proyecto-react-native-con-cinco-tabs`
- `alex/configura-docker-compose-y-swagger-en-api`
- `fabian/crea-esquema-prisma-con-18-entidades-y-primera-migracion`
- `yeison/conecta-almacenamiento-de-tokens-en-keystore`
- `alex/crea-endpoints-de-registro-y-login-con-argon2id`
- `fabian/agrega-datos-de-prueba-en-seed-con-platos-y-mesas`

---

## 3. Exclusividad de Contribuyentes y Autoría Humana

- **Solo los integrantes del equipo figuran en GitHub:** Los únicos autores y colaboradores permitidos en los commits, ramas, pull requests y métricas de GitHub son **Yeison Muñoz**, **Alex Santacruz** y **Fabián Hoyos**.
- **Cero créditos o registros de IA:** Queda terminantemente prohibido que agentes de programación, inteligencias artificiales (Claude, Copilot o cualquier bot) aparezcan como autores, colaboradores o con etiquetas de co-autoría (`Co-authored-by`). La autoría y responsabilidad del código es 100% de nosotros como estudiantes del proyecto académico.
- **Configuración de Git limpia:** Cada integrante debe asegurarse de tener configurado su `user.name` y `user.email` institucional o personal correcto en Git antes de hacer commits.

---

## 4. Estilo de Redacción: Primera Persona y Lenguaje Humano

- **Escribir en primera persona:** Tanto en la documentación de soporte como en notas y comentarios, escribimos de forma natural y cercana (en primera persona singular o plural: _"hice"_, _"creé"_, _"definimos"_, _"probamos"_).
- **Evitar lenguaje acartonado o generado por IA:** Nada de textos inflados con palabras como "apalancar", "sinergia", "holístico", "sin fricción", ni párrafos mecánicos con guiones largos excesivos (`—`) o listas infinitas de emojis.
- **Tono directo y coloquial:** Explicamos las cosas como las hablaríamos en el salón de clase o en una reunión técnica entre nosotros: con palabras claras, directas y al grano.

---

## 5. Comentarios en el Código: Simples, Humanizados y Muy Explicativos

Todos los archivos de código (React Native, NestJS, Prisma, utilidades) deben tener comentarios bien explicativos, redactados de forma simple y en primera persona, sin tecnicismos innecesarios.

- **Comentar funciones simples y complejas:** No asumir que el código se explica solo. Si creamos una función para formatear precios, explicamos qué recibe y qué devuelve. Si hacemos una consulta con transacción o validación recursiva, explicamos el motivo y los pasos.
- **Explicar el por qué:** Más que decir _"suma A más B"_, explicar _"sumo los precios para mostrar el subtotal antes de enviar la reserva"_.

### Ejemplo de cómo comentamos en Backend:

```javascript
// con esta función valido que el usuario me haya mandado todos los campos obligatorios
function validarCamposRegistro(datos) {
  // si falta el correo o la contraseña, devuelvo un mensaje de error claro
  if (!datos.correo || !datos.password) {
    return 'El correo y la contraseña son obligatorios para registrarse.';
  }
  return null;
}

// aquí guardo la contraseña hasheada con argon2id para que nunca quede en texto plano en la bd
async function hashearPassword(passwordPlana) {
  // uso argon2 con los parámetros seguros que definimos en las reglas
  return await argon2.hash(passwordPlana);
}
```

### Ejemplo de cómo comentamos en Móvil (React Native):

```javascript
// aquí guardo el token de refresco en el llavero seguro del celular para no perder la sesión
async function guardarSesionSegura(refreshToken) {
  try {
    // uso react-native-keychain para que quede cifrado en el sistema operativo
    await Keychain.setGenericPassword('refreshToken', refreshToken);
  } catch (error) {
    console.log('Tuve un problema al guardar el token en el dispositivo:', error);
  }
}
```

---

## 6. Resumen Rápido para el Día a Día

1. **¿Funciona completo en local?** Sí $\rightarrow$ Listo para commit.
2. **¿Formato de commit correcto?** Nombre + lo que hice (`yeison/...`, `alex/...`, `fabian/...`).
3. **¿Código comentado con lenguaje humano?** Sí, explicando qué hace cada parte.
4. **¿Pasa limpio a `main`?** Solo cuando backend, frontend y base de datos estén coordinados y sin errores.
