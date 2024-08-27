import { ctx, canvasHeight, canvasWidth } from "./preference.js";

export class Ball {
  static #BALL_SIZE = 10;
  static #BALL_SPEED = 4;

  x = canvasWidth / 2;
  y = canvasHeight / 2;
  radius = Ball.#BALL_SIZE;
  dx = Ball.#BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
  dy = Ball.#BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);

  draw() {
    ctx.fillStyle = "#00ff00";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  #reset() {
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.dx = Ball.#BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    this.dy = Ball.#BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
  }

  move(isCollision) {
    this.x += this.dx;
    this.y += this.dy;
    // 벽과 충돌했을 때의 움직임
    if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
      this.dy = -this.dy;
      return "wallCollision"
    }
    // 패들과 충돌 했을 때의 움직임
    if (isCollision) {
      this.dx = -this.dx;
      return "paddleCollsion"
    }
    // 공이 화면에 넘어가면 초기화
    if (this.x + this.radius < 0 || this.x - this.radius > canvasWidth) {
      this.#reset();
      return "outOfViewport"
    }

    return "going"
  }
}
