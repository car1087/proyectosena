const nombreInput = document.getElementById("nombreMedicamento");
const dosisInput = document.getElementById("dosis");
const viaInput = document.getElementById("viaAdministracion");
const cantidadInput = document.getElementById("cantidadDosis");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaMedicamentos").querySelector("tbody");

let medicamentos = [];
let editIndex = -1;

// Función para agregar o editar medicamento
btnAgregar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const dosis = dosisInput.value.trim();
  const via = viaInput.value;
  const cantidad = cantidadInput.value;

  if (!nombre || !dosis || !via || !cantidad) {
    alert("Por favor complete todos los campos.");
    return;
  }

  if (editIndex === -1) {
    medicamentos.push({ nombre, dosis, via, cantidad });
  } else {
    medicamentos[editIndex] = { nombre, dosis, via, cantidad };
    editIndex = -1;
  }

  formReset();
  renderTabla();
});

function renderTabla() {
  lista.innerHTML = "";

  medicamentos.forEach((med, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${med.nombre}</td>
      <td>${med.dosis}</td>
      <td>${med.via}</td>
      <td>${med.cantidad}</td>
      <td>
        <button type="button" class="btn btn-editar">✏️ Editar</button>
        <button type="button" class="btn btn-eliminar">🗑️ Eliminar</button>
      </td>
    `;

    // Editar
    tr.querySelector(".btn-editar").addEventListener("click", () => {
      nombreInput.value = med.nombre;
      dosisInput.value = med.dosis;
      viaInput.value = med.via;
      cantidadInput.value = med.cantidad;
      editIndex = index;
    });

    // Eliminar
    tr.querySelector(".btn-eliminar").addEventListener("click", () => {
      medicamentos.splice(index, 1);
      renderTabla();
    });

    lista.appendChild(tr);
  });
}

function formReset() {
  nombreInput.value = "";
  dosisInput.value = "";
  viaInput.value = "";
  cantidadInput.value = "";
}

// Guardar cambios
document.querySelector(".btn-guardar").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Medicamentos guardados:", medicamentos);
  alert("Medicamentos guardados correctamente.");
});

