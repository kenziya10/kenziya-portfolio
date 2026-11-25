const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let width, height;
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  const universe = document.querySelector(".universe");

  width = canvas.width = universe.clientWidth;
  height = canvas.height = universe.clientHeight;

  stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.3,
    speed: Math.random() * 0.35 + 0.08,
    opacity: Math.random() * 0.8 + 0.2,
    phase: Math.random() * Math.PI * 2
  }));
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);

  stars.forEach(star => {
    star.phase += 0.015;

    const glow = star.opacity *
      (0.65 + Math.sin(star.phase) * 0.35);

    ctx.beginPath();
    ctx.arc(
      star.x + mouseX * 0.008,
      star.y + mouseY * 0.008,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(180, 215, 255, ${glow})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#5baaff";
    ctx.fill();

    star.y -= star.speed;

    if (star.y < 0) {
      star.y = height;
      star.x = Math.random() * width;
    }
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", event => {
  mouseX = event.clientX - width / 2;
  mouseY = event.clientY - height / 2;
});

resizeCanvas();
animateStars();