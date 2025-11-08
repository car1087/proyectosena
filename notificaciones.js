let notificaciones = [
  {evento: "Escaneo QR", contacto: "Juan Pérez", medio: "WhatsApp", tipo: "Alerta", fecha: "2025-11-05 14:00"},
  {evento: "Recordatorio Medicamento", contacto: "María Gómez", medio: "Correo", tipo: "Recordatorio", fecha: "2025-11-05 09:00"},
];

let configuracionEventos = {};
let contactosDisponibles = ["Juan Pérez", "María Gómez", "Carlos Restrepo", "Ana Martínez", "Luis Torres"];
let contactosSeleccionados = [];

function guardarConfiguracion() {
  const evento = document.getElementById("evento-select").value;
  const tipos = Array.from(document.querySelectorAll(".tipo-msg:checked")).map(cb => cb.value);
  const medios = Array.from(document.querySelectorAll(".medio-envio:checked")).map(cb => cb.value);
  const contactos = contactosSeleccionados;

  configuracionEventos[evento] = { tipos, medios, contactos };
  alert(`Configuración guardada para ${evento}`);
  console.log(configuracionEventos);
}

function cargarHistorial() {
  const tabla = document.querySelector(".historial-table tbody");
  if (!tabla) return;
  tabla.innerHTML = "";
  notificaciones.forEach(n => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${n.evento}</td>
      <td>${n.tipo}</td>
      <td>${n.medio}</td>
      <td>${n.contacto}</td>
      <td>Enviado</td>
      <td>${n.fecha}</td>
      <td>-</td>
    `;
    tabla.appendChild(tr);
  });
}

function inicializarSubmoduloNotificaciones() {
  const contactosInput = document.getElementById('contactos-input');
  const tagsContainer = document.getElementById('tags');

  function agregarTag(contacto) {
    if (!contactosSeleccionados.includes(contacto)) {
      contactosSeleccionados.push(contacto);
      const tag = document.createElement('span');
      tag.classList.add('tag');
      tag.textContent = contacto;
      const removeBtn = document.createElement('span');
      removeBtn.classList.add('remove-tag');
      removeBtn.textContent = '×';
      removeBtn.onclick = () => eliminarTag(contacto, tag);
      tag.appendChild(removeBtn);
      tagsContainer.appendChild(tag);
    }
    contactosInput.value = '';
  }

  function eliminarTag(contacto, tagElement) {
    contactosSeleccionados = contactosSeleccionados.filter(c => c !== contacto);
    tagsContainer.removeChild(tagElement);
  }

  contactosInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && contactosInput.value.trim() !== '') {
      e.preventDefault();
      const contacto = contactosDisponibles.find(c => c.toLowerCase() === contactosInput.value.trim().toLowerCase());
      if (contacto) agregarTag(contacto);
    }
  });

  // Botones
  const btnGuardar = document.querySelector(".btn-guardar");
  if (btnGuardar) btnGuardar.onclick = guardarConfiguracion;
  const btnVolver = document.querySelector(".btn-volver");
  if (btnVolver) btnVolver.onclick = () => cargarModulo('modulos/ajustes.html');
}

// Función para cargar HTML dinámicamente desde dashboard
function cargarModulo(ruta) {
  fetch(ruta)
    .then(res => res.text())
    .then(html => {
      document.getElementById('contenido').innerHTML = html;
      if(ruta.includes('notificaciones.html')) {
        inicializarSubmoduloNotificaciones();
      }
    });
}
