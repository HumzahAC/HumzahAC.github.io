
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('dot-canvas');
    const ctx = canvas.getContext('2d');
    const cursor = document.getElementById('cursor');

    const dotSpacing = 25;
    const dotRadius = 2;
    const repulsionRadius = 100;
    const maxDistance = 15;
    const clickRadius = 150;
    const clickForce = 20;

    let dots = [];
    let mouseX = -100;
    let mouseY = -100;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let clickEffects = [];

    function initCanvas() {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      dots = [];
      const cols = Math.ceil(canvasWidth / dotSpacing);
      const rows = Math.ceil(canvasHeight / dotSpacing);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          dots.push({
            x: x * dotSpacing + dotSpacing / 2,
            y: y * dotSpacing + dotSpacing / 2,
            originalX: x * dotSpacing + dotSpacing / 2,
            originalY: y * dotSpacing + dotSpacing / 2,
            color: (x + y) % 2 === 0 ?
              { r: 95, g: 10, b: 123, a: 0.6 } :
              { r: 64, g: 1, b: 96, a: 0.8 }
          });
        }
      }
    }

    function createClickEffect(x, y) {
      clickEffects.push({
        x: x,
        y: y,
        radius: 5,
        maxRadius: clickRadius,
        alpha: 0.5,
        color: `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
      });

      cursor.classList.add('click-effect');
      setTimeout(() => {
        cursor.classList.remove('click-effect');
      }, 300);
    }

    function draw() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      clickEffects = clickEffects.filter(effect => {
        ctx.beginPath();
        

    
      });

      dots.forEach(dot => {
        let forceX = 0;
        let forceY = 0;

       

   

       

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color.r}, ${dot.color.g}, ${dot.color.b}, ${dot.color.a})`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', (e) => {
      createClickEffect(e.clientX, e.clientY);

      const clickX = e.clientX;
      const clickY = e.clientY;

      dots.forEach(dot => {
        const dx = clickX - dot.x;
        const dy = clickY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < clickRadius) {
          const delay = distance * 1.5;
          const originalColor = { ...dot.color };

          setTimeout(() => {
            dot.color = { r: 255, g: 255, b: 255, a: 1 };
            setTimeout(() => {
              dot.color = originalColor;
            }, 150);
          }, delay);
        }
      });
    });

    window.addEventListener('resize', initCanvas);

    initCanvas();
    draw();
  });

  