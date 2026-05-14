// Cursor
const cursorEl = document.getElementById('cursor');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;

window.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursorEl.style.left = mx + 'px';
  cursorEl.style.top  = my + 'px';
});

// Hamburguesa
const hamburguesa     = document.getElementById('hamburguesa');
const menuDesplegable = document.getElementById('menu-desplegable');

if (hamburguesa) {
  hamburguesa.addEventListener('click', () => {
    hamburguesa.classList.toggle('abierto');
    menuDesplegable.classList.toggle('abierto');
  });
}

// Lightbox
document.querySelectorAll('.card-arte').forEach(card => {
  card.addEventListener('click', () => {
    const src      = card.getAttribute('data-src');
    const lightbox = document.getElementById('lightbox');
    const img      = document.getElementById('lightbox-img');
    img.src        = src;
    lightbox.classList.add('abierto');
  });
});

function cerrarImagen() {
  document.getElementById('lightbox').classList.remove('abierto');
  document.getElementById('lightbox-img').src = '';
}

document.getElementById('lightbox').addEventListener('click', cerrarImagen);

document.getElementById('lightbox-cerrar').addEventListener('click', e => {
  e.stopPropagation();
  cerrarImagen();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarImagen();
});


// botón scroll top
const btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTop.classList.add('visible');
  } else {
    btnTop.classList.remove('visible');
  }
});

btnTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



// Pupilas que siguen el cursor
const pupilas = document.querySelectorAll('#pupila');
const brillos = document.querySelectorAll('#brillo');

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  pupilas.forEach((pupila) => {
    const svg = pupila.closest('svg');
    const rect = svg.getBoundingClientRect();

    // Centro del ojo en coordenadas de pantalla
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    // Ángulo y distancia limitada
    const angle = Math.atan2(mouseY - centroY, mouseX - centroX);
    const dist = 40; // cuánto se mueve la pupila (px)

    const moveX = Math.cos(angle) * dist;
    const moveY = Math.sin(angle) * dist;

    pupila.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  brillos.forEach((brillo) => {
    const svg = brillo.closest('svg');
    const rect = svg.getBoundingClientRect();

    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const angle = Math.atan2(mouseY - centroY, mouseX - centroX);
    const dist = 25; // el brillo se mueve menos que la pupila

    const moveX = Math.cos(angle) * dist;
    const moveY = Math.sin(angle) * dist;

    brillo.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});