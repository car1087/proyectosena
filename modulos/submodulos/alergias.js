const tipoInput = document.getElementById("tipoAlergia");
const gravedadInput = document.getElementById("gravedad");
const sustanciaInput = document.getElementById("sustancia");
const observacionesInput = document.getElementById("observaciones");
const btnAgregar = document.getElementById("btnAgregarAlergia");
const lista = document.getElementById("listaAlergias").querySelector("tbody");

let alergias = [];
let editIndex = -1;

// Agregar o editar alergia
btnAgregar.addEventListener("click", () => {
  const tipo = tipoInput.value;
  const gravedad = gravedadInput.value;
  const sustancia = sustanciaInput.value.trim();
  const observaciones = observacionesInput.value.trim();

  if (!tipo || !gravedad || !sustancia) {
    alert("Por favor complete todos los campos obligatorios.");
    return;
  }

  if (editIndex === -1) {
    alergias.push({ tipo, gravedad, sustancia, observaciones });
  } else {
    alergias[editIndex] = { tipo, gravedad, sustancia, observaciones };
    editIndex = -1;
  }

  formReset();
  renderTabla();
});

function renderTabla() {
  lista.innerHTML = "";

  alergias.forEach((alergia, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${alergia.tipo}</td>
      <td>${alergia.gravedad}</td>
      <td>${alergia.sustancia}</td>
      <td>${alergia.observaciones}</td>
      <td>
        <button type="button" class="btn btn-editar">✏️ Editar</button>
        <button type="button" class="btn btn-eliminar">🗑️ Eliminar</button>
      </td>
    `;

    // Editar
    tr.querySelector(".btn-editar").addEventListener("click", () => {
      tipoInput.value = alergia.tipo;
      gravedadInput.value = alergia.gravedad;
      sustanciaInput.value = alergia.sustancia;
      observacionesInput.value = alergia.observaciones;
      editIndex = index;
    });

    // Eliminar
    tr.querySelector(".btn-eliminar").addEventListener("click", () => {
      alergias.splice(index, 1);
      renderTabla();
    });

    lista.appendChild(tr);
  });
}

function formReset() {
  tipoInput.value = "";
  gravedadInput.value = "";
  sustanciaInput.value = "";
  observacionesInput.value = "";
}

// Guardar cambios
document.querySelector(".btn-guardar").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Alergias guardadas:", alergias);
  alert("Alergias guardadas correctamente.");
});
