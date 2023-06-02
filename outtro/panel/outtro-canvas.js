export default class OuttroCanvas {
  constructor() {
    this.dom = document.querySelector(".outtro-canvas");
    this.dom.focus();

    /** @type{CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");
    this.mapImg = document.querySelector("#introMap");
    this.shipImg = document.querySelector("#ship");
    //배의 좌표
    this.sx = 1000;
    this.sy = 500;
    this.moveRightDelay = 10;
    this.textDelay = 120;
    this.cx = 580;
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
    this.ctx.fillText("bye", 480, 250);
    this.ctx.fillText(".", this.cx, 250);
  }

  update() {
    this.moveRightDelay--;
    if (this.moveRightDelay == 0) {
      this.sx -= 15;
      this.moveRightDelay = 10;
    }
    this.textDelay--;
    if (this.textDelay == 0) {
      this.cx += 20;
      this.textDelay = 30;
    }
    if (this.cx == 640) 
      this.cx = 580;

  }
  playBgm(){
    this.bgm.play();
}
}
