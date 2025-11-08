document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll(".lista-ajustes a");
  const darkSwitch = document.getElementById("darkModeSwitch");

  // Efectos visuales en los enlaces
  enlaces.forEach((enlace) => {
    enlace.addEventListener("mouseenter", () => {
      enlace.style.textDecoration = "underline";
      enlace.style.color = "var(--azul)";
    });

    enlace.addEventListener("mouseleave", () => {
      enlace.style.textDecoration = "none";
      enlace.style.color = "";
    });
  });

  // Navegación a submódulos
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();

      const ruta = enlace.getAttribute("data-modulo");
      if (!ruta) {
        alert("⚠️ No se encontró la ruta del submódulo.");
        return;
      }

      try {
        cargarModulo(ruta);
      } catch (error) {
        console.error("❌ Error al cargar el submódulo:", error);
        alert("Ocurrió un error al intentar abrir esta sección.");
      }
    });
  });

  // ----- Configuración: Modo oscuro -----
  // Restaurar preferencia guardada
  if (localStorage.getItem("modoOscuro") === "true") {
    document.body.classList.add("modo-oscuro");
    darkSwitch.checked = true;
  }

  // Escuchar cambios
  darkSwitch.addEventListener("change", () => {
    document.body.classList.toggle("modo-oscuro", darkSwitch.checked);
    localStorage.setItem("modoOscuro", darkSwitch.checked);
  });

  console.log("✅ Módulo de Ajustes inicializado correctamente.");
});
