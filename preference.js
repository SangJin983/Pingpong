// canvas 요소를 js에서 다룰 수 있게, 변수 선언하기.
const $canvas = document.querySelector(".pong");
const ctx = $canvas.getContext("2d");

const canvasHeight = $canvas.height;
const canvasWidth = $canvas.width;

export { ctx, canvasHeight, canvasWidth };