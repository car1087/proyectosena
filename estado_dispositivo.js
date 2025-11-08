document.addEventListener("DOMContentLoaded", () => {
  console.log("Submódulo Estado del Dispositivo cargado");
  actualizarEstadoGeneral();
});

function toggleEstado(boton) {
  const contenedor = boton.closest(".estado-toggle");
  const botones = contenedor.querySelectorAll(".btn-estado");

  botones.forEach(btn => btn.classList.remove("seleccionado"));
  boton.classList.add("seleccionado");

  actualizarEstadoGeneral();
}

function actualizarEstadoGeneral() {
  const estados = document.querySelectorAll(".btn-estado.activo");
  const totalActivos = Array.from(estados).filter(btn => btn.classList.contains("seleccionado")).length;
  const totalContactos = document.querySelectorAll(".contacto").length;

  const estadoGeneral = document.getElementById("estadoGeneral");

  if (totalActivos === totalContactos) {
    estadoGeneral.textContent = "Activo";
    estadoGeneral.className = "estado-activo";
  } else if (totalActivos === 0) {
    estadoGeneral.textContent = "Inactivo";
    estadoGeneral.className = "estado-inactivo";
  } else {
    estadoGeneral.textContent = "Parcialmente activo";
    estadoGeneral.className = "estado-parcial";
  }
}

function guardarCambios() {
  alert("Cambios guardados correctamente ✅");
}
