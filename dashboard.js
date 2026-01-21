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
  } else {
    console.warn("⚠️ No se encontró el botón o sidebar en el DOM.");
  }
});

// ==============================
// Funcionalidad del buscador
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const cards = document.querySelectorAll(".card");

  if (!searchInput || !searchBtn) return; // seguridad

  function filtrarTarjetas() {
    const query = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const desc = card.dataset.desc.toLowerCase();

      if (title.includes(query) || desc.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  searchBtn.addEventListener("click", filtrarTarjetas);
  searchInput.addEventListener("keyup", event => {
    if (event.key === "Enter") filtrarTarjetas();
  });
});

// ==============================
// Simulación de cierre de sesión
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector(".logout");
  if (!logoutLink) return;

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("nombreUsuario");
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
        console.log("📄 Módulo cargado:", ruta);
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
          } else {
            console.warn("⚠️ No se encontró la clase .modulo dentro de mi_informacion_medica.html");
          }
        }

        // 🧩 NUEVO: ejecutar scripts incluidos en el HTML cargado
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
      contenedor.innerHTML = `<p style="color:red; padding:1rem;">❌ No se pudo cargar el módulo.<br>${err.message}</p>`;
      console.error("Error al cargar el módulo:", err);
    });
}

// ==============================
// Módulo inicial (Inicio)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  cargarModulo('modulos/inicio.html');
});

// ==============================
// Selector de rol (Usuario / Cuidador)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const selectorRol = document.getElementById("selector-rol");
  const userRoleText = document.getElementById("user-role");

  if (!selectorRol) return;

  // Rol inicial
  const rolGuardado = localStorage.getItem("rolActivo") || "usuario";
  aplicarRol(rolGuardado);
  selectorRol.value = rolGuardado;

  // Cambio de rol
  selectorRol.addEventListener("change", (e) => {
    const nuevoRol = e.target.value;
    localStorage.setItem("rolActivo", nuevoRol);
    aplicarRol(nuevoRol);
    cargarModulo("modulos/inicio.html");
  });

  function aplicarRol(rol) {
    document.body.className = `rol-${rol}`;

    if (userRoleText) {
      userRoleText.textContent =
        rol === "cuidador" ? "Rol Cuidador" : "Rol Usuario";
    }
  }
});
