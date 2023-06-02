import GiveProblem from "./giveProblem.js";

export default class Porblem{

    constructor(){

        //typeing per second (초당 몇글자 칠 수 있는지)
        this.tpsSecond = 0;
        this.tpsResult = 0;


        this.input = [];
        this.str = "";

        //출력용 문자 3개
        this.show = "";
        this.expectShow = "";
        this.moreExpectShow = "";

        //문제 인덱스
        
        this.gp = new GiveProblem();
        
        this.index = 0;
        //문제 리스트 넣고 출제원하는 인덱스 출력
        this.gp.covert(this.gp.problemList[this.index]);
        this.gp.measureDifficultry(this.gp.problemList[this.index]);

        //탬플릿 리터럴 이용함 (백틱)
        this.example = [];
        //문제리스트에서 문제로 제출하는 곳
        this.example = this.gp.giveproblem;
        this.isRight = true;

        //현재 글자인덱스
        this.rightIndex = 0;
        //현재 라인 인덱스
        this.lineIndex = 0;
        //점수
        this.getScore = 0 ;
        

        this.chapterEnd = null;
        this.winLose = null;

        this.gp.sortProblem();
    }

    get score(){
        return this.getScore;
    }

    //이중 get
    get count(){
        console.log()
        return this.gp.count;
    }

    //투명
//#FFF5
    draw(ctx){

        ctx.font = "30px '굴림체'";
        ctx.fillStyle = "black";

//점수 출력
        ctx.fillText("점수 "+ this.getScore + "점", 10, 90);  
        ctx.fillText("초당 "+ this.tpsResult + "타", 10, 130);  

// ctx.fillText("경과시간 " + this.minute + "분 " + this.time + "초", 30, 130);  

// 1번줄 문제보여주기

        //고정폭 글꼴 설정
        ctx.font = "bold 18px'굴림체'";
        ctx.fillText
        // ctx.font = "50px '굴림체 Monaco'";
        ctx.fillStyle = "black";
        //원래 x 는 60임  + 200함
        ctx.fillText(this.show, 260, 90);  
        
//현재시간 출력

    // 다음 미리 보여주기
        //고정폭 글꼴 설정
        ctx.font = "bold 18px '굴림체'";
        // ctx.font = "50px '굴림체 Monaco'";
        ctx.fillStyle = "black";
        //원래 x 는 60임  + 200함

//2번줄
        //다음줄문자가 마지막 줄인지 확인용
        let expect = 
                                    //다음줄이여서 1더해줌
            (this.example.length == this.lineIndex + 1)?
            "끝 났읍니다.":this.expectShow ;
        ctx.fillText(expect, 260, 180);  
       
//3번줄
        //다음줄문자가 마지막 줄인지 확인용
        let moreexpect = 
                                    //다음줄이여서 1더해줌
            (this.example.length == this.lineIndex + 2)?
            "":this.moreExpectShow ;
        ctx.fillText(moreexpect, 260, 270);  

        // 2번 흰색 배경
        ctx.rect(132, 330, 750, 90);
        ctx.fillStyle = "#FFF5";
        ctx.fill();
        
        //3번 검정 테두리 수정하기.
        ctx.rect(137, 335, 740, 80);
        ctx.fillStyle = "black";
        ctx.stroke();
        
    //삼각형 그리기
        //글짜마다 30차이 // 굴림기준 15임
        let interChar = 9.9;//9.9
        let nextChar = interChar * this.rightIndex;

        //덮어씌우기
        // ctx.rect(40, 110, 500, 90);
        //투명으로 덮어씌움
        ctx.fillStyle = "#FFF0";
        ctx.fillRect(240, 100, 500, 90);

        ctx.beginPath();
        ctx.moveTo(265 + nextChar, 110);
        ctx.lineTo(250 + nextChar, 135);
        ctx.lineTo(280 + nextChar,135);
        ctx.fillStyle = (this.isRight)? "green" : "red";
        ctx.fill();

    
    
        // ctx.font = "50px serif";
        // ctx.fillStyle = "grey";
        // ctx.fillText(this.show, 60, 290);    


        //입력값 확인 수정
        ctx.font = "bold 18px '굴림체'";
        ctx.fillStyle = "black";
        // console.log(this.str);
        ctx.fillText(this.str, 260, 382);  
        
    }


    

