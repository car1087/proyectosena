// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector(".auth-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // evitar envío por defecto

            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();

            // Validar campos vacíos
            if (!email || !password) {
                alert("Por favor, complete todos los campos.");
                return;
            }

            // Validar formato de correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Ingrese un correo electrónico válido.");
                return;
            }

            // Simulación de inicio de sesión
            if (email === "usuario@ejemplo.com" && password === "123456") {
                alert("Inicio de sesión exitoso");
                // Aquí podrías redirigir a un panel de usuario
                // window.location.href = "panel.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }
});
