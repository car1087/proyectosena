// ================================
// Submódulo: Datos Personales
// Archivo: datos_personales.js
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formDatosPersonales");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const edad = document.getElementById("edad");

  // ================================
  // 1️⃣ Función para calcular edad
  // ================================
  function calcularEdad(fechaNac) {
    if (!fechaNac) return "";
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  // Recalcular automáticamente al cambiar fecha
  fechaNacimiento.addEventListener("change", () => {
    edad.value = calcularEdad(fechaNacimiento.value);
  });

  // ================================
  // 2️⃣ Cargar datos guardados
  // ================================
  const datosGuardados = JSON.parse(localStorage.getItem("datosPersonales")) || {};
  for (const campo in datosGuardados) {
    const input = document.getElementById(campo);
    if (input) input.value = datosGuardados[campo];
  }

  // Calcular edad automáticamente
const fechaNacimientoInput = document.getElementById("fechaNacimiento");
const edadInput = document.getElementById("edad");

fechaNacimientoInput.addEventListener("change", () => {
  const fechaNacimiento = new Date(fechaNacimientoInput.value);
  if (!isNaN(fechaNacimiento)) {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    edadInput.value = edad;
  } else {
    edadInput.value = "";
  }
});

  // ================================
  // 3️⃣ Guardar datos
  // ================================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validar campos requeridos
    const campos = [
      "nombreCompleto",
      "tipoDocumento",
      "numeroDocumento",
      "fechaNacimiento",
      "grupoSanguineo",
      "telefono",
      "email"
    ];

    for (const id of campos) {
      const input = document.getElementById(id);
      if (!input.value.trim()) {
        alert("Por favor complete todos los campos requeridos.");
        input.focus();
        return;
      }
    }

    // Crear objeto con los datos
    const datos = {
      nombreCompleto: document.getElementById("nombreCompleto").value.trim(),
      tipoDocumento: document.getElementById("tipoDocumento").value,
      numeroDocumento: document.getElementById("numeroDocumento").value.trim(),
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      edad: edad.value,
      grupoSanguineo: document.getElementById("grupoSanguineo").value,
      telefono: document.getElementById("telefono").value.trim(),
      email: document.getElementById("email").value.trim()
    };

    // Guardar en localStorage
    localStorage.setItem("datosPersonales", JSON.stringify(datos));

    // Mostrar confirmación
    mostrarMensaje("✅ Datos guardados correctamente.");
  });

  // ================================
  // 4️⃣ Función para mostrar mensaje
  // ================================
  function mostrarMensaje(texto) {
    const mensaje = document.createElement("div");
    mensaje.textContent = texto;
    mensaje.style.backgroundColor = "#D1FAE5";
    mensaje.style.color = "#6BCB77";
    mensaje.style.padding = "10px";
    mensaje.style.marginTop = "10px";
    mensaje.style.borderRadius = "8px";
    mensaje.style.textAlign = "center";
    mensaje.style.fontWeight = "600";
    mensaje.style.transition = "opacity 0.5s ease";
    mensaje.style.opacity = "1";

    form.appendChild(mensaje);

    // Desaparecer el mensaje después de 3 segundos
    setTimeout(() => {
      mensaje.style.opacity = "0";
      setTimeout(() => mensaje.remove(), 500);
    }, 3000);
  }
});
const form = document.getElementById("formDatosPersonales");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que recargue la página

  // Aquí se podran guardar los datos en localStorage o enviar al servidor
  // localStorage.setItem('datosPersonales', JSON.stringify({ ... }));

  alert("✅ Cambios guardados correctamente");

  // Regresar al módulo anterior: Editar información médica
  if (typeof cargarModulo === "function") {
    cargarModulo('modulos/editar_informacion.html');
  }
});

