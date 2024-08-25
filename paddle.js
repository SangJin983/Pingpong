class Paddle {
  static PADDLE_WIDTH = 10;
  static PADDLE_HEIGHT = 100;
  static PADDLE_SPEED = 5;

  x;
  y;
  width = Paddle.PADDLE_WIDTH;
  height = Paddle.PADDLE_HEIGHT;
  dy = Paddle.PADDLE_SPEED;
  moveUp = false;
  moveDown = false;
  name;

  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  draw() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    // Player와 AI 각 클래스로 분리할 예정.
  }
}

class PlayerPaddle extends Paddle {
  move() {
    if (this.moveUp && this.y > 0) {
      this.y -= this.dy;
    }
    if (this.moveDown && this.y + this.height < canvasHeight) {
      this.y += this.dy;
    }
  }
}

class AiPaddle extends Paddle {
  move(ball) {
    if (ball.y < this.y + this.height / 2 && this.y > 0) {
      this.y -= this.dy;
    } else if (
      ball.y > this.y + this.height / 2 &&
      this.y + this.height < canvasHeight
    ) {
      this.y += this.dy;
    }
  }
}
