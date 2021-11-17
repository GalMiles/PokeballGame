
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

   
    let dx=2;
    let dy = -2;
    let ballRadius =20;
    
    let x = canvas.width/2;
    let y = canvas.height-30;

    function createDisk() {
  
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath()
    }
  

    class Disk{
        constructor(x, y, radius, sAngle,eAngle, speed,color ){
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.sAngle - sAngle;
            this.eAngle = eAngle;
            this.speed = speed;
            this.color = color;
        }
    }

    function prog(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createDisk();
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

