export default class Enemy {
  constructor(x = 0, y = 0, fn) {
    //값이 안 넘어오면 0,0으로 초기화한다.
    this.img = document.querySelector("#enemy");

    this.imgFire = document.querySelector("#fire");
    this.fsw = this.imgFire.width / 4;
    this.fsh = this.imgFire.height / 5;
    this.fsx;
    this.fsy;
    this.fix = 0;
    this.fiy = 0;

    this.x = x;
    this.y = y;
    this.speed = 2;
    //게임 캔버스에서 함수를 줬냐 안줬냐 판별
    this.onOutOfScreen = fn;
    this.isChungdol = false;
    this.fireDelay = 30;
}

  draw(ctx) {

    this.sx = this.fsw * this.fix;
    this.sy = this.fsh * this.fiy;

    ctx.beginPath();
    ctx.arc(this.x,this.y, this.img.width/2, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.drawImage(
      this.img,
      this.x - this.img.width / 2,
      this.y - this.img.height / 2
    );

    if (this.isChungdol) {
        ctx.drawImage(
            this.imgFire,this.sx, this.sy, this.fsw, this.fsh,
            this.x - this.fsw / 2, this.y - this.fsh / 2, this.fsw, this.fsh);      
    }
    
}
  update() {
    this.y += this.speed;
    if (this.y > 500) this.onOutOfScreen(this);
    if(this.isChungdol){
        if(!(this.fiy ==5)){
            this.fix += 1;
        if(this.fix == 4){
            this.fix =0;
            this.fiy +=1;
            }
        }
    }
    if(this.fiy ==5)
        this.onOutOfScreen(this);
}
  chungdol() {
    this.isChungdol = true;
  }
}
