// 키 버튼 입력 처리
function handleKeyPress(event, keyPressed) {
  if (event.key === "ArrowUp") playerPaddle.moveUp = keyPressed;
  if (event.key === "ArrowDown") playerPaddle.moveDown = keyPressed;
}

// 키 입력 이벤트리스너 통합(누를 때 true, 뗄 때 false)
document.addEventListener("keydown", (event) => handleKeyPress(event, true));
document.addEventListener("keyup", (event) => handleKeyPress(event, false));

let lastCollisionTarget = null;

// 공과 패들 충돌 확인하는 함수 (ball.js보다 위에 있는 상위 로직)
function checkCollision(paddle, ball) {
  const isCollision =
    paddle.name !== lastCollisionTarget &&
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.x + ball.radius > paddle.x &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height;

  if (isCollision) {
    lastCollisionTarget = paddle.name;
  }

  return isCollision;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 지우기(계속 그려야 되니까)
  drawPaddle(playerPaddle);
  drawPaddle(aiPaddle);
  drawBall();

  movePaddle(playerPaddle);
  movePaddle(aiPaddle);
  moveBall(
    checkCollision(playerPaddle, ball) || checkCollision(aiPaddle, ball),
  );
  moveAiPaddleLogic(aiPaddle, ball);

  requestAnimationFrame(gameLoop); // 다음 프레임 요청, 재귀함수
}

gameLoop();
