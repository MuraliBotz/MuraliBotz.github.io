const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = []; // Store multiple fireworks
const rayLength = 20; // Small finger-sized ray
const shadowLength = 60; // Length of the neon shadow trail
const particleCount = 400; // Number of particles
const particleSize = 1.2; // Size of each particle

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.9)`;
}

function createFirework() {
    const startX = Math.random() * canvas.width;
    const endX = Math.random() * canvas.width;
    const startY = canvas.height;
    const endY = Math.random() * canvas.height * 0.5;
    
    const firework = {
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        currentX: startX,
        currentY: startY,
        explosion: false,
        particles: [],
        color: getRandomColor(),
        shadowTrail: [], // Array to hold shadow trail positions
        explosionTime: null // Time when the explosion happens
    };

    fireworks.push(firework); // Add firework to the array
}

function drawRay(firework) {
    if (!firework.explosion) {
        const angle = Math.atan2(firework.endY - firework.currentY, firework.endX - firework.currentX);
        
        // Draw the shadow trail behind the ray
        firework.shadowTrail.push({ x: firework.currentX, y: firework.currentY, alpha: 0.5 });
        firework.shadowTrail.forEach((trail, index) => {
            ctx.beginPath();
            ctx.moveTo(trail.x, trail.y);
            ctx.lineTo(
                trail.x - shadowLength * Math.cos(angle),
                trail.y - shadowLength * Math.sin(angle)
            );
            ctx.strokeStyle = `rgba(255, 255, 255, ${trail.alpha})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'white';
            ctx.stroke();

            trail.alpha -= 0.02;
            if (trail.alpha <= 0) {
                firework.shadowTrail.splice(index, 1);
            }
        });

        ctx.beginPath();
        ctx.moveTo(firework.currentX, firework.currentY);
        ctx.lineTo(
            firework.currentX - rayLength * Math.cos(angle),
            firework.currentY - rayLength * Math.sin(angle)
        );
        ctx.strokeStyle = firework.color;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 0; // No glow
        ctx.stroke();

        // Move towards target
        firework.currentY -= (firework.startY - firework.endY) / 50;
        firework.currentX += (firework.endX - firework.startX) / 50;

        if (Math.abs(firework.currentY - firework.endY) < 5) {
            firework.explosion = true;
            firework.explosionTime = Date.now(); // Set the explosion time
            explode(firework);
        }
    }
}

function explode(firework) {
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * 2 * Math.PI;  // Random angle for particle direction
        const speed = Math.random() * 2 + 0.5; // Random speed for the particles
        
        firework.particles.push({
            x: firework.endX,
            y: firework.endY,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            size: particleSize,
            alpha: 1,
            color: getRandomColor()
        });
    }
}

function drawParticles(particles) {
    particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.alpha -= 0.004; // Fade effect

            // Remove particle if alpha is low
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        }
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        drawRay(firework);
        if (firework.explosion) {
            drawParticles(firework.particles);

            // Check if 4 seconds have passed since explosion
            if (Date.now() - firework.explosionTime > 4000) {
                fireworks.splice(index, 1); // Remove the firework after particles disappear
            }
        }
    });

    requestAnimationFrame(animate);
}

// Launch a new firework every 4 seconds
setInterval(createFirework, 4000);
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
