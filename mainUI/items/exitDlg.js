import Character from "./character.js";

export default class ExitDlg {
  constructor() {
    this.img = document.querySelector("#dialogue");
    this.isVisible = false;
    this.onExit = false;
    this.onContinue = false;
    this.width = 650;
    this.height = 300;
    this.x = 250;
    this.y = 250;
  }
  show() {
    this.isVisible = true;
  }
  draw(ctx) {
    if (!this.isVisible) return;
    let { x, y } = this;


    ctx.drawImage(this.img, x,y, this.width, this.height );

    ctx.fillStyle = "black";
    ctx.font = "bold 48px serif";
    ctx.fillText("Do you want to Exit?", this.width / 2 + 10, y + 70);

    ctx.fillStyle = "gray";
    ctx.fillRect(x + 100, y + 150, 100, 50);
    ctx.fillStyle = "black";
    ctx.strokeRect(x + 100, y + 150, 100, 50);
    ctx.fillStyle = "gray";
    ctx.fillRect(x + 400, y + 150, 100, 50);
    ctx.fillStyle = "black";
    ctx.strokeRect(x + 400, y + 150, 100, 50);

    ctx.font = "bold 30px serif";
    ctx.fillText("YES", this.width / 2 + 45, y + 185);
    ctx.font = "bold 30px serif";
    ctx.fillText("NO", this.width / 2 + 355, y + 185);
  }

  clickNotify(ex, ey) {
    let { x, y } = this;
    if (this.isVisible) {
      if (x+100 <= ex && ex <= x+200 && y+150 <= ey && ey <= y+200) {
        window.location = "../outtro/index.html";
      }
      if (x+400 <= ex && ex <= x+500 && y+150 <= ey && ey <= y+200) {
        this.isVisible = false;
        Character.x = 293;
      }
    }
  }
}
