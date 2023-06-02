export default class Ship{
    constructor(){

        this.img = document.querySelector("#ship");
        this.x = 20;
        this.y = 430;
    }

    draw(ctx){
        ctx.drawImage(this.img, 
            this.x,this.y,
            200,100);

    }

}