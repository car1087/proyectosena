document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombreEnfermedad");
  const btnAgregar = document.getElementById("btnAgregar");
  const lista = document
    .getElementById("tablaEnfermedades")
    .querySelector("tbody");
  const form = document.getElementById("formEnfermedades");

  let enfermedades = [];
  let editIndex = -1;

  // 👉 Agregar o editar enfermedad
  btnAgregar.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();

    if (!nombre) {
      alert("Por favor ingresa el nombre de la enfermedad.");
      return;
    }

    if (editIndex === -1) {
      enfermedades.push({ nombre });
    } else {
      enfermedades[editIndex] = { nombre };
      editIndex = -1;
    }

    formReset();
    renderTabla();
  });

  // 👉 Renderizar tabla
  function renderTabla() {
    lista.innerHTML = "";

    enfermedades.forEach((enf, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${enf.nombre}</td>
        <td>
          <button type="button" class="btn btn-editar">✏️ Editar</button>
          <button type="button" class="btn btn-eliminar">🗑️ Eliminar</button>
        </td>
      `;

      // Editar
      tr.querySelector(".btn-editar").addEventListener("click", () => {
        nombreInput.value = enf.nombre;
        editIndex = index;
      });

      // Eliminar
      tr.querySelector(".btn-eliminar").addEventListener("click", () => {
        if (confirm("¿Seguro que deseas eliminar esta enfermedad?")) {
          enfermedades.splice(index, 1);
          renderTabla();
        }
      });

      lista.appendChild(tr);
    });
  }

  // 👉 Resetear formulario
  function formReset() {
    nombreInput.value = "";
  }

  // 👉 Guardar cambios
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (enfermedades.length === 0) {
      alert("⚠️ Debes agregar al menos una enfermedad.");
      return;
    }

    console.log("✅ Enfermedades guardadas:", enfermedades);
    alert("✅ Cambios guardados correctamente.");

    cargarModulo("modulos/editar_informacion.html");
  });
});
