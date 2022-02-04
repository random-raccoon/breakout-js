class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    start() {
        this.ball = new Ball(this.width / 2, this.height - 30);
        this.paddle = new Paddle(75, this.width / 2, this.height);
        
        this.interval = setInterval(() => this.tick(), 10);
    }
    
    tick() {
        this.paddle.tick();
        this.ball.tick();
        this.ball.checkCollisions();
    
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ball.draw(this.ctx);
        this.paddle.draw(this.ctx);
    }   
}

class Paddle {
    #rightPressed = false;
    #leftPressed = false;

    constructor(width, x, y) {
        this.width = width;
        this.height = 15;
        this.x = x;
        this.y = y;
        this.speed = 7;

        this.#setUpListeners();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x - this.width/2, this.y - this.height, this.width, this.height);
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

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    tick() {
        this.x += this.dx;
        this.y += this.dy;
    }

    checkCollisions() {
        // TODO: All of this.
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

const canvas = document.getElementById("myCanvas");
let game = new Game(canvas);
game.start();
