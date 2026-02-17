// =======================================================
// DASHBOARD PILD - CONTROL GENERAL DEL SISTEMA
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

  // ===================================================
  // 🔹 1. MENÚ RESPONSIVE (ABRIR / CERRAR SIDEBAR)
  // ===================================================
  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // ===================================================
  // 🔹 2. CIERRE DE SESIÓN (SIMULADO)
  // ===================================================
  const logoutLink = document.querySelector(".logout");

  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();

      // Limpiar almacenamiento
      sessionStorage.clear();
      localStorage.clear();

      alert("Sesión cerrada correctamente");

      // Recargar página
      location.reload();
    });
  }

  // ===================================================
  // 🔹 3. CONTROL DE ROLES (Usuario / Cuidador)
  // ===================================================
  const selectorRol = document.getElementById("selector-rol");
  const userRoleSpan = document.getElementById("user-role");

  if (selectorRol && userRoleSpan) {

    // Obtener rol guardado o usar "usuario" por defecto
    const rolGuardado = localStorage.getItem("rolActivo") || "usuario";

    // Asignar valores iniciales
    selectorRol.value = rolGuardado;
    userRoleSpan.textContent = capitalizarTexto(rolGuardado);

    // Aplicar permisos al cargar la página
    aplicarPermisosMenu(rolGuardado);

    // Detectar cambio en el selector
    selectorRol.addEventListener("change", () => {

      const nuevoRol = selectorRol.value;

      // Guardar rol seleccionado
      localStorage.setItem("rolActivo", nuevoRol);

      // Actualizar texto del rol en el avatar
      userRoleSpan.textContent = capitalizarTexto(nuevoRol);

      // Aplicar permisos nuevamente
      aplicarPermisosMenu(nuevoRol);

      // Volver al módulo inicio al cambiar de rol
      cargarModulo("modulos/inicio.html");
    });
  }

  // ===================================================
  // 🔹 4. CARGAR MÓDULO INICIAL
  // ===================================================
  cargarModulo("modulos/inicio.html");

});


// =======================================================
// 🔹 FUNCIÓN: APLICAR PERMISOS SEGÚN ROL
// =======================================================
function aplicarPermisosMenu(rolActivo) {

  // Obtener todos los elementos del menú
  const itemsMenu = document.querySelectorAll(".menu li");

  // Definir permisos por rol usando data-modulo
  const permisos = {

    usuario: [
      "inicio",
      "info_medica",
      "contactos",
      "qr",
      "ajustes"
    ],

    cuidador: [
      "inicio",
      "pacientes",
      "solicitudes",
      "contactos",
      "ajustes"
    ]
  };

  itemsMenu.forEach(item => {

    const modulo = item.dataset.modulo;

    if (!modulo) return;

    // Verificar si el módulo está permitido para el rol activo
    if (permisos[rolActivo].includes(modulo)) {
      item.classList.remove("oculto");
    } else {
      item.classList.add("oculto");
    }
  });
}


// =======================================================
// 🔹 FUNCIÓN: CARGAR MÓDULOS DINÁMICAMENTE
// =======================================================
function cargarModulo(ruta) {

  const contenedor = document.getElementById("contenido-dinamico");

  if (!contenedor) {
    console.error("No se encontró el contenedor dinámico.");
    return;
  }

  fetch(ruta)
    .then(res => {
      if (!res.ok) throw new Error("No se pudo cargar el módulo.");
      return res.text();
    })
    .then(html => {

      // Pequeña transición visual
      contenedor.style.opacity = 0;

      setTimeout(() => {
        contenedor.innerHTML = html;
        contenedor.style.opacity = 1;
        window.scrollTo(0, 0);
      }, 200);

    })
    .catch(error => {

      contenedor.innerHTML = `
        <p style="color:red; padding:1rem;">
          ❌ Error al cargar el módulo.
        </p>
      `;

      console.error(error);
    });
}


// =======================================================
// 🔹 FUNCIÓN AUXILIAR: CAPITALIZAR TEXTO
// =======================================================
function capitalizarTexto(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
