import { ctx, canvasWidth } from "./preference.js";

export class Score {
  constructor() {
    this.playerScore = 0;
    this.aiScore = 0;
  }

  update(winner) {
    if (winner === "player") {
      this.playerScore += 1;
    } else if (winner === "ai") {
      this.aiScore += 1;
    }
  }

  draw() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Player: ${this.playerScore}`, 50, 30);
    ctx.fillText(`AI: ${this.aiScore}`, canvasWidth - 100, 30);
  }
}
