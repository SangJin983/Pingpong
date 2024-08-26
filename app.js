const game = new Game(
  new Ball(),
  new Paddle(
    0,
    canvasHeight / 2 - Paddle.PADDLE_HEIGHT / 2,
    "player",
    new PlayerMoving()
  ),
  new Paddle(
    canvasWidth - Paddle.PADDLE_WIDTH,
    canvasHeight / 2 - Paddle.PADDLE_HEIGHT / 2,
    "ai",
    new AiMoving()
  )
);
game.addKeyEventListener();
game.gameLoop();
