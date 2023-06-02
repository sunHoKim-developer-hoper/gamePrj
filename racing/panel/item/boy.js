import Dinosaur from "./dinosaur.js";

export default class Boy {
  constructor(x, y) {
    this.img = document.querySelector(".boy");
    // 보이 쓰러지는 이미지
    this.img2 = document.querySelector(".boyDie");

    //위치 조정해주기
    // this.x = x + 80;
    this.x = x + 80;
    this.y = y;
    this.ix = 1;
    this.iy = 1;

    // 보이가 졌을떄
    this.dix = 0;
    this.diy = 0;
    this.dieSw = this.img2.width;
    this.dieSh = this.img2.height;
    this.dieSw2 = this.dieSw / 2.0;
    this.dieSh2 = this.dieSh / 2.0;
    this.dsx = this.dieSw * 1;
    this.dsy = this.dieSh * 1;
    //충돌시 게임종료 및 이미지를 바꾸기위한 상태변수.
    this.die = false;

    // boy
    this.sw = this.img.width / 4;
    this.sh = this.img.height / 4;
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;

    // ix바꾸기 위한 딜레이 변수
    this.walkDelay = 5;

    //canvas에 그려질 사이즈
    this.dsw = this.sw / 1.8;
    this.dsh = this.sh / 1.8;
    this.pause = false;

    this.chapterEnd = null;



  }



  draw(ctx) {
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;
    ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      this.sw,
      this.sh + 5,
      this.x,
      this.y,
      this.dsw,
      this.dsh
    );
    // 보이 중심점 잡기위한 원 그리기
    // ctx.beginPath();
    // ctx.arc(
    //   this.x + this.dsw / 2,
    //   this.y + this.dsh / 2,
    //   this.dsh / 2,
    //   0,
    //   2 * Math.PI
    // );
    // ctx.stroke();
    // 충돌시 보이 이미지 바꾸기 위한 조건문.
    if (this.die) {
      ctx.drawImage(this.img2, this.x, this.y + 20, this.dieSw2, this.dieSh2);
    }
  }


  update(walk, walkDistance) {
    // ix바꿔주기 위한변수.
    this.walkDelay--;

    // 0에도달하면 삼항연산자 실행
    if (this.walkDelay == 0) {
      this.ix = this.ix == 0 ? 2 : 0;
      this.walkDelay = 5;
    }

    this.x += (walk * walkDistance);//문제 정답시 키를 입력받아 움직이게 하기 
    // this.x = tmpScore ;//문제 정답시 키를 입력받아 움직이게 하기 

    // 충돌 좌표를 구하기위한 초기값,공식
    let dx = Dinosaur.x + Dinosaur.dsw / 2;
    let dy = Dinosaur.y + Dinosaur.dsh / 2;

    // 피타고라스 공식 구하기 위한 값 설정.
    let w = dx - (this.x + this.dsw / 2);
    let h = dy - (this.y + this.dsh / 2);

    let d = Math.sqrt(h * h + w * w);
    //반지름의 합

    //여기 조절해서 닿는 모습을 정하기
    let r1r2 = this.dsw / 2 + Dinosaur.dsw / 2 - 55;


    //충돌 시 사라져야 한다.
    if (d <= r1r2) {
      console.log("닿음");
      // 공룡 ix이미지 바꾸기
      Dinosaur.dinovictory();
      

      // console.log(this.chapterEnd);
      if(this.chapterEnd){
        this.chapterEnd();
      }
      

      this.boyDie();
      // 보이 쓰러지는 이미지 바꾸기
      this.outScreenDie();
    }
  }

  // 충돌시 게임종료를 위한 메소드, gamecanvars - pause
  boyDie() {
    this.die = true;
  }

  // 보이이미지 바꿔주기 위한 메소드.
  outScreenDie(){
    this.img = this.img2
  }
}
