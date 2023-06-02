import Character from "./character.js";

export default class EnterDlg {
  constructor() {
    this.img = document.querySelector("#dialogue");
    this.isVisible = false;
    this.onExit = false;
    this.onContinue = false;
    this.width = 600;
    this.height = 300;
    this.x = 250;
    this.y = 250;

    this.gameNum = 0;

    this.dinosaurImg = document.querySelector("#dinosaur");
    this.acidRainImg = document.querySelector("#acidRain");
   
  }
  show() {
    this.isVisible = true;
  }
  draw(ctx) {
    if (!this.isVisible) return;
    let { x, y } = this;

    ctx.drawImage(this.img, x,y, this.width, this.height );

    ctx.fillStyle = "black";
    ctx.font = "bold 22px Arial";
    if(357<=Character.x&&Character.x<=457)
      ctx.fillText("            공룡탈출 게임에 입장하시겠습니까?", this.width / 2 + 10, y + 80);
    else
      ctx.fillText("            산성비 게임에 입장하시겠습니까?", this.width / 2 + 10, y + 80);
    
      ctx.fillStyle = "gray";
    ctx.fillRect(x + 100, y + 150, 100, 50);
    ctx.fillStyle = "black";
    ctx.strokeRect(x + 100, y + 150, 100, 50);
    ctx.fillStyle = "gray";
    ctx.fillRect(x + 400, y + 150, 100, 50);
    ctx.fillStyle = "black";
    ctx.strokeRect(x + 400, y + 150, 100, 50);

    ctx.font = "bold 30px Arial";
    ctx.fillText("YES", this.width / 2 + 70, y + 185);
    ctx.font = "bold 30px Arial";
    ctx.fillText("NO", this.width / 2 + 375, y + 185);

    if(this.gameNum ==2)
      ctx.drawImage(this.dinosaurImg,this.width/2 +170, y+130 ,160,80);
    else
      ctx.drawImage(this.acidRainImg,this.width/2 +170, y+130 ,160,80);
  }

  clickNotify(x, y) {
    if(this.isVisible) {
      if(357<=x&&x<=457&&408<=y&&y<=458&&this.gameNum==1) {
        window.location = "../rain/main.html";
      }
      else if(357<=x&&x<=457&&408<=y&&y<=458&&this.gameNum==2){
        window.location = "../racing/main.html";

      }
      
      if (657<=x&&x<=757&&408<=y&&y<=458&&this.gameNum==1) {
        this.isVisible = false;
        Character.y = 550;
      }
      else if(657<=x&&x<=757&&408<=y&&y<=458&&this.gameNum==2){
        this.isVisible = false;
        Character.y = 550;
      }
    }
  }
}
