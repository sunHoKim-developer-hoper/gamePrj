import Boy from '../item/boy.js';
import Background from '../item/background.js';
import Enemy from '../item/enemy.js';
import newlec from '../newlec.js';
import ConfirmDLG from '../item/ConfirmDlg.js';

export default class GameCanvas {
  constructor() {
    //가져오는 것은 캔버스 요소
    this.dom = document.querySelector(".game-canvas");
    this.dom.focus(); //포커스를 가지게 해준다.
    /*집단 지성*/
    /**@type {CanvasRenderingContext2D} */
    this.ctx = this.dom.getContext("2d");
 
    this.bg = new Background();
    //함수를 대입하는 것과 함수를 호출하는 것은 다르다.
    //콜백 함수는 나중에 실행해주는 함수
    this.dom.onclick = this.clickHandler.bind(this);
    this.dom.onkeydown = this.keyDownHandler.bind(this);
    this.dom.onkeyup = this.keyUpHandeler.bind(this);
    
    this.boy = new Boy(150, 15);
    this.boy.onNoLife = this.boyNoLifeHandler.bind(this);
    //게임 상태 변수
    
    //일시정지용
    this.pause = false;
    
    // setter가 호출된다.
    this.boy.speed++;
    // getter가 호출된다.
    // console.log(this.boy.speed);
    
    //composition
    // this.enemies= [new Enemy(100,20),new Enemy(50,10), new Enemy(200,30), new Enemy(1,40), new Enemy(500,2), new Enemy(320,3), new Enemy(420,5), new Enemy(600,1)];

    //aggregation -> 좌표의 랜덤값이나 출현하는 딜레이의 랜덤값을 넣어주기 용이해진다.
    this.enemies= [];
    //적기 출현에 대한 delay변수
    this.enemyAppearDelay =60;
    
    newlec.enemies = this.enemies;
    //밖을 벗어나면 사라지게 콜백함수를 정의하는 부분이다.
    // for(let enemy of this.enemies)
    //   enemy.onOutOfScreen =  (en) => {
    //     this.enemies.splice(this.enemies.indexOf(en),1);
    //   };
    
    this.dlg = new ConfirmDLG();
    this.dlg.onclick = this.digClickHandler.bind(this);

    //내가 정의한 이벤트
    this.ongameOver =null;

    }
  

  run() {
    //일시정지
    if (this.pause) //상태가 유지된다?..
        return;
    // 애니메이션 효과를 주기 위한 역할, 지속적으로 활성화되어 있는 함수이다.
    this.update();
    this.draw();
    
    // window.setTimeout(this.run.bind(this),1000);

    // this가 윈도우로 넘어간다. 호출하는 주체가 window이기 때문
    // window.setTimeout(function(){
    //     this.run()
    // },1000);

    // 화살표 함수는 this가 없다, 따라서 외부의 this를 사용한다. 즉 canvasGame의 this가 된다.
    window.setTimeout(() =>
     {
      this.run();
    }, 17);
  }

  update() {
    this.boy.update();
    
    //적기 아래로 이동
    for(let enemy of this.enemies)
      enemy.update();

      this.enemyAppearDelay--;
      if(this.enemyAppearDelay ==0){
        let max = this.dom.width+50;
        let min = -50;
        let x = Math.floor(Math.random() * (max - min)) + min;  //-50 ~ this.dom.width + 50;
        let y = -50;
        let enemy = new Enemy(x,y);
        enemy.onOutOfScreen = this.enemeyOufOfScreenHandler.bind(this);
        this.enemies.push(enemy);
        this.enemyAppearDelay = Math.floor(Math.random() * (60 - 30)) + 30;
      }
  }

  draw() {
    this.bg.draw(this.ctx);
    this.boy.draw(this.ctx);
    for(let enemy of this.enemies)
      enemy.draw(this.ctx);
    this.dlg.draw(this.ctx);
  }

  pause(){
    this.pause = true;
  }

  boyNoLifeHandler(){
    this.dlg.show()
    console.log("No Life");
  }

  //---- event handlers ----
  clickHandler(e) {
  //   //사용자로부터 입력 -> 상태변수 변환 -> 사용자에게 출력
  //   //this.pause = true;
    
  //   //마우스에 어울리지 않는 행위이다.
  //   //this.boy.move(2);
    
  //   //e.x, e.y는 클릭이 발생한 x,y좌표이다. 사용자로부터 입력 -> 상태변수 변환을 하고 -> 사용자에게 출력한다.
  //   this.boy.moveTo(e.x,e.y); 
  //   //this.boy.draw(this.ctx);
  
    //클릭 이벤트가 발생했다고 통지만 한다. 자신이 가진 자식에게는 자신이 통지를 해준다.
    //this.boy.notifyClick(e.x, e.y)
    //for(let enemy of this.enmies){
    // enemy.notifyClick(e.x, e.y)}
     
    this.dlg.notifyClick(e.x, e.y);

  }

  //canvas는 원칙적으로 key값을 안 받게 만들어 놨다. tab키 눌었을 때 입력을 안 받는 요소들은 건너뛴다. tabindex = "0"
  keyDownHandler(e){
    this.boy.move(e.keyCode);
  }

  keyUpHandeler(e){
    this.boy.stop(e.keyCode);
  }

  enemeyOufOfScreenHandler(en){
    this.enemies.splice(this.enemies.indexOf(en),1);
  }

  digClickHandler(id){
    //게임이 끝났어요만 알려준다. 화면을 전환해줘요가 아니다.
    console.log(id);
    if(this.ongameOver) //app이 게임이 끝나면 할 일이 있다고 했나?
      this.ongameOver(123); //app에게 canvas가 끝났음을 알림.
  }



}
// export default GameCanvas;