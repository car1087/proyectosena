
const selector = document.getElementById("opcionCambio");
const formCorreo = document.getElementById("formCorreo");
const formClave = document.getElementById("formClave");

// Verificar que los elementos existan
if (selector && formCorreo && formClave) {
  // Mostrar/ocultar formulario según la selección
  selector.addEventListener("change", () => {
    const opcion = selector.value;
    formCorreo.style.display = opcion === "correo" ? "block" : "none";
    formClave.style.display = opcion === "clave" ? "block" : "none";
  });

  // ----- Cambiar correo -----
  document.getElementById("btnActualizarCorreo").addEventListener("click", () => {
    const nuevoCorreo = document.getElementById("nuevoCorreo").value.trim();
    const claveCorreo = document.getElementById("claveCorreo").value.trim();

    if (!nuevoCorreo || !claveCorreo) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    console.log("📧 Nuevo correo:", nuevoCorreo);
    alert("✅ Correo actualizado correctamente (simulación).");

    document.getElementById("nuevoCorreo").value = "";
    document.getElementById("claveCorreo").value = "";
  });

  // ----- Cambiar contraseña -----
  document.getElementById("btnActualizarClave").addEventListener("click", () => {
    const actual = document.getElementById("claveActual").value.trim();
    const nueva = document.getElementById("nuevaClave").value.trim();
    const confirmar = document.getElementById("confirmarClave").value.trim();

    if (!actual || !nueva || !confirmar) {
      alert("⚠️ Completa todos los campos.");
      return;
    }

    if (nueva !== confirmar) {
      alert("⚠️ Las contraseñas no coinciden.");
      return;
    }

    console.log("🔑 Contraseña cambiada correctamente (simulación).");
    alert("✅ Contraseña actualizada correctamente.");

    document.getElementById("claveActual").value = "";
    document.getElementById("nuevaClave").value = "";
    document.getElementById("confirmarClave").value = "";
  });

  console.log("✅ Submódulo de cambio de correo/contraseña inicializado.");
} else {
  console.warn("⚠️ No se encontraron los elementos del formulario en cambiar_correo.html");
}
