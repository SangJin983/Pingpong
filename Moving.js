import { canvasHeight } from "./preference.js";

export class Moving {
  move(movingObject, dest) {
    // 상속 클래스에서 구현
  }
}

export class VerticalMoving extends Moving {
  move(movingObject) {
    if (movingObject.moveUp && movingObject.y > 0) {
      movingObject.y -= movingObject.dy;
    }
    if (
      movingObject.moveDown &&
      movingObject.y + movingObject.height < canvasHeight
    ) {
      movingObject.y += movingObject.dy;
    }
  }
}

export class TrackingVerticalMoving extends Moving {
  move(movingObject, dest) {
    if (
      dest.y < movingObject.y + movingObject.height / 2 &&
      movingObject.y > 0
    ) {
      movingObject.y -= movingObject.dy;
    } else if (
      dest.y > movingObject.y + movingObject.height / 2 &&
      movingObject.y + movingObject.height < canvasHeight
    ) {
      movingObject.y += movingObject.dy;
    }
  }
}
