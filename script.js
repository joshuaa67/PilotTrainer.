let puntos = 0;

const botones = document.querySelectorAll('.opcion');
const puntosTexto = document.getElementById('puntos');
const preguntaTexto = document.getElementById('pregunta');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.textContent === 'Ala') {
      puntos += 10;
      alert('✅ ¡Correcto!');
      preguntaTexto.textContent = '¿Qué parte del avión impulsa el vuelo?';
      botones[0].textContent = 'Timón';
      botones[1].textContent = 'Motor';
      botones[2].textContent = 'Fuselaje';
    } else if (boton.textContent === 'Motor') {
      puntos += 10;
      alert('✅ ¡Correcto!');
      preguntaTexto.textContent = '¡Felicidades! Terminaste la lección. 🏆';
      document.getElementById('opciones').innerHTML = '<p>Tu puntuación final: ' + puntos + ' ⭐</p>';
    } else {
      alert('❌ Incorrecto');
    }
    puntosTexto.textContent = puntos;
  });

});

const botonInicio = document.getElementById('btnInicio');
const campoNombre = document.getElementById('nombre');
const mensaje = document.getElementById('mensaje');

if (botonInicio) {
  botonInicio.addEventListener('click', () => {
    const nombre = campoNombre.value.trim();

    if (nombre === '') {
      mensaje.textContent = 'Por favor, escribe tu nombre para continuar.';
      campoNombre.style.borderColor = '#ff5252';
      return;
    }

    localStorage.setItem('usuario', nombre);
    window.location.href = 'niveles.html';
  });
}


function mostrarNotificacionLogro(nombre, icono) {
  const notificacion = document.createElement('div');
  notificacion.classList.add('notificacion-logro');
  notificacion.innerHTML = `
    <div class="icono">${icono}</div>
    <div class="texto">
      <h3>¡Logro desbloqueado!</h3>
      <p>${nombre}</p>
    </div>
  `;
  document.body.appendChild(notificacion);

  // Eliminar la notificación después de 3 segundos
  setTimeout(() => {
    notificacion.classList.add('ocultar');
    setTimeout(() => notificacion.remove(), 600);
  }, 3000);
}

// Función para verificar y desbloquear logros
function verificarLogros() {
  const totalPuntos = parseInt(localStorage.getItem('totalPuntos') || '0');
  const racha = parseInt(localStorage.getItem('racha') || '0');
  const progreso = parseInt(localStorage.getItem('progreso') || '1');

  const logrosPrevios = JSON.parse(localStorage.getItem('logrosDesbloqueados') || '[]');
  const nuevosLogros = [];

  const condiciones = [
    { id: 'primeraLeccion', nombre: 'Primera lección completada', icono: '🥇', cumple: progreso > 1 },
    { id: 'racha3', nombre: 'Racha de 3 días', icono: '🔥', cumple: racha >= 3 },
    { id: 'puntos100', nombre: '100 puntos acumulados', icono: '⭐', cumple: totalPuntos >= 100 },
  ];

  condiciones.forEach(l => {
    if (l.cumple && !logrosPrevios.includes(l.id)) {
      nuevosLogros.push(l.id);
      logrosPrevios.push(l.id);
      mostrarNotificacionLogro(l.nombre, l.icono);
    }
  });

  if (nuevosLogros.length > 0) {
    localStorage.setItem('logrosDesbloqueados', JSON.stringify(logrosPrevios));
  }
}