
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

   
    let dx=2;
    let dy = -2;
    let ballRadius =20;
    
    let x = canvas.width/2;
    let y = canvas.height-30;

    function createBall1() {
  
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath()
    }
  

    function prog(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createBall1();
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
           dy = -dy;
        }
    
        y += dy;
        x += dx;

    }
    setInterval(prog, 10);

