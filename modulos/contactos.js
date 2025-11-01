const nombreInput = document.getElementById("nombreContacto");
const tipoDocInput = document.getElementById("tipoDocumento");
const numeroDocInput = document.getElementById("numeroDocumento");
const parentescoInput = document.getElementById("parentesco");
const telefonoInput = document.getElementById("telefono");
const emailInput = document.getElementById("email");
const observacionesInput = document.getElementById("observaciones");
const btnAgregar = document.getElementById("btnAgregarContacto");
const lista = document.getElementById("listaContactos").querySelector("tbody");

let contactos = [];
let editIndex = -1;

// Agregar o editar contacto
btnAgregar.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const tipoDoc = tipoDocInput.value;
  const numeroDoc = numeroDocInput.value.trim();
  const parentesco = parentescoInput.value;
  const telefono = telefonoInput.value.trim();
  const email = emailInput.value.trim();
  const observaciones = observacionesInput.value.trim();

  if (!nombre || !tipoDoc || !numeroDoc || !parentesco || !telefono) {
    alert("Por favor complete todos los campos obligatorios.");
    return;
  }

  const contactoData = { nombre, tipoDoc, numeroDoc, parentesco, telefono, email, observaciones };

  if (editIndex === -1) {
    contactos.push(contactoData);
  } else {
    contactos[editIndex] = contactoData;
    editIndex = -1;
  }

  formReset();
  renderTabla();
});

function renderTabla() {
  lista.innerHTML = "";

  contactos.forEach((contacto, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${contacto.nombre}</td>
      <td>${contacto.tipoDoc}</td>
      <td>${contacto.numeroDoc}</td>
      <td>${contacto.parentesco}</td>
      <td>${contacto.telefono}</td>
      <td>${contacto.email}</td>
      <td>${contacto.observaciones}</td>
      <td>
        <button type="button" class="btn btn-editar">✏️ Editar</button>
        <button type="button" class="btn btn-eliminar">🗑️ Eliminar</button>
      </td>
    `;

    // Editar
    tr.querySelector(".btn-editar").addEventListener("click", () => {
      nombreInput.value = contacto.nombre;
      tipoDocInput.value = contacto.tipoDoc;
      numeroDocInput.value = contacto.numeroDoc;
      parentescoInput.value = contacto.parentesco;
      telefonoInput.value = contacto.telefono;
      emailInput.value = contacto.email;
      observacionesInput.value = contacto.observaciones;
      editIndex = index;
    });

    // Eliminar
    tr.querySelector(".btn-eliminar").addEventListener("click", () => {
      contactos.splice(index, 1);
      renderTabla();
    });

    lista.appendChild(tr);
  });
}

function formReset() {
  nombreInput.value = "";
  tipoDocInput.value = "";
  numeroDocInput.value = "";
  parentescoInput.value = "";
  telefonoInput.value = "";
  emailInput.value = "";
  observacionesInput.value = "";
}

// Guardar cambios
document.querySelector(".btn-guardar").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Contactos guardados:", contactos);
  alert("Contactos de emergencia guardados correctamente.");
});
