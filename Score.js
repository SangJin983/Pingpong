import { ctx, canvasWidth } from "./preference.js";

export class Score {
  constructor(...players) {
    this.scores = {};
    players.forEach((player) => {
      this.scores[player] = 0;
    });
  }

  update(playerName) {
    if (this.scores[playerName] !== undefined) {
      this.scores[playerName] += 1;
    }
  }

  draw() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";
    Object.keys(this.scores).forEach((player, index) => {
      ctx.fillText(`${player}: ${this.scores[player]}`, 50 + index * 650, 30);
    });
  }
}
