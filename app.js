import { canvasHeight, canvasWidth } from "./preference.js";
import { Paddle } from "./Paddle.js";
import { VerticalMoving, TrackingVerticalMoving } from "./Moving.js";
import { Ball } from "./Ball.js";
import { Game } from "./Game.js";

const game = new Game(
  new Ball(),
  new Paddle(
    0,
    canvasHeight / 2 - Paddle.PADDLE_HEIGHT / 2,
    "player",
    new VerticalMoving()
  ),
  new Paddle(
    canvasWidth - Paddle.PADDLE_WIDTH,
    canvasHeight / 2 - Paddle.PADDLE_HEIGHT / 2,
    "ai",
    new TrackingVerticalMoving()
  )
);
game.addKeyEventListener();
game.gameLoop();
