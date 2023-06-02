import Character from "../items/character.js";

export default class EtcDlg {
  constructor() {
    this.img = document.querySelector("#dialogue");
    this.closeImg = document.querySelector("#close");
    this.backImg = document.querySelector("#back");
    this.soldOutImg = document.querySelector("#soldout");

    this.dinosaurImg = document.querySelector("#dinosaur");
    this.acidRainImg = document.querySelector("#acidRain");

    this.isVisible = false;
    this.onExit = false;
    this.onContinue = false;
    this.width = 600;
    this.height = 300;
    this.x = 250;
    this.y = 250;
    
    this.showExplainDlg = false;
    this.showChangeCharDlg = false;
    this.showGameImgsDlg = false;

    //닫기 버튼
    this.sizeOfBtn = 30;
    this.BtnX = this.x + 494;
    this.closeBtnY = this.y + 228;
    this.backBtnY = this.y + 178;

    //게임설명 창 버튼
    this.explainBtnX = this.width / 2 + 190;
    this.explainBtnY = this.y + 130;

    //캐릭터변경 창 버튼
    this.characterBtnX = this.width / 2 + 170;
    this.characterBtnY = this.y + 210;

    //캐릭터 그림좌표
    this.drawImgsX = 370;
    this.drawImgsY = 320;

    this.gameNum = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.font = "bold 30px Galmuri9";

    if (this.isVisible == false) {
      return;
    }
    let { x, y } = this;
    //창 그리기
    ctx.drawImage(this.img, x, y, this.width, this.height);
    //닫기 버튼
    ctx.drawImage(this.closeImg,this.BtnX, this.closeBtnY, this.sizeOfBtn, this.sizeOfBtn);
    ctx.fillText("게임설명", this.explainBtnX, this.explainBtnY, 150);
    ctx.fillText("캐릭터 변경", this.characterBtnX, this.characterBtnY, 200);

    //캐릭터 변경 창
    this.drawCharChangDlg(ctx);
    //게임 이미지 선택창
    this.drawGameImgsDlg(ctx);

    //게임 설명 창
    this.drawExplainDlg(ctx);
  }

  clickNotify(ex, ey) {

    // 게임 설명, 캐릭터 변경 버튼 클릭
    this.clickChangeFirstDlg(ex, ey);
    // 캐릭터 클릭
    this.clickChar(ex, ey);
    // 뒤로가기 버튼 클릭
    this.clickBackBtn(ex, ey);
    // 닫기 버튼 클리
    this.clickCloseBtn(ex, ey);
    
    this.clickGameImgs(ex, ey);
  }

// ----------------------------------------------------------------------------------------
  //캐릭터 변경창 그리기 (띄우기)
  drawCharChangDlg(ctx) {
    if (this.showChangeCharDlg) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.drawImage(Character.charImg1,
        Character.iw, Character.ih, Character.iw, Character.ih,
        this.drawImgsX, this.drawImgsY, 100,150);
      ctx.drawImage(Character.charImg2,
        Character.iw2, Character.ih2, Character.iw2, 148.25, 
        this.drawImgsX + 220,this.drawImgsY - 20, 130, 180);

      this.drawBtn(ctx);
      this.drawSoldOut(ctx);
    }
  }

  //게임 이미지 선택 창 그리기 (띄우기), 알아서 해주세요
  drawGameImgsDlg(ctx) {
    if (this.showGameImgsDlg) {
      ctx.font = "bold 20px Galmuri9";
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.fillText("게임 선택", this.x+260, this.y+50)
      ctx.drawImage(this.dinosaurImg, this.drawImgsX, this.drawImgsY, 100, 150);
      ctx.drawImage(this.acidRainImg, this.drawImgsX + 220, this.drawImgsY - 20, 130,180);
      this.drawBtn(ctx);
    }
  }
  //지은님께 부탁 -> 게임 설명 넣기
  drawExplainDlg(ctx) {
    if (this.showExplainDlg &&  this.gameNum == 1) {
      
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.fillText("공룡 탈출", this.x/2+350, this.y + 70);
      ctx.font = "bold 20px Galmuri9";

      let str = ["공룡으로부터 도망치자!","java문제에 맞게 따라 입력하기!",
      "오타가 있으면 캐릭터가 안 움직여요!","가만히 있으면 공룡에게 잡혀요!",
      "빠르고 정확하게 쳐서 게임승리하기!"];

      for(var i=0; i<str.length; i++) {

        ctx.fillText(str[i],this.x/2+230,this.y+120+i*30);
      }

      
      this.drawBtn(ctx);

    }else if (this.showExplainDlg &&  this.gameNum == 2){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      ctx.fillText("산성비", this.x/2+400, this.y + 70);
      ctx.font = "bold 20px Galmuri9";

      let str = ["java산성비를 막자!","java산성비와 동일하게 입력하기!",
      "오타가 있을 경우 java비를 막을 수 없어요!","죽어도 게임이 끝나지 않을 수도..?",
      "믿거나~ 말거나~"];

      for(var i=0; i<str.length; i++) {

        ctx.fillText(str[i],this.x/2+230,this.y+120+i*30);
      }
      this.drawBtn(ctx);
    }
  }
  drawBtn(ctx) {
    //뒤로가기 버튼
    ctx.drawImage(this.backImg, this.BtnX, this.backBtnY+10, this.sizeOfBtn, this.sizeOfBtn);
    //닫기 버튼
    ctx.drawImage(this.closeImg, this.BtnX, this.closeBtnY, this.sizeOfBtn, this.sizeOfBtn);
  }

  //솔드아웃 이미지 그리기
  drawSoldOut(ctx) {
    if (this.showChangeCharDlg) {
      if (Character.charNum == 1) {
        let x = this.drawImgsX - 10;
        ctx.drawImage(this.soldOutImg, x, this.drawImgsY + 30, 100, 100);
      } else {
        let x = this.drawImgsX + 230;
        ctx.drawImage(this.soldOutImg, x, this.drawImgsY + 30, 100, 100);
      }
    }
  }



