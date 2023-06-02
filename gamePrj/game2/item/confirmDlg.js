export default class ConfirmDlg{

    constructor(){
        //위임 변수
        this.onContinue = false;
        this.onExit = false;
        this.isVisible = false;
        this.width  = 400;
        this.height = 200;
        this.x = 100;
        this.y = 100;
        this.btnYes = {
            x: 70,
            y:100,
            width :100,
            height : 50,
            label : "Yes"
        }
        this.btnNo ={
            x: 230,
            y:100,
            width :100,
            height : 50,
            label : "No"
        }
        this.onclick = null;
    
    }



    //요청이 들어왔을 때만 나타나게...
    show(){
        this.isVisible = true;
    }

    update(){

    }

    draw(ctx){
        if(!this.isVisible)
            return;
        let {x, y} = this;
        //배경을 흰색으로
        ctx.fillStyle = '#FFF7';
        ctx.fillRect(x, y, this.width, this.height);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, y, this.width, this.height);

        ctx.fillStyle = 'black'
        ctx.font = 'bold 48px serif'
        ctx.fillText('Continue?', this.width/2, y+70);

        let btns = [this.btnYes, this.btnNo];
        for(let btn of btns){
            let {x, y, width :w, height:h } =btn;
            ctx.fillStyle = 'gray';
            ctx.fillRect(this.x+x, this.y+y, w, h);
            ctx.fillStyle = 'black';
            ctx.strokeRect(this.x+x, this.y+y, w, h);
            ctx.font = 'bold 30px serif'
            ctx.fillText(btn.label, this.x+x+20, this.y+135);
        }
    }
    notifyClick(x, y){
        if((this.x < x && x < this.x+this.width) && (this.y < y && y < this.y + this.height)){
            console.log("나야?");
            //자식이 있다면 자식들에게 통지를 하지만 나의 이벤트, 자식 버튼의 이벤트를 모두 고려해야 한다.
            //나에게 할당된 이벤트가 있는지 확인! 콜백 함수!!
            if(this.onclick){
                this.onclick(3); // 1을 받으면 DLG, 2는 YES, 3은 No 버튼
            }
        }
    }
}