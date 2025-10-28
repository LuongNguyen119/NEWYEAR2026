function startFireworks() {
  const canvas = document.getElementById("fireworks");
  canvas.style.display = "block";
  const ctx = canvas.getContext("2d");
  let fireworks = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Firework {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.trails = [];
      this.exploded = false;
      this.alpha = 1;
      this.speed = Math.random() * 3 + 4;
      this.targetY = (Math.random() * canvas.height) / 2;
      this.trail = [];
    }

    update() {
      if (!this.exploded) {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 10) this.trail.shift();

        this.y -= this.speed;
        if (this.y < this.targetY) {
          this.explode();
        }
      } else {
        this.trails.forEach((p) => p.update());
        this.alpha -= 0.02;
      }
    }

    explode() {
      this.exploded = true;
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 5 + 2;
        this.trails.push(
          new Particle(this.x, this.y, angle, speed, this.color)
        );
      }
    }

    draw() {
      if (!this.exploded) {
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        for (let i = 0; i < this.trail.length - 1; i++) {
          const p1 = this.trail[i];
          const p2 = this.trail[i + 1];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
      } else {
        this.trails.forEach((p) => p.draw());
      }
    }
  }

  class Particle {
    constructor(x, y, angle, speed, color) {
      this.x = x;
      this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.1;
      this.alpha = 1;
      this.color = color;
    }

    update() {
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 0.015;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((fw, i) => {
      fw.update();
      fw.draw();
      if (fw.alpha <= 0) fireworks.splice(i, 1);
    });

    requestAnimationFrame(animate);
  }

  animate();

  const fireInterval = setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = canvas.height;
    const colors = ["#ff4b4b", "#ffcc00", "#00e5ff", "#ff66ff", "#66ff66"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push(new Firework(x, y, color));
  }, Math.random() * 600 + 300);
}
