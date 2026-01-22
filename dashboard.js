// ==============================
// Menú lateral (modo responsive)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }
});

// ==============================
// Simulación de cierre de sesión
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector(".logout");
  if (!logoutLink) return;

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
    alert("Sesión cerrada correctamente");
    location.reload();
  });
});

// ==============================
// Cargar módulos dinámicamente
// ==============================
function cargarModulo(ruta) {
  const contenedor = document.getElementById("contenido-dinamico");
  const searchBar = document.querySelector(".search-bar");
  const userAvatar = document.querySelector(".user-avatar");

  if (!contenedor) {
    console.error("⚠️ No se encontró el contenedor con id='contenido-dinamico'");
    return;
  }

  fetch(ruta)
    .then(res => {
      if (!res.ok) throw new Error(`Error al obtener el módulo: ${res.status}`);
      return res.text();
    })
    .then(html => {
      contenedor.style.opacity = 0;

      setTimeout(() => {
        contenedor.innerHTML = html;
        contenedor.style.opacity = 1;
        window.scrollTo(0, 0);

        // Control de visibilidad general
        const esInicio = ruta.includes("inicio");
        const esInfoMedica = ruta.includes("mi_informacion_medica");

        if (esInicio) {
          searchBar?.classList.remove("oculto");
          userAvatar?.classList.remove("oculto");
        } else {
          searchBar?.classList.add("oculto");
          userAvatar?.classList.add("oculto");
        }

        // Ajuste visual del módulo de información médica
        if (esInfoMedica) {
          const modulo = contenedor.querySelector(".modulo");
          if (modulo) {
            modulo.classList.add("layout-ancho");
            modulo.style.display = "block";
            modulo.style.margin = "2rem auto";
            modulo.style.maxWidth = "1200px";
            modulo.style.width = "90%";
          }
        }

        // Ejecutar scripts incluidos en el HTML cargado
        const scripts = contenedor.querySelectorAll("script");
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
          oldScript.remove();
        });
      }, 200);
    })
    .catch(err => {
      contenedor.innerHTML = `
        <p style="color:red; padding:1rem;">
          ❌ No se pudo cargar el módulo.<br>${err.message}
        </p>`;
      console.error(err);
    });
}

// ==============================
// Ver información médica (solo lectura)
// ==============================
function verInfoMedica(event) {
  event.preventDefault(); // evita recarga del <a>

  sessionStorage.setItem("modoInfoMedica", "solo-lectura");
  cargarModulo("modulos/mi_informacion_medica.html");
}

// ==============================
// Módulo inicial (Inicio)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  cargarModulo("modulos/inicio.html");
});
// ==============================
// Cambio de rol (Usuario / Cuidador)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const selectorRol = document.getElementById("selector-rol");
  const userRoleSpan = document.getElementById("user-role");

  if (!selectorRol || !userRoleSpan) return;

  // Cargar rol guardado o valor por defecto
  const rolGuardado = localStorage.getItem("rolActivo") || selectorRol.value;
  selectorRol.value = rolGuardado;
  userRoleSpan.textContent = capitalizarRol(rolGuardado);

  // Escuchar cambios
  selectorRol.addEventListener("change", () => {
    const nuevoRol = selectorRol.value;

    // Guardar rol
    localStorage.setItem("rolActivo", nuevoRol);

    // Mostrar rol en el avatar
    userRoleSpan.textContent = capitalizarRol(nuevoRol);

    // (opcional) Recargar inicio al cambiar rol
    cargarModulo("modulos/inicio.html");
  });
});

// Utilidad
function capitalizarRol(rol) {
  return rol.charAt(0).toUpperCase() + rol.slice(1);
}
