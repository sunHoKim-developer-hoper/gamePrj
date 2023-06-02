import newlec from "../newlec.js";

export default class Boy {
  //private로 만들어 주는 것
  #speed;
  constructor(x, y,) {
    this.img = document.querySelector("#boy");
    this.ix = 1;
    this.iy = 2;
    this.sw = this.img.width/3;
    this.sh = this.img.height/4;
    this.flag = false;
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;

    //display x,y 좌표이다.
    this.x = x ?? 100;
    this.y = y ?? 100;

    //이동할 좌표 (단위백터..)
    this.vx = 0;
    this.vy = 0;

    //목적지 x,y좌표
    this.dx = 0;
    this.dy = 0;

    //상태변수
    this.walkDelay = 10;

    //getter setter를 사용할 수 있다. but 아래에 멤버 함수로 정의해주는 것도 필요하다.
    this.#speed = 3;
    //4방향의 상태변수가 따로 있어야 한다.
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    this.onNoLife;
    this.noLife = false;
  }
  //draw와 update는 사용사자 호출하지 않는다. 게임 쓰레드..
  draw(ctx) {
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;
    //img 객체 생성
    // var img = new Image(); //객체를 생성하지 않으면 undefined 에러 발생
    // img.src = "./image/boy.png";
    // img.onload = function () {
    //   //함수를 한 녀석은 img다, 따라서 this는 img
    //   ctx.drawImage(
    //     img,
    //     //그림파일(소스)의 좌표 및 크기
    //     this.sx, this.sy, this.sw, this.sh,
    //     //캔버스 상의 디스플레이 좌표 및 크기
    //     this.x-this.sw/2, this.y-this.sh+15, this.sw, this.sh);
    // }.bind(this); //밖에 있는 this를 넣어줘라; bind가 없으면 onload안의 this는 img가 된다.ㄴ
    ctx.drawImage(
      this.img,
      //그림파일(소스)의 좌표 및 크기
      this.sx, this.sy, this.sw, this.sh,
      //캔버스 상의 디스플레이 좌표 및 크기
      this.x, this.y, this.sw, this.sh
    );
    
    ctx.beginPath();
    ctx.arc(this.x + this.sw/2, this.y + this.sh/2, this.sw/2, 0, 2 * Math.PI);
    ctx.stroke();
    
  }

  update() {
    for(let enemy of newlec.enemies){
      let ex = enemy.x;
      let ey = enemy.y;

      let w = ex - (this.x + this.sw/2);
      let h = ey - (this.y + this.sh/2);

      let d = Math.sqrt( h * h + w * w);
      //반지름의 합
      let r1r2 = this.sw/2 + enemy.img.width/2
      //충돌 시 사라져야 한다.
      if(d <= r1r2){
        enemy.chungdol();

        //위임 받은 놓은 함수를 호출한다.
        if(this.onNoLife && !this.noLife){
          this.onNoLife();
          this.noLife = true;
        }
      }
    }


    //--- 이동을 위한 코드--- 개별적으로 다녀야 한다.
    if (this.moveUp) {
      this.y -= this.#speed;
      this.iy = 0;
    }
    if (this.moveDown){ 
      this.y += this.#speed;
      this.iy = 2;
    }
    if (this.moveLeft){ 
      this.x -= this.#speed;
      this.iy = 3;
    }
    if (this.moveRight){ 
      this.x += this.#speed;
      this.iy = 1;
    }

    // switch (this.dir) {
    //   case 37: //서쪽
    //     this.x -= 2;
    //     break;
    //   case 39: //동쪽
    //     this.x += 2;
    //     break;
    //   case 38: //북쪽
    //     this.y -= 2;
    //     break;

    //   case 40: //남쪽
    //     this.y += 2;
    //     break;
    // }

    if ((this.dx - 1 < this.x && this.x < this.dx + 1) && (this.dy - 1 < this.y && this.y < this.dy + 1)) {
      //조건문 안에는 범위값을 지정해줘야 한다.
      this.vx = 0;
      this.vy = 0;
    }

    this.x += this.vx;
    this.y += this.vy;
    //방향키가 눌린게 없으면이라는 조건식이다.
    if (!(this.moveLeft || this.moveRight || this.moveUp || this.moveDown || false))
      if (this.vx == 0 && this.vy == 0) {
        this.ix = 1;
        return;
    }
    //걸음을 걷는 효과
    this.walkDelay--;
    if (this.walkDelay == 0) {
      this.ix = this.ix == 2 ? 0 : 2;
      this.walkDelay = 10;
    }
}

  move(dir) {
    switch (dir) {
      case 38: //북쪽
        this.moveUp = true;
        break;
      case 40: //남쪽
        this.moveDown = true;
        break;
      case 37: //서쪽
        this.moveLeft = true;
        break;
      case 39: //동쪽
        this.moveRight = true;
        break;
    }
  }

  stop(dir) {
    switch (dir) {
      case 38: //북쪽
        this.moveUp = false;
        break;
      case 40: //남쪽
        this.moveDown = false;
        break;
      case 37: //서쪽
        this.moveLeft = false;
        break;
      case 39: //동쪽
        this.moveRight = false;
        break;
    }
  }

  // moveTo(dx, dy) {
  //   this.dx = dx;
  //   this.dy = dy;
  //   let w = dx - this.x;
  //   let h = dy - this.y;
  //   let d = Math.sqrt(w * w + h * h);

  //   //단위백터 값만큼 움직인다.
  //   this.vx = w / d;
  //   this.vy = h / d;
  // }

  //getter, setter용
  set speed(value){
    this.#speed = value;
  }
  get speed(){
    return this.#speed;
  }
}
