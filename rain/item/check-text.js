import QuizArray from "../quiz-array.js";

export default class CheckText{
    constructor(){
        this.x = 226;
        this.y = 600;

        this.answers = [];
        this.arrangeScore = null;

        this.isBarack = false;
    }

    draw(ctx){
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x+45, this.y, 265, 50);
        
        ctx.lineWidth = 8;
        ctx.strokeStyle="#7e7d7c";
        ctx.strokeRect(this.x+45, this.y, 265, 50);

        ctx.fillStyle = "black";
        ctx.font = "30px RIDIBatang";
        let answer = this.answers.join("");
        ctx.fillText(answer, this.x+55, this.y+35);
    }

    fillAndCheckText(e){
        // 뒤로가기 키 활성화
        if(e.key == "Backspace"){
            this.answers.pop();
            return;
        }

        // 알파벳, 특수문자, 엔터 이외의 문자 입력방지
        if(!(e.key.length==1 || e.key=="Enter")) // e.key가 문자열로 들어옴. 길이가 1보다 크면 문자 하나가 아니면 리턴해라로 수정하기, 엔터키도 입력되어야함 // 1이 넘으면 빈문자열로 바꾸기
            return;

        if(e.key != "Enter")
            this.answers.push(e.key);
        else {
            this.checkAnswer();
            this.answers = [];
        }
    }

    checkAnswer(){
        if(this.isBarack)
            for(let quiz of QuizArray.quizzesB){
                let answer = this.answers.join("");
                if(answer === quiz["text"]){
                    quiz.delete(quiz);
                    this.arrangeScore(0);
                    break;
                }
            }
        else
            for(let quiz of QuizArray.quizzes){
                let answer = this.answers.join("");
                if(answer === quiz["text"]){
                    quiz.delete(quiz);
                    this.arrangeScore(quiz.color);
                    break;
                }
            }
    }
}