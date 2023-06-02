import Background from "../item/background.js";
import Quiz from "../item/quiz.js";
import QuizArray from "../quiz-array.js";
import CheckText from "../item/check-text.js";
import Client from "../item/client.js";

export default class GameCanvas{
    constructor(){
        this.dom = document.querySelector(".game-canvas");
        this.dom.focus();
        this.ctx = this.dom.getContext("2d");

        // 배경
        this.bg = new Background();
        
        // 퀴즈
        this.quiz = new Quiz();
        this.quizzes = []; // 문제를 맞춘 경우 배열에서 삭제하기 위해 전역 배열 QuizArray.quiz를 사용
        QuizArray.quizzes = this.quizzes;
        this.quizAppearDelay = 20; // 퀴즈가 화면에 생성되는 시간을 설정하기 위한 상태변수
        this.indexCount = 1; // quiz.js의 상태변수에 값을 전달하기 위해 필요한 변수
        this.speed = 0.5;
        
        // CheckText
        this.checkText = new CheckText();
        this.checkText.arrangeScore = this.arrangeScore.bind(this);
        this.dom.onkeydown = this.keyDownHandler.bind(this);
    
        // Client
        this.client = new Client();
        this.client.minusClientLife = this.minusLife.bind(this);

        // 음악
        this.bgm = document.querySelector("#bgm");

        // 게임 오버
        this.ongameOver = null;
        this.pause = false;
    }

    run(){
        if(this.pause)
            return;

        this.playBgm();
        this.update();
        this.draw();

        window.setTimeout(()=>{
            this.run();
        }, 16);
    }

    update(){
        for(let quiz of this.quizzes) // 배열 quizzes의 요소들마다 quiz.js의 update 함수를 실행
            quiz.update(this.speed);
        
        if(this.client.score >= 10) // 점수에따라 speed 변경하기
            this.speed = 1.4;
        if(this.client.score >= 20)
            this.speed = 3;

        this.quizAppearDelay--; // 퀴즈가 출력되는 간격
        if((this.quizAppearDelay == 0) 
            && !(this.index == QuizArray.rawQuizArr.length)){
            let maxW = this.dom.width - 400;
            let x = Math.floor(Math.random() * (maxW - 0)) + 0;
            let y = 0;
           
            let maxI = QuizArray.rawQuizArr.length-1;
            let index = Math.floor(Math.random() * (maxI - 0)) + 0;
            let text = QuizArray.rawQuizArr[index];
            let color = this.decideQuizColor(); // 상태변수값(색상)을 정하는 함수 실행

            let quiz = new Quiz(x, y, text, color);
            quiz.delete = this.quizDeleteHandler.bind(this);
            quiz.minusClientLife = this.minusLife.bind(this);
            //산성비용 배열
            this.quizzes.push(quiz);

            this.quizAppearDelay = 80;
            this.indexCount++;
        }
        
        this.client.update();
    }

    draw(){
        this.bg.draw(this.ctx);
        for(let quiz of this.quizzes)
            quiz.draw(this.ctx);
        this.checkText.draw(this.ctx);
        this.client.draw(this.ctx);
    }

    decideQuizColor(){
        let color;
        if(this.indexCount%9 == 0){
            color = 2;
            this.indexCount = 1;
        } 
        else if(this.indexCount%6 == 0)
            color = 1;
        else
            color = 0;
        
        return color;
    }

    // 퀴즈가 땅에 닿거나 문제를 맞춘 경우 해당 문제를 배열에서 삭제하는 함수
    quizDeleteHandler(quiz){
        let idx = this.quizzes.indexOf(quiz);
        this.quizzes.splice(idx, 1);
    }

    // 생명을 깎는 함수
    minusLife(){
        this.client.life--;
        this.client.minusFace();
        
        if(this.ongameOver && this.client.life<=0)
            this.ongameOver(this.client.score);
    }

    // 점수 관련 함수
    arrangeScore(color){
        this.client.arrangeScore(color);
    }

    keyDownHandler(e){
        this.client.keydownEvent();
        this.checkText.fillAndCheckText(e);
    }

    playBgm(){
        this.bgm.play();
    }
}