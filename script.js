const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(type) {
        this.type = type; // 'heart' or 'bubble'
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 15 + 5;
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.wobble = Math.random() * Math.PI * 2;
    }
    draw() {
        ctx.globalAlpha = this.opacity;
        if (this.type === 'heart') {
            ctx.fillStyle = "#ff4d6d";
            this.drawHeart(this.x, this.y, this.size);
        } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    drawHeart(x, y, s) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x, y-s/2, x-s, y-s/2, x-s, y);
        ctx.bezierCurveTo(x-s, y+s/2, x, y+s, x, y+s);
        ctx.bezierCurveTo(x, y+s, x+s, y+s/2, x+s, y);
        ctx.bezierCurveTo(x+s, y-s/2, x, y-s/2, x, y);
        ctx.fill();
    }
    update() {
        this.y -= this.speed;
        this.x += Math.sin(this.y / 30) * 0.5;
        if (this.y < -50) this.reset();
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle('heart'));
        particles.push(new Particle('bubble'));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// Button Logic
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
let scale = 1;

if(noBtn) {
    noBtn.addEventListener('click', () => {
        scale += 0.5;
        yesBtn.style.transform = `scale(${scale})`;
        // No button text change
        const texts = ["Pakka?", "Madam ji pls no!", "Ek baar aur socho", "Breakup? Nooo", "Yes daba do"];
        noBtn.innerText = texts[Math.floor(Math.random() * texts.length)];
    });
}

if(yesBtn) {
    yesBtn.addEventListener('click', () => {
        window.location.href = "success.html";
    });
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();