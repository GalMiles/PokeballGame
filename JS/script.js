
    let dx=2;
    let dy = -2;
    let ballRadius =10;
    let canvas=document.getElementById("responsive-canvas");
    let context = canvas.getContext("2d");
    let img= new Image();
    img.src = 'Images/closePokeball.png';
    img.width=20;
    img.height=20;
    //context.drawImage(img, 0, 0, img.width * window.devicePixelRatio,img.height * window.devicePixelRatio);
    //ctx.fill();
    let x = canvas.width/2;
    let y = canvas.height-30;

      

    class Disk {

        constructor(id, pos_x, pos_y) {
          this.id = id;
          this.pos_x = pos_x;
          this.pos_y = pos_y;
          context.drawImage(img, 0, 0, img.width * window.devicePixelRatio,img.height * window.devicePixelRatio);
          context.fill();
        }

        draw() {
           context.clearRect(this.pos_x, this.pos_y, img.width, img.height);
           context.drawImage(img, this.pos_x, this.pos_y, img.width * window.devicePixelRatio,img.height * window.devicePixelRatio);
           context.fill();
           this.pos_y += dy;
           this.pos_x += dx;
           if(this.pos_x + dx > canvas.width-20 || this.pos_x + dx < 0) 
           {
               dx = -dx;
           }
           if(this.pos_y + dy < 0 || this.pos_y + dy > canvas.height-20) 
           {
               dy = -dy;
            }
        } 

        init() {
            return setInterval(this.draw(), 50);
        }
        
    }

    let pokeball1 = new Disk(1, canvas.height/2 , 0);
    pokeball1.init();
    //let pokeball2 = new Disk(1, canvas.height/2 , canvas.width);
    //pokeball2.init();
    //let pokeball3 = new Disk(1, 0 , canvas.width/2);
    //pokeball3.init();
    //let pokeball4 = new Disk(1, canvas.height , canvas.width/2); 
    pokeball4.init();
