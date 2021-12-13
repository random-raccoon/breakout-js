const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

class Paddle {
    #rightPressed = false;
    #leftPressed = false;

    constructor(width, x) {
        this.width = width;
        this.height = 15;
        this.x = x;
        this.speed = 7;

        this.#setUpListeners();
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x - this.width/2, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    tick() {
        if (this.#rightPressed) {
            this.x += this.speed;
            if (this.x > canvas.width - this.width / 2) {
                this.x = canvas.width - this.width / 2;
            }
        }
        if (this.#leftPressed) {
            this.x -= this.speed;
            if (this.x < this.width / 2) {
                this.x = this.width / 2;
            }
        }
    }

    #setUpListeners() {
        const that = this;
        document.addEventListener("keydown", function(e) {that.#keyDownHandler(e)}, false);
        document.addEventListener("keyup", function(e) {that.#keyUpHandler(e)}, false);
    }

    #keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.#rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.#leftPressed = true;
        }
    }
    
    #keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            this.#rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            this.#leftPressed = false;
        }
    }
    
    
}

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

const ball = new Ball(canvas.width / 2, canvas.height - 30);
const paddle = new Paddle(75, canvas.width / 2);

function tick() {
    paddle.tick();
    ball.tick();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.draw();
}
setInterval(tick, 10);