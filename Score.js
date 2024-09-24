import { ctx, canvasWidth } from "./preference.js";

export class Score {
  scores;
  players;

  constructor(...players) {
    this.scores = {};
    this.players = players; // 플레이어 이름 저장
    players.forEach((player) => {
      this.scores[player] = 0; // 초기 점수 설정
    });
  }

  update(playerName) {
    if (this.scores[playerName] !== undefined) {
      this.scores[playerName] += 1; // 점수 업데이트
    }
  }

  draw() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#ffffff";

    const totalPlayers = this.players.length; // 플레이어 수
    const startX = 50; // 시작 x 위치
    const endX = canvasWidth - 100; // 끝 x 위치
    const spacingX = (endX - startX) / (totalPlayers - 1); // 플레이어 수에 따른 간격

    this.players.forEach((player, index) => {
      const x = startX + index * spacingX; // 각 점수의 x 위치 계산
      ctx.fillText(`${player}: ${this.scores[player]}`, x, 30); // 점수 그리기
    });
  }
}
