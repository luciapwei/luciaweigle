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

// verificar si ya se vio la animación
const yaVio = sessionStorage.getItem('yaVio');

if (yaVio) {
  cursorEl.style.zIndex = '999999'; // agregá esta línea
  document.querySelector('.card').style.display = 'none';
  const segunda = document.getElementById('segunda');
  segunda.style.display  = 'flex';
  segunda.style.opacity  = '1';
  const tigreSegunda = document.getElementById('tigre-segunda');
  tigreSegunda.style.display    = 'block';
  tigreSegunda.style.opacity    = '1';
  tigreSegunda.style.visibility = 'visible';
}

// Hamburguesa
const hamburguesa     = document.getElementById('hamburguesa');
const menuDesplegable = document.getElementById('menu-desplegable');

if (hamburguesa) {
  hamburguesa.addEventListener('click', () => {
    hamburguesa.classList.toggle('abierto');
    menuDesplegable.classList.toggle('abierto');
  });
}



// Animación entrada
document.querySelector('.plant-wrap').style.animation = 'none';
document.querySelector('.text-side').style.animation = 'none';

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelector('.plant-wrap').style.animation = '';
    document.querySelector('.text-side').style.animation = '';
  });
});

// Pupilas
const svg    = document.getElementById('planta-svg');
const pupils = Array.from(document.querySelectorAll('.pupil'));

function loop() {
  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.getAttribute('viewBox').split(' ');
  const vbW     = parseFloat(viewBox[2]);
  const vbH     = parseFloat(viewBox[3]);
  const scaleX  = svgRect.width  / vbW;
  const scaleY  = svgRect.height / vbH;

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

    const moveX = (dx * t) / scaleX;
    const moveY = (dy * t) / scaleY;

    g.setAttribute('transform', `translate(${moveX}, ${moveY})`);
  });

  requestAnimationFrame(loop);
}

loop();

// Click flecha
const arrowBtn  = document.querySelector('.arrow-btn');
const textSide  = document.querySelector('.text-side');
const plantWrap = document.querySelector('.plant-wrap');

arrowBtn.addEventListener('click', () => {
  arrowBtn.style.animation = 'none';

  // 1 y 2 — texto y planta se mueven
  const textRect  = textSide.getBoundingClientRect();
  const plantRect = plantWrap.getBoundingClientRect();
  const centroX   = (window.innerWidth / 2) - (plantRect.width / 2);

  textSide.style.position  = 'fixed';
  textSide.style.top       = textRect.top + 'px';
  textSide.style.left      = textRect.left + 'px';
  textSide.style.width     = textRect.width + 'px';

  plantWrap.style.position = 'fixed';
  plantWrap.style.top      = plantRect.top + 'px';
  plantWrap.style.left     = plantRect.left + 'px';
  plantWrap.style.width    = plantRect.width + 'px';
  plantWrap.style.height   = plantRect.height + 'px';

  requestAnimationFrame(() => {
  if (window.innerWidth <= 480) {
    textSide.style.display = 'none';
  } else {
    textSide.style.transition = 'left 1.5s ease, opacity 0.6s ease';
    textSide.style.left       = '100vw';
    textSide.style.opacity    = '0';
  }

  plantWrap.style.transition = 'left 1.5s ease, top 1.5s ease';
  plantWrap.style.left       = centroX + 'px';
  plantWrap.style.top        = '0';
  plantWrap.style.height     = '100vh';
});

  // ocultamos la card cuando empieza el zoom
  setTimeout(() => {
    document.querySelector('.card').style.display = 'none';
  }, 2400);

  // 3. zoom al ojo central
  setTimeout(() => {
    const svgEl = document.querySelector('.plant-wrap svg');
    document.body.appendChild(svgEl);
    svgEl.style.position   = 'fixed';
    svgEl.style.top        = '0';
    svgEl.style.left       = '0';
    svgEl.style.width      = '100vw';
    svgEl.style.height     = '100vh';
    svgEl.style.zIndex     = '9998';
    svgEl.style.transition = 'transform 1.2s ease';

    // transformOrigin según tamaño de pantalla
    if (window.innerWidth <= 480) {
      svgEl.style.transformOrigin = '42% 36%';
    } else {
      svgEl.style.transformOrigin = '48% 35%';
    }

    cursorEl.style.zIndex = '99999';

    requestAnimationFrame(() => {
      svgEl.style.transform = 'scale(50)';

      // 4. tigre aparece tapando el ojo
      setTimeout(() => {
        const tigreWrap = document.getElementById('tigre-wrap');
        const tigreImg  = document.getElementById('tigre-img');
        const segunda   = document.getElementById('segunda');
        const svgPlanta = document.querySelector('body > svg');

        cursorEl.style.zIndex   = '999999';
        svgPlanta.style.display = 'none';

        tigreWrap.style.zIndex  = '999998';
        tigreWrap.style.display = 'flex';
        tigreWrap.style.opacity = '0';

        tigreImg.style.transform       = 'scale(15)';
        tigreImg.style.transformOrigin = '88% 60%';

        requestAnimationFrame(() => {
          tigreWrap.style.transition = 'opacity 0.4s ease';
          tigreWrap.style.opacity    = '1';

          requestAnimationFrame(() => {
            tigreImg.style.transition = 'transform 1.5s ease';
            tigreImg.style.transform  = 'scale(1)';

            // 5. tigre se traslada a su posición final
            setTimeout(() => {
              segunda.style.display = 'flex';
              segunda.style.opacity = '0';

              const tigreSegunda = document.getElementById('tigre-segunda');
              tigreSegunda.style.display    = 'block';
              tigreSegunda.style.opacity    = '0';
              tigreSegunda.style.visibility = 'hidden';

              requestAnimationFrame(() => {
                const tigreSegundaRect = tigreSegunda.getBoundingClientRect();

                const targetX      = tigreSegundaRect.left;
                const targetY      = tigreSegundaRect.top;
                const targetWidth  = tigreSegundaRect.width;
                const targetHeight = tigreSegundaRect.height;

                const currentRect = tigreImg.getBoundingClientRect();

                tigreImg.style.position  = 'fixed';
                tigreImg.style.top       = currentRect.top + 'px';
                tigreImg.style.left      = currentRect.left + 'px';
                tigreImg.style.width     = currentRect.width + 'px';
                tigreImg.style.height    = currentRect.height + 'px';
                tigreImg.style.transform = 'none';
                tigreImg.style.maxWidth  = 'none';
                tigreImg.style.maxHeight = 'none';
                tigreImg.style.zIndex    = '9999999';

                requestAnimationFrame(() => {
                  tigreImg.style.transition = 'top 1.2s ease, left 1.2s ease, width 1.2s ease, height 1.2s ease';
                  tigreImg.style.top        = targetY + 'px';
                  tigreImg.style.left       = targetX + 'px';
                  tigreImg.style.width      = targetWidth + 'px';
                  tigreImg.style.height     = targetHeight + 'px';

                  setTimeout(() => {
                    tigreWrap.style.background = 'transparent';
                    segunda.style.transition   = 'opacity 0.8s ease';
                    segunda.style.opacity      = '1';

                    setTimeout(() => {
  tigreSegunda.style.opacity    = '1';
  tigreSegunda.style.visibility = 'visible';
  tigreWrap.style.display       = 'none';
  sessionStorage.setItem('yaVio', 'true');
}, 800);

                  }, 1200);
                });
              });

            }, 1600);
          });
        });

      }, 900);
    });

  }, 2400);

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