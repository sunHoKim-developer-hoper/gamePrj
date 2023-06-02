export default class Client{
    constructor(){
        this.x = 800;
        this.y = 500;
        this.life = 5;
        this.score = 0;
        this.minusClientLife = null;
        this.isGameCanvas = true;

        this.img = document.querySelector("#life");
        this.character = document.querySelector("#character");
        this.correctsound = document.querySelector("#correctsound");
        this.wrongsound = document.querySelector("#wrongsound");

        this.ix = 0;
        this.iy = 0;
        this.sw = this.character.width/3;
        this.sh = this.character.height;

        this.smile = false;
        this.sad = false;
    }

    draw(ctx){
        if(this.isGameCanvas){
            ctx.drawImage(this.img, this.x+5, this.y+4, 90, 80);
            ctx.font="26px Galmuri9";
            let life = `X ${this.life}`;
            ctx.fillText(life, this.x+98, this.y+60);
        }

        let score = `SCORE : ${this.score}`;
        ctx.font="28px Galmuri9";
        ctx.fillText(score, 817, 70);

        this.sx = this.sw*this.ix;
        this.sy = this.sh*this.iy;
        ctx.drawImage(this.character,this.sx,this.sy,this.sw,this.sh,this.x-20,this.y-380,this.sw,this.sh);
    }

    update(){
        if(this.smile)
            this.ix = 1;
        if(this.sad)
            this.ix = 2;
    }

    minusFace(){
        if(this.life <= 4)
            this.sad = true;
    }

    arrangeScore(color){
        if(color == 0){
            this.score += 1;
            this.smile = true;
            this.correctSound();
        }
        else if(color == 1){
            this.score += 2;
            this.smile = true;
            this.correctSound();
        }
        else if(color == 2){
            this.minusClientLife();
            this.sad = true;
            this.wrongSound();
        }
    }

    keydownEvent(){
        this.ix = 0;
        this.smile = false;
        this.sad = false;
    }

    correctSound(){
        this.correctsound.play();
    }
    
    wrongSound(){
        this.wrongsound.play();
    }
}