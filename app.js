// canvas 요소를 js에서 다룰 수 있게, 변수 선언하기.
const $canvas = document.querySelector(".pong");
const ctx = $canvas.getContext("2d");

const canvasHeight = $canvas.height;
const canvasWidth = $canvas.width;

// 패들 사이즈, 이동 속도 설정
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

// 패들 만드는 함수 (파라미터로 필요한건 x, y)
function createPaddle(x, y) {
  return {
    x: x,
    y: y,
    width: paddleWidth,
    height: paddleHeight,
    dy: paddleSpeed, // 움직이는 속도 (y축)
    moveUp: false,
    moveDown: false,
  };
}

// 패들 초기 위치 설정
const playerPaddle = createPaddle(0, canvasHeight / 2 - paddleHeight / 2);
const aiPaddle = createPaddle(
  canvasWidth - paddleWidth,
  canvasHeight / 2 - paddleHeight / 2
);

// 패들(직사각형) 그리기 함수
function drawPaddle(paddle) {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// 키 버튼 입력 처리
function handleKeyPress(event, keyPressed) {
  if (event.key === "ArrowUp") playerPaddle.moveUp = keyPressed;
  if (event.key === "ArrowDown") playerPaddle.moveDown = keyPressed;
}

// 키 입력 이벤트리스너 통합(누를 때 true, 뗄 때 false)
document.addEventListener("keydown", (event) => handleKeyPress(event, true));
document.addEventListener("keyup", (event) => handleKeyPress(event, false));

// 패들 움직이기 함수
function movePaddle(paddle) {
  if (paddle.moveUp && paddle.y > 0) {
    paddle.y -= paddle.dy;
  }
  if (paddle.moveDown && paddle.y + paddle.height < canvasHeight) {
    paddle.y += paddle.dy;
  }
}

// 공 스펙 설정
const ballSize = 10;
const ballSpeed = 4;

// 공 만들기 함수
function createBall() {
  return {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    size: ballSize,
    dx: ballSpeed,
    dy: ballSpeed,
  };
}

// 공 초기 위치설정
const ball = createBall();

// 공(원) 그리기 함수
function drawBall() {
  ctx.fillStyle = "#00ff00"; 
  ctx.beginPath(); // 기존 도형과 경로가 겹치지 않게, 새로운 도형을 그릴 때 사용.
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // x, y, 반지름, 각도 0에서, 360도
  ctx.fill();
}

// 그리기 함수
function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 지우기(계속 그려야 되니까)
  drawPaddle(playerPaddle);
  drawPaddle(aiPaddle);
  drawBall();
  movePaddle(playerPaddle);
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop); // 다음 프레임 요청, 재귀함수
}

gameLoop();
