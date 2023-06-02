class Dinosaur {
  constructor() {
    this.dinosaur = document.querySelector(".dinosaur");
    // 좌표
    this.x = 0 - 140;
    this.y = 405;
    // 이미지 0~4
    this.ix = 2;
    this.iy = 0;

    this.sw = this.dinosaur.width/4;
    this.sh = this.dinosaur.height;
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;

    
    this.walkDelay = 1;
    
    //canvas에 그려질 사이즈
    this.dsw = this.sw;
    this.dsh = this.sh;
    // this.dsw = this.sw/1.6;
    // this.dsh = this.sh/1.6;

    //충돌시 이미지 바꾸기위한 상태변수.
    this.victory = false;
  }

  // set x(x){
  //     this.x = x;
  // }
  // set y(y){
  //     this.y = y;
  // }


  
  update(){
    //공룡 ix을 바꾸기 위한 딜레이.
    this.walkDelay --;
    if(this.walkDelay == 0){
      this.ix = this.ix == 1 ? 0:1;
      this.walkDelay =1;
   
    }
    
    //게임 시간은 2분내
    // 950 /2
    // 475 / 60
    // 7.92 / 60
    // 0.132 가 2분동안 950 픽셀만큼 이동 / 

    // 950픽셀 /90초
    // 초당 10.6
    // 프레임당 0.62

    // this.x += 0.132;//난이도별 값 대입. 2분초과
    this.x += 0.62;//난이도별 값 대입. 33초
    // this.x += 0.31;//난이도별 값 대입. 예상 66초
    // this.x += 0.21;//난이도별 값 대입. 예상 99초
    // this.x += 1.5;//난이도별 값 대입. 33초
    
    // this.x += 5.5;//난이도별 값 대입. 33초
    

    //충돌시 공룡 이미지 v로 바꿔주기
    if(this.victory){
      this.ix = 3;
    }


  }
  // 그리기
  draw(ctx) {
    this.sx = this.sw * this.ix;
    this.sy = this.sh * this.iy;

    ctx.drawImage(
      this.dinosaur,
      this.sx, this.sy, this.sw, this.sh,
      this.x, this.y, this.dsw, this.dsh
      );
    //공룡 중심점 잡기 위한 원그리기.
    // ctx.beginPath();
    // ctx.arc(this.x + this.dsw/2, this.y+this.dsh/2,this.dsh/2,0,2*Math.PI);
    // ctx.stroke();
  }
  //충돌시 이미지 바꾸기위한 메소드.
  dinovictory(){
    this.victory =true;
  }
}

//싱글톤 패턴
export default new Dinosaur();