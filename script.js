(() => {
  const heartContainer = document.getElementById('heart-container');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const startDate = new Date('2019-01-30');
  const hearts = [];

  window.addEventListener('mousemove', e => {
    const { clientX, clientY } = e;
    const moveX = (clientX - width / 2) * 0.02;
    const moveY = (clientY - height / 2) * 0.02;
    canvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  function drawHeart(x, y, size, opacity, angle = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(size, size);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-2, -2, -4, 2, 0, 4);
    ctx.bezierCurveTo(4, 2, 2, -2, 0, 0);
    ctx.closePath();
    ctx.globalAlpha = opacity;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(255, 80, 160, 0.97)";
    ctx.fill();
    ctx.lineWidth = 0.18;
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function createHeart() {
    const colors = ['#c0392b', '#e74c3c', '#d35400', '#27ae60', '#2980b9', '#8e44ad'];
    return {
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      size: 0.4 + Math.random() * 0.4,
      speed: 0.05 + Math.random() * 0.1,
      opacity: 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  for (let i = 0; i < 50; i++) {
    hearts.push(createHeart());
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => {
      h.y += h.speed;
      if (h.y > height + 10) {
        h.y = -10;
        h.x = Math.random() * width;
        h.size = 0.4 + Math.random() * 0.4;
        h.speed = 0.05 + Math.random() * 0.1;
        h.color = ['#c0392b', '#e74c3c', '#d35400', '#27ae60', '#2980b9', '#8e44ad'][Math.floor(Math.random() * 6)];
      }
      drawHeart(h.x, h.y, h.size, h.color, h.opacity);
    });
    requestAnimationFrame(draw);
  }

  function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    const years = Math.floor(diff / 31557600000);
    const days = Math.floor((diff % 31557600000) / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    document.getElementById('date-counter').textContent =
      `Juntos ${years} años, ${days} días, ${hours}h ${minutes}m ${seconds}s`;
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);

  const menuToggle = document.querySelector('.menu-toggle');
  const menuItems = document.querySelector('.menu-items');
  menuToggle?.addEventListener('click', () => menuItems?.classList.toggle('show'));

  const messages = [
    "Este árbol que ves crecer frente a tus ojos es más que una animación",
    "Es un reflejo de lo que siento por vos.",
    "Cada rama representa un momento que vivimos juntos.",
    "Así como este árbol, mi amor por vos se ramifica y se llena de hojas cada día.",
    "Sus raíces se aferran a mi alma, sus ramas se extienden en cada recuerdo, y sus hojas florecen con cada gesto tuyo.",
    "No hay tormenta que lo quiebre, ni invierno que lo detenga. Este árbol florece como floreció mi vida desde que te conocí.",
    "Cada hoja es un ‘te amo’, y nunca dejarán de brotar.",
    "Nuestro amor empezó como una semilla... y hoy es un árbol que no deja de crecer.",
    "Vos sos la luz que lo alimenta, el motivo de su existencia.",
    "Así es mi amor por vos: constante, vivo, en crecimiento.",
    "Y así como este árbol sigue creciendo, también lo hará lo que siento por vos.",
    "Siempre.",
    "Gracias por enseñarme a ser mejor.",
    "TE AMO MI BONITA"
  ];

  function showSlowMessages() {
    const messageElement = document.getElementById('message');
    let index = 0;

    function showNextMessage() {
      if (index < messages.length) {
        messageElement.textContent = messages[index];
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
        setTimeout(() => {
          messageElement.style.opacity = '0';
          messageElement.style.transform = 'translateY(20px)';
          index++;
          setTimeout(showNextMessage, 30000); // espera antes de mostrar el siguiente
        }, 45000); // tiempo visible (25s en total por mensaje)
      }
    }

    setTimeout(() => {
      messageElement.style.display = 'block';
      showNextMessage();
    }, 1000);
  }

  heartContainer.addEventListener('click', () => {
    heartContainer.style.display = 'none';
    draw();
    updateCounter();
    setInterval(updateCounter, 1000);
    showSlowMessages();
  });

  function createBranch(startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, width) {
    return { startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, width };
  }

  // Suponiendo que tienes una referencia al árbol y al mensaje:
  const tree = document.getElementById('tree');
  const message = document.getElementById('message');

  // Función para obtener el centro superior del árbol
  function getTreeTopPosition() {
    const rect = tree.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top
    };
  }

  // Función para crear un corazón que cae desde el árbol
  function createFallingHeart() {
    const { x, y } = getTreeTopPosition();
    const heart = document.createElement('div');
    heart.className = 'heart-leaf falling';
    heart.style.left = `${x - 10}px`; // Ajusta el -10 según el tamaño del corazón
    heart.style.top = `${y}px`;
    heart.style.setProperty('--heart-color', '#ff69b4');
    document.body.appendChild(heart);

    // Elimina el corazón cuando termina la animación
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }

  // Llama a esta función cada cierto tiempo para hacer caer corazones
  setInterval(createFallingHeart, 1200);
})();
