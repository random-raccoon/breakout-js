const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 2;
        this.dy = -2;
        this.radius = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    tick() {
        this.x += this.dx;
        this.y += this.dy;
        // TODO: tighten this up a bit, especially for high speeds.
        if (this.x > canvas.width - this.radius) {
            this.x = canvas.width - this.radius;
            this.dx = -this.dx;
        } else if (this.x < this.radius) {
            this.x = this.radius;
            this.dx = -this.dx;
        }
        if (this.y > canvas.height - this.radius) {
            this.y = canvas.height - this.radius;
            this.dy = -this.dy;
        } else if (this.y < this.radius) {
            this.y = this.radius;
            this.dy = -this.dy;
        }
    }
}

const ball = new Ball(canvas.width/2, canvas.height-30);

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.tick();
}
setInterval(tick, 10);