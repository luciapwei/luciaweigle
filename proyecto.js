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

// Carrusel
const slides = Array.from(document.querySelectorAll('.car-slide'));
const dots   = Array.from(document.querySelectorAll('.dot'));
let current  = 0;

function irA(n) {
  slides[current].classList.remove('activa');
  dots[current].classList.remove('activo');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('activa');
  dots[current].classList.add('activo');
}

document.querySelector('.car-prev').addEventListener('click', () => irA(current - 1));
document.querySelector('.car-next').addEventListener('click', () => irA(current + 1));

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => irA(i));
});