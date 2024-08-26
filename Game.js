class Game {
  #lastCollisionTarget = null;

  constructor(ball, playerPaddle, aiPaddle) {
    this.ball = ball;
    this.playerPaddle = playerPaddle;
    this.aiPaddle = aiPaddle;
  }

  #checkCollision(paddle) {
    const isCollision =
      paddle.name !== this.#lastCollisionTarget &&
      this.ball.x - this.ball.radius < paddle.x + paddle.width &&
      this.ball.x + this.ball.radius > paddle.x &&
      this.ball.y + this.ball.radius > paddle.y &&
      this.ball.y - this.ball.radius < paddle.y + paddle.height;

    if (isCollision) {
      this.#lastCollisionTarget = paddle.name;
    }

    return isCollision;
  }

  resetCollisionTarget() {
    this.#lastCollisionTarget = null;
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
    this.ball.draw();

    this.playerPaddle.move();
    this.aiPaddle.move(this.ball);
    this.ball.move(
      this.#checkCollision(this.playerPaddle) ||
        this.#checkCollision(this.aiPaddle),
      this.resetCollisionTarget.bind(this)
    );

    requestAnimationFrame(this.gameLoop.bind(this)); // 다음 프레임 요청, 재귀함수
  }
}
