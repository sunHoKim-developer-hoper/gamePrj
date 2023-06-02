export default class Menubackground{
    constructor(){

        this.img = document.querySelector("#menu");
        this.dinosaurImg = document.querySelector("#dinosaur");
        this.acidRainImg = document.querySelector("#acidRain");
        this.exitImg = document.querySelector("#exit");
        this.warningImg = document.querySelector("#warning");
        this.x = 0;
        this.y = 0;
        this.wx = 190;
        this.wy = 160;

    }
    draw(ctx){
        ctx.drawImage(this.img,this.x,this.y,1000,702);
        ctx.drawImage(this.warningImg,this.wx-165,this.wy,128,125);
        ctx.drawImage(this.dinosaurImg,370,440,160,80);
        ctx.drawImage(this.acidRainImg,720,440,160,80);
        ctx.drawImage(this.warningImg,this.wx,this.wy,128,125);
        ctx.drawImage(this.warningImg,this.wx+85,this.wy,128,125);
        ctx.drawImage(this.warningImg,this.wx+195,this.wy,128,125);
    }
   
}