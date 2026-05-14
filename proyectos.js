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

// Cards flotantes
document.querySelectorAll('.card-flotante').forEach(card => {
  card.addEventListener('click', () => {
    const href = card.getAttribute('data-href');
    if (href) window.location.href = href;
  });
});

// Pupilas
const svg    = document.getElementById('planta-svg');
const pupils = Array.from(document.querySelectorAll('.pupil'));

function loop() {
  if (!svg) return;
  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.getAttribute('viewBox').split(' ');
  const scaleX  = svgRect.width  / parseFloat(viewBox[2]);
  const scaleY  = svgRect.height / parseFloat(viewBox[3]);

  pupils.forEach(g => {
    const ocx = parseFloat(g.getAttribute('data-cx'));
    const ocy = parseFloat(g.getAttribute('data-cy'));
    if (isNaN(ocx) || isNaN(ocy)) return;

    const ex   = svgRect.left + ocx * scaleX;
    const ey   = svgRect.top  + ocy * scaleY;
    const dx   = mx - ex;
    const dy   = my - ey;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const MAX_PX = 5 * Math.min(scaleX, scaleY);
    const t      = Math.min(dist, MAX_PX) / dist;

    g.setAttribute('transform', `translate(${(dx * t) / scaleX}, ${(dy * t) / scaleY})`);
  });

  requestAnimationFrame(loop);
}

loop();