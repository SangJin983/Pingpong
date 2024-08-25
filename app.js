const playerPaddle = new PlayerPaddle(
  0,
  canvasHeight / 2 - Paddle.PADDLE_HEIGHT / 2,
  "player"
);

const aiPaddle = new AiPaddle(
  canvasWidth - Paddle.PADDLE_WIDTH,
  canvasHeight / 2 - Paddle.PADDLE_HEIGHT / 2,
  "ai"
);

const game = new Game(new Ball(), playerPaddle, aiPaddle);
game.addKeyEventListener();
game.gameLoop();
