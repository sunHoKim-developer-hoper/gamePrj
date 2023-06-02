import Character from '../items/character.js';
import MenuBackground from '../items/menu-background.js';
import ExitDlg from '../items/exitDlg.js';
import Ship from '../items/ship.js';
import WarningDlg from '../items/warningDlg.js';
import EnterDlg from '../items/enterDlg.js';
import EtcDlg from '../items/etcDlg.js';

export default class Menucanvas{
    constructor(){
        this.bgm = document.querySelector("#bgm");
    
        this.dom = document.querySelector(".menu-canvas");
        this.dom.focus();
        /** @typeof {CanvasRenderingContext2D} */
        this.ctx = this.dom.getContext("2d");

        this.menubg = new MenuBackground();
        this.ship = new Ship();

        Character.speed++;

        this.dom.onkeydown = this.keyDownHandler.bind(this);
        this.dom.onkeyup = this.keyUpHandler.bind(this);
        
        this.exitDlg = new ExitDlg();
        this.dom.onclick  = this.onClickHandler.bind(this);
        
        this.enterDlg = new EnterDlg();
        this.etcDlg = new EtcDlg();

        this.warningDlg = new WarningDlg();

        //게임 끝내기 창 띄위기 콜백 함수
        Character.showExitDlg = this.showExitDlg.bind(this);
        Character.showWarnDlg = this.showWarnDlg.bind(this);
        Character.showEnterDlg = this.showEnterDlg.bind(this);
        Character.showEtcDlg = this.showEtcDlg.bind(this);
    }

    run(){
        this.playBgm();
        this.update();
        this.draw();
        window.setTimeout(this.run.bind(this), 17)
    }
    update(){
        Character.update();
        this.warningDlg.update();
    }
    draw(){
        this.menubg.draw(this.ctx);
        this.ship.draw(this.ctx);
        Character.draw(this.ctx);
        this.exitDlg.draw(this.ctx);
        this.warningDlg.draw(this.ctx);
        this.enterDlg.draw(this.ctx);
        this.etcDlg.draw(this.ctx);
    }
    //=====
    keyDownHandler(e){
        switch(e.key){
            case "ArrowUp":
                Character.move(1);
                break;
            case "ArrowLeft":
                Character.move(4);
                break;
            case "ArrowRight":
                Character.move(2);
                break;
            case "ArrowDown":
                Character.move(3);
                break;    
        }
    }

    //어떤 방향에 대해서 가는 것을 멈춰!
    keyUpHandler(e){
        switch(e.key){
            case "ArrowUp":
                Character.stop(1);
                break;
            case "ArrowLeft":
                Character.stop(4);
                break;
            case "ArrowRight":
                Character.stop(2);
                break;
            case "ArrowDown":
                Character.stop(3);
                break;    
        }
    }
    
    showExitDlg(){
        //끝내기 창의 visible 상태변수 변경
        this.exitDlg.isVisible = true;
    }

    //위험 창 띄우기
    showWarnDlg(condition){
        this.warningDlg.condition = condition;
        this.warningDlg.isVisible = true;
    }

    showEnterDlg(gameNum){
        //끝내기 창의 visible 상태변수 변경
        this.enterDlg.isVisible = true;
        this.enterDlg.gameNum=gameNum;
    }

    showEtcDlg(){
        //끝내기 창의 visible 상태변수 변경
        this.etcDlg.isVisible = true;
    }


    onClickHandler(e){
        console.log(e.x+", "+e.y);
        this.exitDlg.clickNotify(e.x,e.y);
        this.enterDlg.clickNotify(e.x,e.y);
        this.etcDlg.clickNotify(e.x,e.y);
    }
    playBgm(){
        this.bgm.play();
    }
}