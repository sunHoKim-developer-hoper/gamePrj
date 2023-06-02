class Character {
  constructor() {
    this.charImg1 = document.querySelector("#character1");
    this.charImg2 = document.querySelector("#character2");
    //캐릭터1
    this.ix = 3;
    this.iy = 3;
    this.iw = 317.5;
    this.ih = 414;

    //캐릭터2
    this.ix2 = 1;
    this.iy2 = 0;
    this.iw2 = 106;
    this.ih2 = 148.25;

    this.deckY = 552;
    this.x = 293;
    this.y = this.deckY;

    this.speed = 3;

    this.walkDelay = 10;
    this.dir = 0;

    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;

    this.showExitDlg;
    this.showWarnDlg;
    this.showEnterDlg;

    this.charNum = 1;
  }

  draw(ctx) {
    if (this.charNum == 1) {
      this.cx = this.iw * this.ix;
      this.cy = this.ih * this.iy;
      ctx.drawImage( this.charImg1,
        this.cx, this.cy, this.iw, this.ih,
        this.x, this.y, 50, 80);
    } else if (this.charNum == 2) {
      this.cx2 = this.iw2 * this.ix2;
      this.cy2 = this.ih2 * this.iy2;
      ctx.drawImage( this.charImg2,
        this.cx2, this.cy2, this.iw2, this.ih2,
        this.x, this.y, 50, 80);
    }
  }

  update() {
    //right, 산성비
    if (760 <= this.x && this.x <= 810 && 490 <= this.y && this.y <= 510) {
      this.showEnterDlg(1);
      return;
    }
    //left, 레이싱 게임
    if (405 <= this.x && this.x <= 455 && 490 <= this.y && this.y <= 510) {
      this.showEnterDlg(2);
      return;
    }

    //setting창 띄우기
    if (580 <= this.x && this.x <= 645 && 248 <= this.y && this.y <= 276) {
      this.showEtcDlg();
      return;
    }
    //Exit창 띄우기
    if (this.x <= 290 && 550 <= this.y && this.y <= 570) {
      this.iy = 2;
      this.showExitDlg();
      return;
    }

    //경고창 띄우기
    if (this.y <= 200) {
      this.showWarnDlg(1);
      return;
    }
    if (this.x >= 850 && 275<=this.y && this.y<=297) {
      this.showWarnDlg(2);
      return;
    }

    if(!(this.moveLeft||this.moveRight||this.moveUp||this.moveDown||false)){
      this.ix = 1;
      this.iy = 0;
      this.ix2 = 1;
      this.iy2 = 2;
      return;
    }
    if (this.charNum == 1) {
      if (this.moveUp) {
        this.y -= this.speed;
        this.iy = 3;
      }
      if (this.moveDown) {
        this.y += this.speed;
        this.iy = 0;
      }
      if (this.moveLeft) {
        this.x -= this.speed;
        this.iy = 2;
      }
      if (this.moveRight) {
        this.x += this.speed;
        this.iy = 1;
      }
    } else {
      if (this.moveUp) {
        this.y -= this.speed;
        this.iy2 = 0;
      }
      if (this.moveDown) {
        this.y += this.speed;
        this.iy2 = 2;
      }
      if (this.moveLeft) {
        this.x -= this.speed;
        this.iy2 = 3;
      }
      if (this.moveRight) {
        this.x += this.speed;
        this.iy2 = 1;
      }
    }

    this.walkDelay--;
    if (this.walkDelay == 0) {
      if (this.charNum == 1) {
        if (this.iy == 2) {
          this.ix = this.ix == 1 ? 3 : 1;
        } else {
          this.ix = this.ix == 2 ? 0 : 2;
        }
      } else {
        this.ix2 = this.ix2 == 2 ? 0 : 2;
      }
      this.walkDelay = 10;
    }
    this.isOutOfDeck();
  }

  move(dir) {
    switch (dir) {
      case 1:
        this.moveUp = true;
        break;
      case 3:
        this.moveDown = true;
        break;
      case 2:
        this.moveRight = true;
        break;
      case 4:
        this.moveLeft = true;
        break;
    }
  }

  stop(dir) {
    switch (dir) {
      case 1:
        this.moveUp = false;
        break;
      case 3:
        this.moveDown = false;
        break;
      case 2:
        this.moveRight = false;
        break;
      case 4:
        this.moveLeft = false;
        break;
    }
  }

  isOutOfDeck() {
    //데크 못 벗어나게 하는 코드
    let yCondition = 545 <= this.y && this.y <= 570;
    //1번구역
    if (268 <= this.x && this.x <= 401 && yCondition) this.y = this.deckY;
    else if (401 < this.x && this.x < 428 && this.y >= 550) this.y = this.deckY;
    //2번구역
    else if (428 <= this.x && this.x <= 640 && yCondition) this.y = this.deckY;
    else if (640 < this.x && this.x < 657 && this.y >= 550) this.y = this.deckY;
    //마을로 올라가는 데크
    else if (640 < this.x && this.x < 657 && 471 <= this.y && this.y <= 551)
      this.x = 650;
    //3번구역
    else if (657 <= this.x && this.x <= 760 && yCondition) this.y = this.deckY;
    else if (760 < this.x && this.x < 782 && this.y >= 550) this.y = this.deckY;
    else if (782 <= this.x && yCondition) this.y = this.deckY;
    
    if (this.x > 850 && yCondition) this.x = 840;
  }
}
export default new Character();
