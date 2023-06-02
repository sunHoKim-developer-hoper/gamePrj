import Background from "../item/background.js";
import Quiz from "../item/quiz.js";
import QuizArray from "../quiz-array.js";
import CheckText from "../item/check-text.js";
import Client from "../item/client.js";
import FinalDlg from "../item/finaldlg.js";
import BarackCount from "../item/barack-count.js";
import CountDownDlg from "../item/CountDownDlg.js";

export default class BarackCanvas{
    constructor(){
        this.dom = document.querySelector(".barack-canvas");
        this.ctx = this.dom.getContext("2d");

        // 배경
        this.bg = new Background();
        
        // 퀴즈
        this.quiz = new Quiz();
        this.quizzesB = [];
        QuizArray.quizzesB = this.quizzesB;
        this.quizAppearDelay = 10;

        // CheckText
        this.checkText = new CheckText();
        this.checkText.isBarack = true;
        this.checkText.arrangeScore = this.arrangeScore.bind(this);
        this.dom.onkeydown = this.keyDownHandler.bind(this);

        // Client
        this.client = new Client();
        this.client.isGameCanvas = false;

        // FinalDlg
        this.dlg = new FinalDlg();
        this.dlg.onclick = this.dlgClickHandler.bind(this);
        this.dom.onclick = this.clickHandler.bind(this);

        // BarackCount
        this.brcount = new BarackCount();
        this.count = 3;

        // CountDownDlg
        this.countDownDlg = new CountDownDlg();
        this.countDownTimer = 240;

        // 게임 종료
        this.barackCountDown = 0;
        this.ongameOver = null;
        this.pause = true;
    }

    run(){
        if(this.pause)
            return;
        
        this.update();
        this.draw();

        window.setTimeout(()=>{
            this.run();
        }, 16);
    }

    update(){
        this.countDownTimer --;
        if(this.countDownTimer > 0){
            this.countDownDlg.update(); // 3,2,1 카운트다운
            this.countDownDlg.isVisible = true;
        }
        else{
            this.countDownDlg.isVisible = false;

            for(let quiz of this.quizzesB)
                quiz.update2();
            
            this.quizAppearDelay--;
            if(this.quizAppearDelay == 0){
                let maxW = this.dom.width - 400;
                let x = Math.floor(Math.random() * (maxW - 0)) + 0;
                let y = 0;
                let speed = Math.floor(Math.random() * (5 - 1)) + 1;
                
                let maxI = QuizArray.rawQuizArr.length-1;
                let index = Math.floor(Math.random() * (maxI - 0)) + 0;
                let text = QuizArray.rawQuizArr[index];

                let quiz = new Quiz(x, y, text, 0, speed); // color는 0만
                quiz.delete = this.quizDeleteHandler.bind(this);

                this.quizzesB.push(quiz);
                this.quizAppearDelay = Math.floor(Math.random() * (10 - 1)) + 1;
            }
    
            this.client.update();
            
            this.barackCountDown++; // 발악타임은 일정 기간 동안만 유지함
            if(this.barackCountDown == 600){
                this.dlg.show(this.client.score);
                this.dom.onkeydown = null;
            }

            this.countDownDlg.update2(); // 발악 카운트다운
        }
    }

    draw(){
        this.bg.draw(this.ctx);
        for(let quiz of this.quizzesB)
            quiz.draw(this.ctx);
        this.checkText.draw(this.ctx);
        this.client.draw(this.ctx);
        this.dlg.draw(this.ctx);
        this.countDownDlg.draw(this.ctx);
        this.countDownDlg.draw2(this.ctx);
    }

    // --- 아이템 event handlers --------------------
    
    // 퀴즈가 땅에 닿거나 문제를 맞춘 경우 해당 문제를 배열에서 삭제하는 함수
    quizDeleteHandler(quiz){
        let idx = this.quizzesB.indexOf(quiz);
        this.quizzesB.splice(idx, 1);
    }

    // 점수 관련 함수
    arrangeScore(color){
        this.client.arrangeScore(color);
    }

    // --- 사용자 입력 event handlers --------------------

    clickHandler(e){
        this.dlg.notifyClick(e.x, e.y);
    }

    keyDownHandler(e){
        this.client.keydownEvent();
        this.checkText.fillAndCheckText(e);
    }

    dlgClickHandler(id){
        if(this.ongameOver)
            this.ongameOver(id);
    }
}