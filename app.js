// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {

    const DEMO_USER = { email: "usuario@ejemplo.com", password: "123456" };

    const getUsers = () => {
        try {
            return JSON.parse(localStorage.getItem("usuarios")) || [];
        } catch (e) {
            return [];
        }
    };

    const saveUsers = (users) => {
        localStorage.setItem("usuarios", JSON.stringify(users));
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Login
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
            if (!emailRegex.test(email)) {
                alert("Ingrese un correo electrónico válido.");
                return;
            }

            // Verificar usuario en localStorage o usuario demo
            const users = getUsers();
            const match = users.find(u => u.email === email && u.password === password);

            if (match || (email === DEMO_USER.email && password === DEMO_USER.password)) {
                // Guardar sesión y redirigir al panel
                localStorage.setItem("activeUser", email);
                window.location.href = "panel.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }

    // Registro
    const registerForm = document.querySelector(".register-form");
    if (registerForm) {
        // Role toggle
        const roleButtons = document.querySelectorAll('.role-toggle__btn');
        const roleInput = registerForm.querySelector('input[name="role"]');
        roleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                roleButtons.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
                btn.classList.add('is-active');
                btn.setAttribute('aria-selected', 'true');
                const role = btn.getAttribute('data-role') || 'usuario';
                if (roleInput) roleInput.value = role;
                validateRegisterForm();
            });
        });

        // Referencias a campos
        const fullNameEl = registerForm.querySelector('#fullName');
        const docTypeEl = registerForm.querySelector('#docType');
        const docNumberEl = registerForm.querySelector('#docNumber');
        const phoneEl = registerForm.querySelector('#phone');
        const emailEl = registerForm.querySelector('#email');
        const passwordEl = registerForm.querySelector('#password');
        const confirmEl = registerForm.querySelector('#confirm');
        const termsEl = registerForm.querySelector('#terms');
        const submitBtn = registerForm.querySelector('button[type="submit"]');

        const onlyDigits = (v) => (v || '').replace(/\D+/g, '');

        const isValidRegister = () => {
            const fullName = (fullNameEl?.value || '').trim();
            const docType = (docTypeEl?.value || '').trim();
            const docNumber = onlyDigits(docNumberEl?.value || '').trim();
            const phone = onlyDigits(phoneEl?.value || '').trim();
            const email = (emailEl?.value || '').trim();
            const password = (passwordEl?.value || '').trim();
            const confirm = (confirmEl?.value || '').trim();
            const termsOk = !!termsEl?.checked;

            if (!fullName || !docType || !docNumber || !phone || !email || !password || !confirm) return false;
            if (!emailRegex.test(email)) return false;
            if (password.length < 6) return false;
            if (password !== confirm) return false;
            if (!termsOk) return false;
            return true;
        };

        const validateRegisterForm = () => {
            // Normalizar numéricos (opcional, no intrusivo: no reescribe mientras escribe)
            if (docNumberEl) docNumberEl.pattern = "\\d+";
            if (phoneEl) phoneEl.pattern = "\\d+";

            if (submitBtn) submitBtn.disabled = !isValidRegister();
        };

        [fullNameEl, docTypeEl, docNumberEl, phoneEl, emailEl, passwordEl, confirmEl, termsEl]
            .filter(Boolean)
            .forEach(el => {
                const evt = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
                el.addEventListener(evt, validateRegisterForm);
            });

        // Inicializar estado del botón en carga
        validateRegisterForm();

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Validación final
            if (!isValidRegister()) {
                alert("Revisa los campos y acepta los términos para continuar.");
                return;
            }

            const role = (roleInput?.value || 'usuario').trim();
            const fullName = (fullNameEl?.value || '').trim();
            const docType = (docTypeEl?.value || '').trim();
            const docNumber = onlyDigits(docNumberEl?.value || '').trim();
            const phone = onlyDigits(phoneEl?.value || '').trim();
            const email = (emailEl?.value || '').trim();
            const password = (passwordEl?.value || '').trim();

            const users = getUsers();
            const exists = users.some(u => u.email === email);
            if (exists || email === DEMO_USER.email) {
                alert("Este correo ya está registrado.");
                return;
            }

            users.push({ 
                email, 
                password, 
                role,
                fullName,
                docType,
                docNumber,
                phone,
                createdAt: new Date().toISOString()
            });
            saveUsers(users);

            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.href = "index.html";
        });
    }

    // Panel: protección de ruta, mostrar correo y cerrar sesión
    const userEmailEl = document.getElementById("userEmail");
    const logoutBtn = document.getElementById("logoutBtn");
    if (userEmailEl || logoutBtn) {
        const activeUser = localStorage.getItem("activeUser");
        if (!activeUser) {
            // Si no hay sesión, volver al inicio de sesión
            window.location.href = "index.html";
            return;
        }
        if (userEmailEl) userEmailEl.textContent = activeUser;
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("activeUser");
                window.location.href = "index.html";
            });
        }
    }
});
