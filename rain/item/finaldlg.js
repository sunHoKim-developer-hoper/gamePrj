export default class FinalDlg{
    constructor(){
        this.x = 89;
        this.y = 98;
        this.width = 650;
        this.height = 450;
        this.finalScore = 0;

        this.img = document.querySelector("#finaldlg");
        
        this.btnYes = {
            x:179,
            y:258,
            width:137,
            height:35
        };

        this.btnNo = {
            x:332,
            y:258,
            width:137,
            height:35
        };

        this.isVisible = false;
        this.onclick = null;
    }

    notifyClick(x, y){

        let {
            btnYes:{x:xYes, y:yYes, width:wYes, height:hYes},
            btnNo:{x:xNo, y:yNo, width:wNo, height:hNo}
        } = this;
        
        // YES 를 클릭한 경우
        if((this.x+xYes <= x && x <= this.x+xYes+wYes) 
            && (this.y+yYes <= y && y <= this.y+yYes+hYes)){
            
            if(this.onclick && this.isVisible)
                this.onclick(1); // 1을 받으면 DLG, 2는 YES, 3은 NO버튼
        }
        // No 를 클릭한 경우
        else if((this.x+xNo <= x && x <= this.x+xNo+wNo) 
            && (this.y+yNo <= y && y <= this.y+yNo+hNo)){
            
            if(this.onclick && this.isVisible)
                this.onclick(2); // 1을 받으면 DLG, 2는 YES, 3은 NO버튼
        }
    }

    show(score){
        this.finalScore = score;
        this.isVisible = true;
    }

    draw(ctx){
        if(!this.isVisible)
            return;

        let {x,y} = this;
        ctx.drawImage(this.img, x, y, this.width, this.height);

        ctx.fillStyle = 'black'
        ctx.font = 'bold 19px serif'
        let str = `당신의 최종 점수는 ${this.finalScore}점입니다.`;
        ctx.fillText(str,x+185, y+180);
        let str2 = `계속하시겠습니까?`;
        ctx.fillText(str2, this.width/2, y+220);
        let btns = [this.btnYes, this.btnNo];

        for(let btn of btns){
            let {x, y, width:w, height:h} = btn;

            ctx.fillStyle = '#0000';
            ctx.fillRect(this.x+x, this.y+y, w, h);
        }
    }

    update(){

    }
}