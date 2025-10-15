document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("¿Seguro que deseas cerrar sesión?");
    if (confirmLogout) {
      alert("Sesión cerrada correctamente.");
      window.location.href = "login.html"; // o la ruta que desees
    }
  });

  // Ejemplo: destacar el menú activo
  const menuItems = document.querySelectorAll(".menu li");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
});
