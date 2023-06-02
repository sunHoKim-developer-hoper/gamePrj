import GameCanvas from "./panel/game-canvas.js";
import BarackCanvas from "./panel/barack-canvas.js";
// let gameCanvas = [];
// let barackCanvas = [];
let gameCanvas;
let barackCanvas;

let func = function(){
    gameCanvas = new GameCanvas();
    barackCanvas = new BarackCanvas();
    gameCanvas.run();

    // 게임오버 시 실행됨
    gameCanvas.ongameOver = (score, e)=>{
        gameCanvas.dom.classList.add("d-none");
        gameCanvas.pause = true;

        // 본게임의 점수를 넘겨준다.
        barackCanvas.client.score = score;
        barackCanvas.dom.classList.remove("d-none");
        barackCanvas.pause = false;
        barackCanvas.dom.focus();
        barackCanvas.run();
    };

    // 발악타임 종료 시 실행됨
    barackCanvas.ongameOver = (id, e)=>{
        // YES를 선택한 경우 게임 재시작 -> func함수 실행
        if(id == 1){
            barackCanvas.dom.classList.add("d-none");
            barackCanvas.pause = true;
            
            gameCanvas.dom.classList.remove("d-none");

            func();
        }
        // NO를 선택한 경우 메인 메뉴로 이동
        else if(id == 2){
            window.location = "../mainUI/main.html";
        }             
    };
};

// window가 load되면 func함수를 실행한다.
window.addEventListener("load", func());