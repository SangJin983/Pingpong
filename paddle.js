// 패들 사이즈, 이동 속도 설정
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 5;

// 패들 만드는 함수 (파라미터로 필요한건 x, y)
function createPaddle(x, y, name) {
  return {
    x: x,
    y: y,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: PADDLE_SPEED, // 움직이는 속도 (y축)
    moveUp: false,
    moveDown: false,
    name: name, // 그냥 name이라고 해도 되는 문법이 있다.
  };
}

// 패들 초기 위치 설정
const playerPaddle = createPaddle(
  0,
  canvasHeight / 2 - PADDLE_HEIGHT / 2,
  "player"
);
const aiPaddle = createPaddle(
  canvasWidth - PADDLE_WIDTH,
  canvasHeight / 2 - PADDLE_HEIGHT / 2,
  "ai"
);

// 패들(직사각형) 그리기 함수
function drawPaddle(paddle) {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// 패들 움직이기 함수
function movePaddle(paddle) {
  if (paddle.moveUp && paddle.y > 0) {
    paddle.y -= paddle.dy;
  }
  if (paddle.moveDown && paddle.y + paddle.height < canvasHeight) {
    paddle.y += paddle.dy;
  }
}

function moveAiPaddleLogic(paddle, ball) {
  if (ball.y < paddle.y + paddle.height / 2) {
    paddle.moveUp = true;
    paddle.moveDown = false;
  } else if (ball.y > paddle.y + paddle.height / 2) {
    paddle.moveUp = false;
    paddle.moveDown = true;
  } else {
    paddle.moveUp = false;
    paddle.moveDown = false;
  }
}
