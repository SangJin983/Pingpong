// canvas 요소를 js에서 다룰 수 있게, 변수 선언하기.
const $canvas = document.querySelector(".pong");
const ctx = $canvas.getContext("2d");

// 패들 사이즈 설정하기
const paddleSize = {
  width: 10,
  height: 100
}

// 패들 만드는 함수 (파라미터로 필요한건 x, y)
function createPaddle(x, y) {
  return {
    x: x,
    y: y,
    width: paddleSize.width,
    height: paddleSize.height,
    dy: 5 // 움직이는 속도 (y축)
  };
}

// 패들 만들기(위치만 넣어주면 됨)
const playerPaddle = createPaddle(0, $canvas.height / 2 - paddleSize.height / 2);
const aiPaddle = createPaddle($canvas.width - paddleSize.width, $canvas.height / 2 - paddleSize.height / 2);

// 패들 그리기 함수
function drawPaddle(paddle) {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// 그리기 함수
function draw() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height); // 캔버스 지우기(계속 그려야 되니까)
  drawPaddle(playerPaddle);
  drawPaddle(aiPaddle);
}

// 그리기 (60 FPS)
setInterval(draw, 1000 / 60);

