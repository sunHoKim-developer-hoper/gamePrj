export default class IntroCanvas {
  constructor() {
    this.dom = document.querySelector(".intro-canvas");
    this.dom.focus();

    this.dom.addEventListener("keydown", this.keyDownHandler.bind(this));

    /** @type{CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");
    this.mapImg = document.querySelector("#introMap");
    this.shipImg = document.querySelector("#ship");
    this.quiz = "If(Event.key ==\"Escape\") => You Can Skip!)";
    //배의 좌표
    this.sx = 0;
    this.sy = 500;
    this.moveRightDelay = 10;
    this.textDelay = 120;
    this.quizDelay = 80;
    this.cx = 600;

    this.bgm = document.querySelector("#bgm");
  }

  run() {
    
    this.playBgm();
    this.update();
    this.draw();

    window.setTimeout(() => {
      this.run();
    }, 17);
  }

  draw() {
    this.ctx.drawImage(this.mapImg, 0, 0, 1000, 702);
    this.ctx.drawImage(this.shipImg, this.sx, this.sy, 100, 50);
    this.ctx.font = "50px Galmuri9";
    this.ctx.fillText("Loading", 400, 250);
    this.ctx.fillText(".", this.cx, 250);
    this.ctx.font = "20px Galmuri9";
    this.ctx.fillText(this.quiz,310,300)
  }

  update() {
    this.moveRightDelay--;
    if (this.moveRightDelay == 0) {
      this.sx += 15;
      this.moveRightDelay = 10;
    }
    this.textDelay--;
    if (this.textDelay == 0) {
      this.cx += 20;
      this.textDelay = 30;
    }
    this.quizDelay--;
    if (this.quizDelay == 0) {
      this.quiz = this.quiz=="If(Event.key ==\"Escape\") => You Can Skip!)" ? "" : "If(Event.key ==\"Escape\") => You Can Skip!)";
      this.quizDelay = 80;
    }
    if (this.cx == 660) 
      this.cx = 600;

    if (this.sx >= 1000) window.location = "../mainUI/main.html";
  }
  keyDownHandler(e) {
    console.log(e.key);
    if (e.key == "Escape") window.location = "../mainUI/main.html";
  }

  playBgm(){
    this.bgm.play();
}
}
