// Variables de modales
const btnEliminar = document.getElementById('btn-eliminar-cuenta');
const modalConfirm = document.getElementById('modal-confirmacion');
const modalExito = document.getElementById('modal-exito');

const spanCerrar = modalConfirm.querySelector('.close');
const btnCancelarModal = document.getElementById('btn-cancelar-modal');
const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
const btnCancelarEliminar = document.getElementById('btn-cancelar-eliminar');
const btnExitoOk = document.getElementById('btn-exito-ok');

btnEliminar.onclick = () => modalConfirm.style.display = 'block';
spanCerrar.onclick = () => modalConfirm.style.display = 'none';
btnCancelarModal.onclick = () => modalConfirm.style.display = 'none';
btnCancelarEliminar.onclick = () => {
  document.getElementById('eliminar-cuenta-container').style.display = 'block';
  modalConfirm.style.display = 'none';
};

// Confirmar eliminación
btnConfirmarEliminar.onclick = () => {
  const email = document.getElementById('email-eliminar').value.trim();
  const password = document.getElementById('password-eliminar').value.trim();
  const id = document.getElementById('id-eliminar').value.trim();

  if(!email || !password || !id) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Aquí iría la lógica real de eliminación de cuenta
  modalConfirm.style.display = 'none';
  modalExito.style.display = 'block';
};

// Cerrar modal de éxito y redirigir a login
btnExitoOk.onclick = () => {
  modalExito.style.display = 'none';
  window.location.href = "login.html"; // Cambiar por la ruta real de login
};

// Cerrar modales haciendo click afuera
window.onclick = (e) => {
  if(e.target === modalConfirm) modalConfirm.style.display = 'none';
  if(e.target === modalExito) modalExito.style.display = 'none';
};
