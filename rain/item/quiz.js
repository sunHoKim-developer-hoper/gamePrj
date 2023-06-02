export default class Quiz{
    constructor(x, y, text, color, speed){
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color; // 색상을 정하기 위한 상태변수 0=='black', 1=='blue', 2=='red'
        this.life = 5;
        this.speed = speed;

        this.delete = null;
        this.minusClientLife = null;
    }

    draw(ctx){
        // 문제별로 색상 상태변수에 따라 색상을 지정
        if(this.color == 0)
            ctx.fillStyle = "white";
        else if(this.color == 1)
            ctx.fillStyle = "blue";
        else if(this.color == 2)
            ctx.fillStyle = "red";

        // 문제 그리기
        ctx.font = "30px RIDIBatang";
        ctx.fillText(this.text, this.x, this.y);
    }

    update(speed){
        this.y += speed;

        if(this.y > 700 && this.color != 2){ // 땅에 닿고, color가 red가 아닌 경우
            this.delete(this);
            console.log("목숨감소");
            this.minusClientLife();
            // return;
        }
    }

    update2(){
        this.y += this.speed;

        if(this.y > 700){
            this.delete(this);
        }
    }
}