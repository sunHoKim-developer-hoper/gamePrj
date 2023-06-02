import GameCanvas from './panel/game-canvas.js';
import RankCanvas from './panel/rank-canvas.js';
window.addEventListener("load", function () {

  //지역화가 가능한 변수타입 let, const는 상수형 변수를 선언하기 위해서 사용
  const gameCanvas = new GameCanvas();
  gameCanvas.ongameOver = (e) =>{
    console.log(e);
    gameCanvas.dom.classList.add("d-none");
    rankCanvas.dom.classList.remove("d-none");
  };

  gameCanvas.run();

  const rankCanvas = new RankCanvas();
  rankCanvas.run();
  // gameCanvas.gameOver();
  // gameCanvas.pause();

});
