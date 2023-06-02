export default class RankCanvas {
  constructor() {
    this.dom = document.querySelector(".rank-canvas");
    /*집단 지성*/
    /**@type {CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");
  }
  run(){
      this.update();
      this.draw();
    setTimeout(()=>{
        this.run();
    },17)
  }
  update() {

  }

  draw() {
    this.ctx.strokeRect(0,0,this.dom.width-1, this.dom.height-1)
  }
}
