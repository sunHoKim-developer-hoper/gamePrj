import Character from "./character.js";

export default class waringDlg {
  constructor() {
    this.img = document.querySelector("#dialogue");
    this.isVisible = false;
    this.width = 600;
    this.height = 200;
    this.x = 200;
    this.y = 280;
    this.timeOfShow =60;
    this.condition = 0;
  }

  update(){
    this.timeOfShow--;
    if(this.timeOfShow==0){
      this.isVisible = false;
      this.timeOfShow =60;
    }
  }
  draw(ctx) {
    if (!this.isVisible) return;
    let warningText = '';
    let { x, y } = this;

    ctx.drawImage(this.img, x, y, this.width, this.height);

    ctx.fillStyle = "red";
    ctx.font = "bold 20px serif";
    if (this.condition==1){
     warningText = '            위험합니다, 돌아가세요';
     Character.y = 220;
    }
    else{
    warningText = '개발자의 능력부족으로 이동할 수 없습니다.'
    Character.x = 830;
  }
    ctx.fillText(warningText, x+80, y + 100);
  }
}
