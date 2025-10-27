// ==============================
// Mostrar nombre del usuario
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  const spanUsuario = document.getElementById("nombreUsuario");

  if (nombreUsuario) {
    spanUsuario.textContent = nombreUsuario;
  } else {
    spanUsuario.textContent = "Invitado";
  }
});

// ==============================
// Menú lateral (modo responsive)
// ==============================
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// ==============================
// Funcionalidad del buscador
// ==============================
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const cards = document.querySelectorAll(".card");

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
  if (event.key === "Enter") {
    filtrarTarjetas();
  }
});

// ==============================
// Simulación de cierre de sesión
// ==============================
const logoutLink = document.querySelector(".logout");
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("nombreUsuario");
  alert("Sesión cerrada correctamente");
  location.reload();
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
      // Animación suave
      contenedor.style.opacity = 0;
      setTimeout(() => {
        contenedor.innerHTML = html;
        contenedor.style.opacity = 1;
      }, 150);

      window.scrollTo(0, 0);

      // Mostrar/Ocultar barra y avatar
      if (ruta.includes("inicio")) {
        searchBar?.classList.remove("oculto");
        userAvatar?.classList.remove("oculto");
      } else {
        searchBar?.classList.add("oculto");
        userAvatar?.classList.add("oculto");
      }
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
