import { ctx, canvasWidth, canvasHeight } from "./preference.js";

export class Game {
  constructor(balls, playerPaddle, aiPaddle) {
    this.balls = balls;
    this.playerPaddle = playerPaddle;
    this.aiPaddle = aiPaddle;
    this.lastCollisionTargets = balls
      .map((ball) => ball.id) // [ball.id, ball.id, ...]
      .reduce((acc, cur) => {
        acc[cur] = null;
        return acc;
      }, {}); // {[ball.id]: null, [ball.id]: null, ...}
  }

  #checkCollision(ball, paddle) {
    const isCollision =
      paddle.name !== this.lastCollisionTargets[ball.id] &&
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.x + ball.radius > paddle.x &&
      ball.y + ball.radius > paddle.y &&
      ball.y - ball.radius < paddle.y + paddle.height;

    if (isCollision) {
      this.lastCollisionTargets[ball.id] = paddle.name;
    }

    return isCollision;
  }

  #handleKeyPress(event, keyPressed) {
    if (event.key === "ArrowUp") this.playerPaddle.moveUp = keyPressed;
    if (event.key === "ArrowDown") this.playerPaddle.moveDown = keyPressed;
  }

  addKeyEventListener() {
    document.addEventListener("keydown", (event) =>
      this.#handleKeyPress(event, true)
    );
    document.addEventListener("keyup", (event) =>
      this.#handleKeyPress(event, false)
    );
  }

  gameLoop() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 지우기(계속 그려야 되니까)
    this.playerPaddle.draw();
    this.aiPaddle.draw();
    this.balls.forEach((ball) => ball.draw());

    this.playerPaddle.move();
    this.aiPaddle.move(this.balls);

    this.balls.forEach((ball, index) => {
      const movingResult = ball.move(
        this.#checkCollision(ball, this.playerPaddle) ||
          this.#checkCollision(ball, this.aiPaddle)
      );

      if (movingResult === "outOfViewport") {
        this.lastCollisionTargets[index] = null;
      }
    });

    requestAnimationFrame(this.gameLoop.bind(this)); // 다음 프레임 요청, 재귀함수
  }
}
