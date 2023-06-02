import RacingCanvas from './panel/racing-canvas.js';

window.addEventListener("load",function(){

    const racingCanvas = new RacingCanvas();
    racingCanvas.run();

    // const reader = new FileReader();
    // reader.readAsText

    // const fs = require('fs')
    //     fs.readFile('../problem/problem.txt','utf8' , (err, data) => {
    //         if (err) {
    //           console.error(err)
    //           return
    //         }
    //         console.log(data)
    //       });



    console.log("run");

})