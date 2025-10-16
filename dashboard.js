// ====== Mostrar el nombre del usuario ======
document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  const spanUsuario = document.getElementById("nombreUsuario");

  if (nombreUsuario) {
    spanUsuario.textContent = nombreUsuario;
  } else {
    spanUsuario.textContent = "Invitado";
  }
});

// ====== Funcionalidad del botón hamburguesa ======
const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
