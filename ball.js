// 공 스펙 설정
const BALL_SIZE = 10;
const BALL_SPEED = 4;

// 공 만들기 함수
function createBall() {
  return {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: BALL_SIZE,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
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

// 움직이는 공 리셋하는 함수
function resetBall() {
  ball.x = canvasWidth / 2;
  ball.y = canvasHeight / 2;
  ball.dx = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
  ball.dy = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
}

// 공 움직이기 함수
function moveBall(isCollision) {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 벽과 충돌했을 때의 움직임
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasHeight) {
    ball.dy = -ball.dy;
  }

  // 패들과 충돌 했을 때의 움직임
  if (isCollision) {
    ball.dx = -ball.dx;
  }

  // 공이 화면에 넘어가면 초기화
  if (ball.x + ball.radius < 0 || ball.x - ball.radius > canvasWidth) {
    resetBall();
  }
}
