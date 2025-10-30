document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaEnfermedades");
  const btnAgregar = document.getElementById("btnAgregar");
  const form = document.getElementById("formEnfermedades");

  // Agregar una nueva enfermedad
  btnAgregar.addEventListener("click", () => {
    const nueva = document.createElement("div");
    nueva.classList.add("enfermedad-item");
    nueva.innerHTML = `
      <textarea placeholder="Ingrese una enfermedad..." required></textarea>
      <div class="acciones">
        <button type="button" class="btn-editar">✏️</button>
        <button type="button" class="btn-eliminar">🗑️</button>
      </div>
    `;
    lista.appendChild(nueva);
  });

  // Delegación de eventos para editar o eliminar
  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-editar")) {
      const textarea = e.target.closest(".enfermedad-item").querySelector("textarea");
      if (textarea.disabled) {
        textarea.disabled = false;
        textarea.focus();
        e.target.textContent = "💾"; // Cambia ícono a guardar
      } else {
        textarea.disabled = true;
        e.target.textContent = "✏️";
      }
    }

    if (e.target.classList.contains("btn-eliminar")) {
      const item = e.target.closest(".enfermedad-item");
      if (confirm("¿Seguro que deseas eliminar esta enfermedad?")) {
        item.remove();
      }
    }
  });

  // Guardar cambios
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enfermedades = Array.from(lista.querySelectorAll("textarea"))
      .map((t) => t.value.trim())
      .filter((v) => v !== "");

    if (enfermedades.length === 0) {
      alert("⚠️ Debes ingresar al menos una enfermedad.");
      return;
    }

    console.log("✅ Enfermedades guardadas:", enfermedades);
    alert("✅ Cambios guardados correctamente.");

    cargarModulo('modulos/editar_informacion.html'); // vuelve al menú de submódulos
  });
});