    update(){



        //인덱스 실시간 갱신
        this.rightIndex = this.input.length;

        //문제 줄 갱신
        this.show = this.example[this.lineIndex];
        
        //다음문제 미리 보여주기용 갱신
        
        this.expectShow = this.example[this.lineIndex + 1];
        this.moreExpectShow =this.example[this.lineIndex + 2];
        
        
        // console.log(this.winLose);


//패배 승리 나눠지는 곳
        //패배가 기본값으로 되게끔함
        this.iswin(0);
        //승리했을 때 조건
        if(this.lineIndex == (this.example.length)){
    // 문제 바꾸기
            //승패여부 살피기
            this.iswin(1);

            //이겼을 때 (true)
            if(this.winLose){
            this.nextGmae(1);
            }

        }

        

    }

    inputBox(key){

        
        // this.rightIndex = this.input.length;

        this.isEqual(key);


//변경본
        //같아야지 입력이 됨
        if(this.isRight == true){
            if(key == 'Backspace' || key == 'Shift'){            
            //     this.input.pop();  
            //     this.getScore--; 
            }
            else{

                this.input.push(key);
                this.getScore++;

            }
        }

        //라인의 마지막인지 확인용 인덱스
        let endLine= (this.rightIndex == this.show.length);
            //ENTER 시 전체 지우기
            //그리고 한줄의 마지막 라인일떄
            if(key == 'Enter' && endLine){
                
                this.lineIndex++;
                this.input.splice(0);
            }
            
            //최종적으로 문자열로 바꿔주기
            this.str = this.input.join('');
        
        
    }


    
    isEqual(key){
        
        let i = this.rightIndex;
        
        //index 값 보정 -1해주기
        let showTmp = this.show.charAt(i);
        let keyTmp = key;
        
        if(showTmp == keyTmp){
            this.isRight = true;
        }
        else if(key == 'Backspace'){
            this.isRight = true;
        }
        else{

            this.isRight = false;

        //오디오 재생
            this.audio = new Audio("./mp/l.mp3");
            this.audio.play();

            //예외처리
            if(keyTmp == 'Enter' || keyTmp == "Shift"){
                this.audio.pause();
            }

        }

        console.log(this.isRight);

    }


    //typing per second
    tps(minute , second){

        //분을 초로 바꿔주기
        minute *= 60;
        //분과 초 합
        this.tpsSecond = minute + second;

        // console.log(this.tpsSecond);

        let result = this.getScore/ this.tpsSecond; 
        
        this.tpsResult = Math.round(result * 100) / 100;

        // console.log(this.tpsResult);

    }

    iswin(win){

        //초당 1타 이하면 패배
        if(win == 0){
            this.winLose = false; //패배
            // console.log("패배")
        }
        else if(win == 1){
            this.winLose = true; //승리
            // console.log("승리");
        }

    }

    nextGmae(isnext){
        //1이면 승
        //0이면 패

        //승리
        if(isnext == true){
            this.index ++;
            this.gp.covert(this.gp.problemList[this.index]);
            this.gp.measureDifficultry(this.gp.problemList[this.index]);
            this.example = this.gp.giveproblem;

            //0번으로 가기
            this.lineIndex = 0;
        }


        //패배

        else if(isnext == false){
            //0번으로 가기
            this.input.splice(0);
            this.str = this.input;
            console.log(this.str);


            this.lineIndex = 0;

        }

        //끝났을 때, 결과창 보이게 해줌 
        if(this.chapterEnd){
            this.chapterEnd();
        }

        
        

    }


    // inputBox(key){

    //     //두개 길이가 같지않으면 반복
        
        
        
        
    //     if(key == 'Backspace' || key == 'Shift'){
            
    //         this.input.pop();
            
    //     }
    //     else{
    //         this.input.push(key);
    //     }
        
    //     //ENTER 시 전체 지우기
    //     if(key == 'Enter'){
            
    //         this.input.splice(0);
    //     }
        
    //     //배열을 문자열에 넣어주기
    //     this.str = this.input.join('');
    // }
}