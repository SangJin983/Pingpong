import { ctx } from "./preference.js";

export class Paddle {
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
  movingLogic;

  constructor(x, y, name, movingLogic) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.movingLogic = movingLogic;
  }

  draw() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(ball = null) {
    this.movingLogic.move(this, ball);
  }
}
