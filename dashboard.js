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

