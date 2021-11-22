let dx=2;
let dy = -2;
let BALLRADIUS =20;
let is_close=true;
let POKEBALLS_AMOUNT = 4;
let id;
let inGame = false;
const pokeballArray =[];


//get the canvas element
let canvas=document.getElementById("responsive-canvas");
// call the getContext mathod to draw 2d shape
const context = canvas.getContext("2d");
let img = document.querySelector("img");

//set image for the balls
let img_close1= new Image();
let img_close2= new Image();
let img_close3= new Image();
let img_close4= new Image();
//let img_open = new Image();

img_close1.src = 'Images/closePokeball.png';
img_close2.src = 'Images/closePokeball.png';
img_close3.src = 'Images/closePokeball.png';
img_close4.src = 'Images/closePokeball.png';
//img_open.src = 'Images/openPokeball.png';

img_close1.width=img_close1.height=BALLRADIUS;
img_close2.width=img_close2.height=BALLRADIUS;
img_close3.width=img_close3.height=BALLRADIUS;
img_close4.width=img_close4.height=BALLRADIUS;

// img_open.width=BALLRADIUS;
// img_open.height=BALLRADIUS;

//create ball class
class Pokeball
{
    constructor(x, y, velx, vely, imgPoke)
    {
        this.x = x; //horizontal position
        this.y = y; //vertical position
        this.velx = velx; //velocity x added to coordinate x when we animate our ball
        this.vely = vely; //velocity y added to coordinate x when we animate our ball
        this.img = imgPoke; //set pokeball image 
        this.exploded= false;
        this.size = BALLRADIUS;
        this.initSize = this.size;
        this.explosionSize = 10;
        this.color="white";
    }

    draw()
    {
            context.beginPath();
            context.drawImage(this.img,this.x,this.y, this.img.width, this.img.height);
            context.fill(); //finish drawing
            context.closePath();
    }

    moving()
    {
        if (!this.exploded)
        {
            this.x += this.velx;
            this.y +=this.vely;
            //if x and y position is greater or less than canvas than turn to another direction
            if(this.x  >= canvas.width-BALLRADIUS || this.x  <= 0) 
                this.velx = -this.velx;
            if(this.y  >= canvas.height-BALLRADIUS  || this.y  <= 0) 
                this.vely = -this.vely;
        }
        else
        {
            if (this.size > 0) 
            {
                this.explosionSize += (1 / this.explosionSize) * 10;
                this.size-=0.005
                this.img.width -= 0.0005;
                this.img.height-= 0.0005;
            } 
            else 
            {
                this.velx=this.vely=0;
                pokeballArray.splice(pokeballArray.indexOf(this), 1);
                
            }
        }
        //x and y velocity added to x and y coordinate
        this.draw();
    }

    explosion()
    {
        this.exploded = true;
        this.valx = this.valy = 0;
    }
}

//  let  Countdown = function(endDate, exp_ball) {

//     this.updateCountdown = function() {
//         let currentMoment = Date.now();
//         if (currentMoment < endDate)
//         {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             exp_ball.explosion();
//             show_pokeballs();
//         }
//         else {
//             clearInterval(self.interval);
//             exp_ball.x=0;
//             exp_ball.y=0;
//         }
//     }
  
//     let interval = setInterval(this.updateCountdown, 100);
// }

function show_pokeballs()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i< pokeballArray.length; i++)
    {
        pokeballArray[i].moving();
        pokeballArray[i].draw();
    }
}

function loop(){
    show_pokeballs();
    let i=0;
    let j=1;
    while (i< pokeballArray.length)
    {
        while(j < pokeballArray.length && !pokeballArray[i].exploded )
        {
            let thisball = pokeballArray[j];
            if(pokeballArray[i].x > thisball.x && pokeballArray[i].x < thisball.x + BALLRADIUS && pokeballArray[i].y > thisball.y && pokeballArray[i].y < thisball.y + BALLRADIUS)
            {
                    //there is hit between two pokeballs
                    //the slower will explode and the faster will change diretion
                    
                if(Math.abs(pokeballArray[i].velx)+Math.abs(pokeballArray[i].vely) < Math.abs(pokeballArray[j].velx)+Math.abs(pokeballArray[j].vely))
                {
                    pokeballArray[i].exploded=true;
                    show_pokeballs();
                    context.beginPath();
                    context.arc(pokeballArray[i].x, pokeballArray[i].y, pokeballArray[i].explosionSize, 0, Math.PI * 2);
                    context.strokeStyle = pokeballArray[i].color;
                    context.stroke();
                    context.closePath();
                    //pokeballArray.pop(pokeballArray[i]); //remove the ball from the array
                }
                else
                {
                    pokeballArray[j].exploded=true;
                    show_pokeballs();
                      context.beginPath();
                      context.arc(pokeballArray[j].x, pokeballArray[j].y, pokeballArray[j].explosionSize, 0, Math.PI * 2);
                      context.strokeStyle = pokeballArray[j].color;
                      context.stroke();
                      context.closePath();
                    //pokeballArray.pop(pokeballArray[j]); //remove the ball from the array
                }
            }
            j++;
        }
        i++;
    }
}

 //random number generator
 function random(min, max)
 {
    let num =Math.floor(Math.random() * (max - min +1)) + min;
     return num;
 }

function init() {
    context.fillRect(0, 0, canvas.width, canvas.height);
    const pokeball1 = new Pokeball(
        random(BALLRADIUS, canvas.width - BALLRADIUS), 
        random(BALLRADIUS, canvas.height- BALLRADIUS), 
        random(-2,2), 
        random(2,2), img_close1);
    pokeballArray.push(pokeball1);
    const pokeball2 = new Pokeball(
        random(BALLRADIUS, canvas.width - BALLRADIUS), 
        random(BALLRADIUS, canvas.height- BALLRADIUS), 
        random(-2,2), 
        random(2,2), img_close2);
    pokeballArray.push(pokeball2);
    const pokeball3 = new Pokeball(
        random(BALLRADIUS, canvas.width - BALLRADIUS), 
        random(BALLRADIUS, canvas.height- BALLRADIUS), 
        random(-2,2), 
        random(2,2), img_close3);
    pokeballArray.push(pokeball3);
    const pokeball4 = new Pokeball(
        random(BALLRADIUS, canvas.width - BALLRADIUS), 
        random(BALLRADIUS, canvas.height- BALLRADIUS), 
        random(-2,2), 
        random(2,2), img_close4);
    pokeballArray.push(pokeball4);



    // while (pokeballArray.length < POKEBALLS_AMOUNT)
    // {
    //     //create a new instance of a ball
    //     const pokeball = new Pokeball(
    //     random(BALLRADIUS, canvas.width - BALLRADIUS), 
    //     random(BALLRADIUS, canvas.height- BALLRADIUS), 
    //     random(-2,2), 
    //     random(2,2));
    //     pokeballArray.push(pokeball);
    // }
    inGame = true;
    anim();
}

function anim() 
{
  if (inGame) 
    window.requestAnimationFrame(anim);
  loop();
  if (pokeballArray.length === 1) //ifirst problem need to fix
    gameOver();
}
function gameOver() {
  inGame = false;
}

init();


 