// ==============================
// Menú lateral (modo responsive)
// ==============================
// Verificar autenticación y cargar datos del usuario
async function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No hay token, redirigiendo al login...');
        window.location.href = 'index.html';
        return false;
    }
    return token;
}

// Configuración común para los fetch
const getFetchConfig = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

// Cargar información médica
async function cargarInformacionMedica(token) {
    try {
        const response = await fetch('/api/dashboard/informacion-medica', getFetchConfig(token));
        
        if (!response.ok) {
            throw new Error('Error al cargar información médica');
        }

        const data = await response.json();
        console.log('Información médica cargada:', data);

        // Actualizar campos del formulario si existe
        const infoForm = document.querySelector('.info-form');
        if (infoForm) {
            if (data) {
                const tipoSangreInput = infoForm.querySelector('input[value=" "]');
                if (tipoSangreInput) tipoSangreInput.value = data.tipo_sangre || ' ';

                const textareas = infoForm.querySelectorAll('textarea');
                if (textareas[0]) textareas[0].value = data.alergias || ' ';
                if (textareas[1]) textareas[1].value = data.medicamentos || ' ';
                if (textareas[2]) textareas[2].value = data.notas_medicas || ' ';
            }
        }

        return data;
    } catch (error) {
        console.error('Error al cargar información médica:', error);
        if (error.status === 401) {
            window.location.href = 'index.html';
        }
        return null;
    }
}

// Cargar contactos de emergencia
async function cargarContactosEmergencia(token) {
    try {
        const response = await fetch('/api/dashboard/contactos-emergencia', getFetchConfig(token));
        
        if (!response.ok) {
            throw new Error('Error al cargar contactos de emergencia');
        }

        const contactos = await response.json();
        console.log('Contactos de emergencia cargados:', contactos);
        return contactos;
    } catch (error) {
        console.error('Error al cargar contactos de emergencia:', error);
        if (error.status === 401) {
            window.location.href = 'index.html';
        }
        return [];
    }
}

// Función principal que inicializa el frontend del dashboard
async function initializeFrontend() {
  // Verificar autenticación
  const token = await verificarAutenticacion();
  if (!token) return;

  // Inicializar UI (menú lateral / toggle)
  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  } else {
    console.warn("⚠️ No se encontró el botón o sidebar en el DOM.");
  }

  // Cargar datos del usuario (información médica y contactos)
  try {
    await Promise.all([
      cargarInformacionMedica(token),
      cargarContactosEmergencia(token)
    ]);
  } catch (error) {
    console.error('Error al cargar datos del dashboard:', error);
  }

  // Cargar módulo inicial (Inicio)
  cargarModulo('modulos/inicio.html');
}

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
// Cierre de sesión
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector(".logout");
  if (!logoutLink) return;

  logoutLink.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("activeUser");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem("nombreUsuario");
    alert("Sesión cerrada correctamente");
    window.location.href = "index.html";
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

          // Set user name in inicio module
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          const nombreUsuarioEl = contenedor.querySelector('#nombreUsuario');
          if (nombreUsuarioEl && user.fullName) {
            const firstName = user.fullName.split(' ')[0];
            nombreUsuarioEl.textContent = firstName;
          }
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
// Ejecutar inicialización tras carga del DOM
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // Intentar inicializar inmediatamente (si el email ya está disponible)
  initializeFrontend().catch(err => console.error('Error en initializeFrontend:', err));

  // Además, observar #userEmail: cuando el email sea escrito por `app.js` llamamos a initializeFrontend()
  const userEmailEl = document.getElementById('userEmail');
  if (userEmailEl) {
    if (userEmailEl.textContent && userEmailEl.textContent.trim() !== '') {
      // Ya está presente
      initializeFrontend().catch(err => console.error('Error en initializeFrontend:', err));
    } else {
      const observer = new MutationObserver((mutations, obs) => {
        if (userEmailEl.textContent && userEmailEl.textContent.trim() !== '') {
          obs.disconnect();
          initializeFrontend().catch(err => console.error('Error en initializeFrontend:', err));
        }
      });
      observer.observe(userEmailEl, { childList: true, characterData: true, subtree: true });
    }
  }
});

