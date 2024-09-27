class MotionParticle {
  constructor(dispersion, velocity, container) {
    const { graphicsContext, cursor } = container;

    this.graphicsContext = graphicsContext;
    this.x = cursor.x;
    this.y = cursor.y;
    this.movementX = cursor.movementX * 0.1;
    this.movementY = cursor.movementY * 0.1;
    this.dimension = Math.random() + 1;
    this.shrinkRate = 0.01;
    this.velocity = velocity * 0.08;
    this.dispersion = dispersion * this.velocity;
    this.dispersionX = (Math.random() - 0.5) * this.dispersion - this.movementX;
    this.dispersionY = (Math.random() - 0.5) * this.dispersion - this.movementY;

    const hue = Math.random() * 360;
    const saturation = Math.random() * 50 + 50;
    const lightness = Math.random() * 40 + 40;

    this.shade = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  render() {
    this.graphicsContext.fillStyle = this.shade;
    this.graphicsContext.beginPath();
    this.graphicsContext.arc(this.x, this.y, this.dimension, 0, Math.PI * 2);
    this.graphicsContext.fill();
  }

  shrink() {
    this.dimension -= this.shrinkRate;
  }

  drift() {
    this.x += this.dispersionX * this.dimension;
    this.y += this.dispersionY * this.dimension;
  }

  refresh() {
    this.render();
    this.drift();
    this.shrink();
  }
}

class MotionParticles extends HTMLElement {
  static register(tag = "motion-particles") {
    if ("customElements" in window) {
      customElements.define(tag, this);
    }
  }

  static style = `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
    }

    canvas {
      display: block;
    }
  `;

  constructor() {
    super();

    this.canvasElement;
    this.graphicsContext;
    this.frameRate = 60;
    this.frameDuration = 1000 / this.frameRate;
    this.previousTime;
    this.particleArray = [];
    this.cursor = {
      x: 0,
      y: 0,
      movementX: 0,
      movementY: 0
    };
    this.colorShift = 0;
  }

  connectedCallback() {
    const canvas = document.createElement("canvas");
    const styleSheet = new CSSStyleSheet();

    this.shadowRootInstance = this.attachShadow({ mode: "open" });

    styleSheet.replaceSync(MotionParticles.style);
    this.shadowRootInstance.adoptedStyleSheets = [styleSheet];

    this.shadowRootInstance.append(canvas);

    this.canvasElement = this.shadowRootInstance.querySelector("canvas");
    this.graphicsContext = this.canvasElement.getContext("2d");
    this.adjustCanvasSize();
    this.initializeEvents();
    this.previousTime = performance.now();
    this.animateMotion();
  }

  generateParticles(event, { quantity, velocity, dispersion }) {
    this.updateCursorPosition(event);

    for (let i = 0; i < quantity; i++) {
      this.particleArray.push(new MotionParticle(dispersion, velocity, this));
    }
  }

  updateCursorPosition(event) {
    const rect = this.canvasElement.getBoundingClientRect();
    this.cursor.x = event.clientX - rect.left;
    this.cursor.y = event.clientY - rect.top;
    this.cursor.movementX = event.movementX;
    this.cursor.movementY = event.movementY;
  }

  initializeEvents() {
    window.addEventListener("click", (event) => {
      this.generateParticles(event, {
        quantity: 300,
        velocity: Math.random() + 1,
        dispersion: Math.random() + 50
      });
    });

    window.addEventListener("pointermove", (event) => {
      this.generateParticles(event, {
        quantity: 20,
        velocity: this.calculateCursorSpeed(event),
        dispersion: 1
      });
    });

    window.addEventListener("resize", () => this.adjustCanvasSize());
  }

  calculateCursorSpeed(event) {
    const movementX = event.movementX;
    const movementY = event.movementY;
    const speed = Math.floor(Math.sqrt(movementX * movementX + movementY * movementY));

    return speed;
  }

  manageParticles() {
    for (let i = 0; i < this.particleArray.length; i++) {
      this.particleArray[i].refresh();

      if (this.particleArray[i].dimension <= 0.1) {
        this.particleArray.splice(i, 1);
        i--;
      }
    }
  }

  adjustCanvasSize() {
    this.canvasElement.width = window.innerWidth;
    this.canvasElement.height = window.innerHeight;
  }

  animateMotion() {
    requestAnimationFrame(() => this.animateMotion());

    const currentTime = performance.now();
    const elapsedTime = currentTime - this.previousTime;

    if (elapsedTime < this.frameDuration) return;

    const leftoverTime = elapsedTime % this.frameDuration;

    this.previousTime = currentTime - leftoverTime;

    this.graphicsContext.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.colorShift = this.colorShift > 360 ? 0 : (this.colorShift += 3);

    this.manageParticles();
  }
}

MotionParticles.register();
