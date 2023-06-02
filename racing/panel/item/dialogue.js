
export default class Dialogue {

    constructor(min, sec, score, tps) {
        //this.minute, this.timeresult,this.problem.getScore,this.problem.tpsResult

        this.x = 250;
        this.y = 25;

        this.width = 500;
        this.height = 350;

        //승리여부
        this.iswin = null;


        //false 가 끄기상태
        //true 는 키기 상태
        this.isvisible = false;
        this.hereClick = null;
        this.stage = 1;

        this.totalMin = 0;
        this.totalSec = 0;
        this.totalScore = 0;
        this.totalTps = 0;
        // 등급제그리기
        this.scoreClass =true;

        //버튼 
        this.btnYes = {
            x: 60,
            y: 310,
            width: 150,
            height: 50,
            label: '계속'

        };
        this.btnNo = {
            x: 290,
            y: 310,
            width: 150,
            height: 50,
            label: '끝내기'
        };

    }


    show() {

        //게임끝났을 때 
        this.isvisible = true;
    }

    unshow() {

        // console.log("un");
        //게임끝났을 때 
        this.isvisible = false;
    }

    draw(ctx) {
        ctx.font = "30px '굴림체'";
        ctx.fillStyle = "black";
        ctx.fillText("Stage "+ this.stage+"단계", 10, 50); 

        //false 이면 출력안함
        if (!this.isvisible) {
            // console.log("12345")
            return;
        }

        // 누적용
        // this.totalMin += this.min;
        this.totalScore += this.score;
        this.totalTps += this.tps;
        this.totalSec += this.sec;

        if (this.totalSec > 59) {
            this.totalMin++;

            this.totalSec %= 60;

        }


        // console.log("5555")

        let { x, y } = this;


        // 수정
        ctx.fillStyle = "#eed7a1";
        ctx.fillRect(x, y, this.width, this.height + 70);
        //수정
        ctx.fillStyle = "#000";
        ctx.strokeRect(x, y, this.width, this.height + 70);
        //수정
        //승리패배
        ctx.font = 'bold 30px "굴림체"';
        let win = (this.iswin) ? "<승리>" : "<패배>";
        ctx.fillText(win, x + 198, y + 50);
        //수정
        //게임결과
        ctx.font = '24px "굴림체"';
        ctx.fillText("게임결과", x + 195, y + 90);

        //수정
        ctx.font = '700 18px 굴림체'
        ctx.fillText("TPS      : " + "초당" + this.tps + "타", x + 20, y + 190);
        ctx.fillText("점수     : " + this.score + "점", x + 20, y + 230);
        ctx.fillText("게임시간 : " + this.min + "분" + this.sec + "초", x + 20, y + 150);
        // 선수정
        ctx.fillRect(x + 240, y + 110, 2, this.height - 214)
        ctx.font = '700 18px 굴림체'
        ctx.fillText("총 TPS     : " + "초당" + this.totalTps + "타", x + 260, y + 190);
        ctx.fillText("총 점수    : " + this.totalScore + "점", x + 260, y + 230);
        ctx.fillText("총 게임시간: " + this.totalMin + "분" + this.totalSec + "초", x + 260, y + 150);

        //다음레벨
        ctx.font = '700 18px 굴림체'
        ctx.fillStyle = "#000";
        //245 만큼 내리고 // 사이즈도 245만큼 줄임
        console.log(this.iswin);
        //수정함.
        if (this.iswin == true) {
            ctx.fillText("<  다음 레벨로 가시겠습니까?  >", x + 100, y + 300);
        }
        else if (this.iswin == false) {
            ctx.fillText("<  다시 하시겠습니까?  >", x + 130, y + 300);

        }


        //예 아니오
        let btns = [this.btnYes, this.btnNo];

        for (let btn of btns) {

            let { x, y, width, height} = btn;
            //수정
            ctx.fillStyle = "white";
            ctx.fillRect(this.x + x, this.y + y + 40, width, height);
            ctx.fillRect(this.x + x, this.y + y + 40, width, height);
        }
        //수정
        ctx.fillStyle = "black";
        ctx.fillText('계속', this.x + 115, this.y + 380);
        ctx.fillText('끝내기', this.x + 337, this.y + 380);
       

    }

    update(iswin, min, sec, score, tps) {

        this.iswin = iswin;
        // console.log(this.iswin);

        this.min = min;
        this.sec = sec;
        // console.log(this.score);
        this.score = score;
        this.tps = tps;


        // console.log(this.btnYes.x);
        // console.log(this.btnYes.y);
    }
    notifyClick(x, y) {
        //this.x + x < x < this.x + x + width
        //this.y + y < y < this.y + y + height
        //수정
        //계속 클릭
       
        if ((this.x + this.btnYes.x < x && x < this.x + this.btnYes.x + this.btnYes.width) &&
            (this.y + 50 + this.btnYes.y < y && y < this.y + 50 + this.btnYes.y + this.btnYes.height)) {
            console.log(this.onClick);
            console.log(x)
            if (this.onClick){
                this.onClick(1);
                this.stage ++;
            }
                

        }
        //수정
        //아니오 클릭
        else if ((this.x + this.btnNo.x < x && x < this.x + this.btnNo.x + this.btnNo.width) &&
            (this.y + 50 + this.btnNo.y < y && y < this.y + 50 + this.btnNo.y + this.btnNo.height)) {

            if (this.onClick) {
                console.log("여기2 함수추가요망");
                this.onClick(2);
            }


        }

    }

}