//-------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------
  //게임설명, 캐릭터 변경 선택 이벤트
  clickChangeFirstDlg(ex, ey) {
    let explainBtnX = this.explainBtnX <= ex && ex <= this.explainBtnX + 150;
    let explainBtnY = this.explainBtnY - 30 <= ey && ey <= this.explainBtnY + 10;

    let changeCharBtnX = this.characterBtnX <= ex && ex <= this.characterBtnX + 160;
    let changeCharBtnY = this.characterBtnY - 30 <= ey && ey <= this.characterBtnY + 10;

    if (this.isVisible) {
      // 게임설명창 버튼 클릭
      if (explainBtnX && explainBtnY) {
        this.isVisible = false;
        this.showGameImgsDlg = true;
      }

      // 캐릭터 변경창 클릭
      if (changeCharBtnX && changeCharBtnY) {
        this.isVisible = false;
        this.showChangeCharDlg = true;
      }
    }
  }
  
  //캐릭터 클릭
  clickChar(ex, ey) {
    let changeChar1X = 365 <= ex && ex <= 455;
    let changeCharY = 340 <= ey && ey <= 470;
    let changeChar2X = 620 <= ex && ex <= 700;
    
    if (this.showChangeCharDlg) {
      if (changeChar1X && changeCharY && Character.charNum == 2) {
        Character.charNum = 1;
        this.clickCharEvent();
      }
      if (changeChar2X && changeCharY && Character.charNum == 1) {
        Character.charNum = 2;
        this.clickCharEvent();
      }
    }
  }
  clickCharEvent() {
    this.showChangeCharDlg = false;
    this.showGameImgsDlg = false;
    this.isVisible = false;
    Character.y = 300;
  }

  //뒤로가기 버튼 클릭
  clickBackBtn(ex, ey){
    let btnX = this.BtnX <= ex && ex <= this.BtnX + this.sizeOfBtn + 5;
    let backY = this.backBtnY+10 <= ey && ey <= this.backBtnY+10 + this.sizeOfBtn + 5;
    
    if (this.showChangeCharDlg || this.showGameImgsDlg) {
      if (btnX && backY) 
        this.backBtnEvent();
    }
    if (this.showExplainDlg)
        this.backBtnEvent2();
  }

  backBtnEvent() {
    this.showGameImgsDlg = false;
    this.showChangeCharDlg = false;
    this.isVisible = true;
  }
  backBtnEvent2() {
    this.showExplainDlg  = false;
    this.showChangeCharDlg = false;
    this.isVisible = false;
    this.showGameImgsDlg = true;
  }

  //닫기 버튼 클릭
  clickCloseBtn(ex, ey){
    let btnX = this.BtnX <= ex && ex <= this.BtnX + this.sizeOfBtn + 5;
    let closeY = this.closeBtnY <= ey && ey <= this.closeBtnY + this.sizeOfBtn + 5;
    if (this.isVisible || this.showExplainDlg || this.showChangeCharDlg || this.showGameImgsDlg) {
      if (btnX && closeY) {
        this.closeBtnEvent();
        Character.y = 300;
    }
   }
  }
  closeBtnEvent() {
    this.showChangeCharDlg = false;
    this.isVisible = false;
    this.showGameImgsDlg = false;
  }


    //게임 이미지 클릭
    clickGameImgs(ex, ey) {
      
      let gameImg1X = 370 <= ex && ex <= 470;
      let gameImgY = 320 <= ey && ey <= 470;
      let gameImg2X = 620 <= ex && ex <= 700;
      
      if (this.showGameImgsDlg) {
        if (gameImg1X && gameImgY) {
          this.showExplainDlg = true;
          this.gameNum = 1;
          this.closeBtnEvent();
        }
        if (gameImg2X && gameImg2X) {
          this.showExplainDlg = true;
          this.gameNum = 2;
          this.closeBtnEvent();
        }
      }
    }
//-------------------------------------------------------------------------------------------

}
