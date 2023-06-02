import Porblem from "./item/problem.js";
import Dialogue from "./item/dialogue.js";
//도킹
import Dinosaur from "./item/dinosaur.js";
import Boy from "./item/boy.js"

export default class RacingCanvas{

    constructor(){

        //bgm
        this.bgm = new Audio("./mp/bgm.mp3");
        // this.bgm.autoplay = true;
        


        this.dom = document.querySelector(".racing_canvas");

        this.bg = document.querySelector("#bg");
        
        /** @type {CanvasRenderingContext2D} */ 
        /** @type {WebGLRenderingContext} */ 
        this.ctx = this.dom.getContext("2d");

// 캐릭터관련
        this.boy = new Boy(155,480);

//문제
        this.problem = new Porblem(this.minute, this.timeresult);

        this.dlg = new Dialogue(this.minute, this.timeresult,this.problem.getScore,this.problem.tpsResult);
        

//내가 만든 이벤트
        this.problem.chapterEnd = this.chapterEndHnadler.bind(this);
        this.boy.chapterEnd = this.chapterEndHnadler.bind(this);

        this.dlg.onClick = this.dlgClickHandler.bind(this);


//이벤트
        this.dom.onclick = this.clickHandler.bind(this);
        this.dom.onkeydown = this.keyDownHandler.bind(this);
        this.dom.onkeyup = this.keyUphandler.bind(this);

        // console.log(this.dom.onkeydown);

//시간관련
        //startTime
        this.stime = new Date();
        this.startTime = this.stime.getTime();
        
        //초 분
        this.timeresult = 0;
        this.minute = 0;

//게임정지
        this.pause = false;

//승리조건
        this.iswin = null;

//움직이기 위한 점수들
        this.tmpScore = 0;


    }

    run(){

        
        this.update();
        this.draw();


        //패배했을 때 조건
        if(this.boy.die){

            
            this.problem.iswin(0);

            return;
            // 보이가 잡히면 게임 종료.
          }

        //게임 일시정지


        //승리했을 때 조건
        if(this.pause){
            this.bgm.pause();
            return;
        }


        setTimeout(() => {
            
            this.run();
        }, 17);


    } 


    draw(){
        

        this.ctx.drawImage(this.bg,0,0,1000,702);

        // ctx.font = "20px '굴림체'";
        //현재시간 출력

        console.log(this.timeresult);

        this.ctx.fillText("경과시간 " + this.minute
         + "분 " + this.timeresult + "초", 10, 160);  
        
        this.problem.draw(this.ctx);



        this.dlg.draw(this.ctx);

        // -----------------------------
        this.boy.draw(this.ctx);
        Dinosaur.draw(this.ctx);

    }

    update(){

        this.problem.update();

        //매번 인스턴스 다시 생성
        let ctime = new Date();
        let currentTime = ctime.getTime();
        let passtime = currentTime - this.startTime;

        this.timeresult = Math.floor(passtime /= 1000);

        //분 올리기용
        if(this.timeresult > 59){
            //시간 다시 받아오기
            //passtime 은 다시 0부터 됨
            this.stime = new Date();
            this.startTime = this.stime.getTime();
            
            this.minute ++;

        }

        this.problem.tps(this.minute ,this.timeresult);

        //승리여부 업데이트 받기
        this.iswin = this.problem.winLose;
        // console.log(this.problem.winLose);
        
        //dlg에 승리여부, 분,초,점수,tps 
        //보내주기
        this.dlg.update(this.iswin,this.minute, this.timeresult,this.problem.getScore,this.problem.tpsResult);


        //---------------------------------
      
        let walk = 0;
        // console.log(tmpScore);

        if(this.tmpScore != this.problem.score ){
            walk++;
            this.tmpScore = this.problem.score;
        }

        //755픽셀 거리 문제 카운트에 따라서
        // console.log(this.problem.count);
        let walkDistance = 755 / this.problem.count;
        this.boy.update(walk, walkDistance);
        Dinosaur.update();

    }

    //한문제 끝냈을 떄
    chapterEndHnadler(){
        if(!this.dlg.show()){
            this.dlg.show();
            
            //게임 일시정지
            this.pause = true;
        }

    }

    //끝내고 메시지 떳을 때
    //클릭했을 때 조건들
    dlgClickHandler(id){

        //계속
        if(id == 1){
            this.dlg.unshow();

            //생성자에 있던 인스턴스와 이벤트핸들러 다시 정의해줌
            this.boy = new Boy(155,480);
            this.boy.chapterEnd = this.chapterEndHnadler.bind(this);
            
            //자리 바로잡기
            Dinosaur.x = 0 - 140;
            Dinosaur.y = 405;
            Dinosaur.victory = false;

            //다시 시간을 계산하기 위해서 다시 선언
            this.stime = new Date();
            this.startTime = this.stime.getTime();
            this.minute = 0;

            console.log(this.timeresult);

            this.problem.getScore = 0;
            this.problem.tpsResult = 0;

            this.problem.input.splice(0);
            this.problem.str = this.problem.input;
            
            
            this.pause = false;
            this.run();
        }

        //끝내기 (추가요망)
        else if (id == 2){
            window.location = "../mainUI/main.html";
        }
    }


    clickHandler(e){
        console.log(e.x , e.y);

        //멈춰있을 때만 작동되게끔 
        if(this.pause)
           this.dlg.notifyClick(e.x,e.y);

        
    }

    keyDownHandler(e){
        this.bgm.play();
        // console.log(`eDOWN.key : ${e.key}, eDOWN.char: ${e.char}`);
        this.problem.inputBox(e.key);
    }

    keyUphandler(e){
        // console.log(`eUP.key : ${e.key}, eUP.char: ${e.char}`);
    }



}