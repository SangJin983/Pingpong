class Moving {
  move(paddle, ball) {
    // 상속 클래스에서 구현
  }
}

class PlayerMoving extends Moving {
  move(paddle) {
    if (paddle.moveUp && paddle.y > 0) {
      paddle.y -= paddle.dy;
    }
    if (paddle.moveDown && paddle.y + paddle.height < canvasHeight) {
      paddle.y += paddle.dy;
    }
  }
}

class AiMoving extends Moving {
  move(paddle, ball) {
    if (ball.y < paddle.y + paddle.height / 2 && paddle.y > 0) {
      paddle.y -= paddle.dy;
    } else if (
      ball.y > paddle.y + paddle.height / 2 &&
      paddle.y + paddle.height < canvasHeight
    ) {
      paddle.y += paddle.dy;
    }
  }
}
