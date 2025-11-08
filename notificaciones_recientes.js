function cargarNotificacionesRecientes() {
  const lista = document.getElementById('lista-recientes-inicio');
  if(!lista) return;

  lista.innerHTML = "";
  notificaciones.slice(0,5).forEach(n => {
    const li = document.createElement('li');
    li.textContent = `[${n.evento}] ${n.contacto} - ${n.medio} (${n.tipo}) ${n.fecha}`;
    lista.appendChild(li);
  });

  const btnVerTodas = document.getElementById('btn-ver-todas');
  if(btnVerTodas) {
    btnVerTodas.onclick = () => {
      document.querySelector(".submodulo-container")?.classList.add('d-none');
      document.querySelector(".historial-container")?.classList.remove('d-none');
      cargarHistorial();
    }
  }

  const btnVolver = document.getElementById('btn-volver-recientes');
  if(btnVolver) {
    btnVolver.onclick = () => {
      document.querySelector(".historial-container")?.classList.add('d-none');
      document.querySelector(".submodulo-container")?.classList.remove('d-none');
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  cargarNotificacionesRecientes();
});

