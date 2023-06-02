export default class BarackCount{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 1000;
        this.height = 702;

        this.noBC = false;
    }
    
    draw(ctx){
        ctx.fillStyle = '#FFF7';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = '#000';
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = 'black'
        ctx.font = 'bold 48px serif'
        ctx.fillText(3, this.width/2, this.y+70);
    }

    update(ctx){
        if(!this.noBC){
            this.draw(ctx);
            this.noBC = true;
        }
    }
}