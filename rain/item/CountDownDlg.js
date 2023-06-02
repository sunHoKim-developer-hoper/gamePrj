export default class CountDownDlg {
  constructor() {
    this.x = 85;
    this.y = 51;
    this.width = 400;
    this.height = 400;

    // 발악타임 오프닝 카운트
    this.isVisible = false;
    this.count = '3';
    this.countDown = 240;
    
    // 발악타임 카운트
    this.count2 = 0;
    this.countDown2 = 600;
    this.isZero = false;
    this.i = 0;
    this.firstX = 0;

    this.sound = document.querySelector("#countdown");
    this.soundPuase=false;
  }

  update(){
    if(!this.soundPuase){
      this.soundPlay();
      this.soundPuase=true;
    }

    this.countDown--;
    if(this.countDown==180){
      this.count = '2';
    }
    else if(this.countDown==120){
      this.count = '1';
    }
    else if (this.countDown==60){
      this.x = -110; // '발악타임!' 가운데 정렬을 위한 보정
      this.count = '발악타임!';
    }
  }

  update2(){ 
    if(this.countDown2%60==0 && !this.isZero){
      this.count2 = 10 - this.i;
      this.i++;

      if(this.count2==10)
        this.firstX -= 15;
      else
        this.firstX = 0;
      
      if(this.count2==0)
        this.isZero = true;
    }
    this.countDown2--; // 처음부터 60의 배수를 만들기 위하여 --를 아래로 내림
  }

  draw(ctx) {
    if(!this.isVisible) 
      return;

    let {x,y} = this;

    ctx.fillStyle = "red";
    ctx.font = "bold 100px Galmuri9";
    ctx.fillText(this.count, x+285, y+300);
  }

  draw2(ctx) {
    ctx.fillStyle = "#000";
    ctx.font="30px Galmuri9";
    let countText = "COUNTDOWN";
    ctx.fillText(countText, 805, 500+4);

    ctx.fillStyle = "red";
    ctx.font="80px Galmuri9";
    let time = this.count2;
    ctx.fillText(time, 865+this.firstX, 610);

  }

  soundPlay(){
    this.sound.play();
  }
}
