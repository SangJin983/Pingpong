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
  if (event.key === "w") aiPaddle.moveUp = keyPressed; // 임시로 aiPaddle을 player2 처럼 테스트
  if (event.key === "s") aiPaddle.moveDown = keyPressed; // 임시
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
    radius: ballSize,
    dx: ballSpeed,
    dy: ballSpeed,
  };
}

// 공 초기 위치설정(공 셋팅하기)
const ball = createBall();

// 공(원) 그리기 함수
function drawBall() {
  ctx.fillStyle = "#00ff00";
  ctx.beginPath(); // 기존 도형과 경로가 겹치지 않게, 새로운 도형을 그릴 때 사용.
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // 반지름, 각도 0에서, 360도
  ctx.fill();
}

// 공과 패들 충돌 확인하는 함수
function isCollision(paddle, ball) {
  return (
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  );
}

// 움직이는 공 리셋하는 함수
function resetBall() {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight / 2;
  ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
  ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
}

// 공 움직이기 함수
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 벽과 충돌했을 때의 움직임
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasHeight) {
    ball.dy = -ball.dy;
  }

  // 패들과 충돌 했을 때의 움직임
  if (isCollision(playerPaddle, ball) || isCollision(aiPaddle, ball)) {
    ball.dx = -ball.dx;
  }

  // 공이 화면에 넘어가면 초기화
  if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvasWidth) {
    resetBall();
  }
}

// 그리기 함수
function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 지우기(계속 그려야 되니까)
  drawPaddle(playerPaddle);
  drawPaddle(aiPaddle);
  drawBall();

  movePaddle(playerPaddle);
  movePaddle(aiPaddle); // 임시로 player2 처럼 조작
  moveBall();
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop); // 다음 프레임 요청, 재귀함수
}

gameLoop();
