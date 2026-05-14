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

// Form
document.getElementById('contacto-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('contacto-form').style.display = 'none';
  document.getElementById('form-ok').style.display = 'block';
});