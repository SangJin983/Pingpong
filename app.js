class Game {
  #lastCollisionTarget = null;

  #checkCollision(paddle, ball) {
    const isCollision =
      paddle.name !== this.#lastCollisionTarget &&
      ball.x - ball.radius < paddle.x + paddle.width &&
      ball.x + ball.radius > paddle.x &&
      ball.y + ball.radius > paddle.y &&
      ball.y - ball.radius < paddle.y + paddle.height;

    if (isCollision) {
      this.#lastCollisionTarget = paddle.name;
    }

    return isCollision;
  }

  #handleKeyPress(event, keyPressed) {
    if (event.key === "ArrowUp") playerPaddle.moveUp = keyPressed;
    if (event.key === "ArrowDown") playerPaddle.moveDown = keyPressed;
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
    drawPaddle(playerPaddle);
    drawPaddle(aiPaddle);
    drawBall();

    movePaddle(playerPaddle);
    movePaddle(aiPaddle);
    moveBall(
      this.#checkCollision(playerPaddle, ball) || this.#checkCollision(aiPaddle, ball)
    );
    moveAiPaddleLogic(aiPaddle, ball);

    requestAnimationFrame(this.gameLoop.bind(this)); // 다음 프레임 요청, 재귀함수
  }
}

const game = new Game();
game.addKeyEventListener();
game.gameLoop();
