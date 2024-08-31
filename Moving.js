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
  move(movingObject, dests) {
    if (dests.length === 0) return;

    const closestDest = this.findClosestDestination(movingObject, dests);

    if (
      closestDest.y < movingObject.y + movingObject.height / 2 &&
      movingObject.y > 0
    ) {
      movingObject.y -= movingObject.dy;
    } else if (
      closestDest.y > movingObject.y + movingObject.height / 2 &&
      movingObject.y + movingObject.height < canvasHeight
    ) {
      movingObject.y += movingObject.dy;
    }
  }

  findClosestDestination(movingObject, dests) {
    let closestDest = null;
    let minDistance = Infinity;

    dests.forEach((dest) => {
      const distance = Math.abs((dest.x - movingObject.x));
      if (distance < minDistance) {
        minDistance = distance;
        closestDest = dest;
      }
    });

    return closestDest;
  }
}
