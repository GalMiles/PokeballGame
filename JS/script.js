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
let start_btn = document.getElementById("start_btn");
let pause_btn = document.getElementById("pause_btn");
let reset_btn = document.getElementById("reset_btn");

start_btn.addEventListener('click', handle_start );
pause_btn.addEventListener('click', handle_pause );
reset_btn.addEventListener('click', handle_reset );

//set image for the balls
let img_close= new Image();
let img_open = new Image();

img_close.src = 'Images/closePokeball.png';
img_open.src = 'Images/openPokeball.png';

img_close.width=BALLRADIUS;
img_close.height=BALLRADIUS;
img_open.width=BALLRADIUS;
img_open.height=BALLRADIUS;

//create ball class
class Pokeball
{
    constructor(x, y, velx, vely)
    {
        this.x = x; //horizontal position
        this.y = y; //vertical position
        this.velx = velx; //velocity x added to coordinate x when we animate our ball
        this.vely = vely; //velocity y added to coordinate x when we animate our ball
        this.img = img_close; //set pokeball image 
        this.exploded= false;
        this.size = BALLRADIUS;
        this.initSize = this.size;
        this.explosionSize = 5;
        this.color="white";
    }

    draw()
    {
        if(!this.exploded)
        {
            context.beginPath();
            context.drawImage(this.img,this.x,this.y, this.img.width, this.img.height);
            context.fill(); //finish drawing
            context.closePath();
        }
    }

    moving()
    {
        this.x += this.velx;
        this.y +=this.vely;
        //if x and y position is greater or less than canvas than turn to another direction
        if(this.x  >= canvas.width-BALLRADIUS || this.x  <= 0) 
            this.velx = -this.velx;
        if(this.y  >= canvas.height-BALLRADIUS  || this.y  <= 0) 
            this.vely = -this.vely;
        //x and y velocity added to x and y coordinate
        this.draw();
        if (this.exploded) 
        {
            if (this.size > 0) {
              this.explosionSize += (1 / this.explosionSize) * 10;
              this.size-=0.05
              this.img.width -= 0.05;
              this.img.height-= 0.05;
            } 
            else 
            {
              pokeballArray.splice(pokeballArray.indexOf(this), 1);
            }

            context.beginPath();
            context.arc(this.x, this.y, this.explosionSize, 0, Math.PI * 2);
        
            for (let i = 0; i < pokeballArray.length; ++i) {
              let pokeball = pokeballArray[i];
              if (!pokeball.exploded) 
              {
                let a = this,
                  b = pokeball;
                let distX = a.x - b.x,
                  distY = a.y - b.y,
                  dist = Math.sqrt(distX * distX + distY * distY);
                if (dist <= this.size)  
                    pokeballArray[i].explode();
              }
            }

            context.strokeStyle = this.color;
            context.stroke();
            context.closePath();
        }
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
        pokeballArray[i].moving();
}

function loop(){
    show_pokeballs();
    let i=0;
    let j=1;
    while (i< pokeballArray.length)
    {
        while(j < pokeballArray.length && !pokeballArray[i].exploded)
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
                    pokeballArray[i].velx=pokeballArray[i].vely=0;
                    //pokeballArray.pop(pokeballArray[i]); //remove the ball from the array
                }
                else
                {
                    pokeballArray[j].exploded=true;
                    show_pokeballs();
                    pokeballArray[j].velx=pokeballArray[j].vely=0;
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
    while (pokeballArray.length < POKEBALLS_AMOUNT)
    {
        //create a new instance of a ball
        const pokeball = new Pokeball(
        random(BALLRADIUS, canvas.width - BALLRADIUS), 
        random(BALLRADIUS, canvas.height- BALLRADIUS), 
        random(-2,2), 
        random(2,2));
        pokeballArray.push(pokeball);
    }
    inGame = true;
    anim();
}

function anim(time_in_seconds) 
{
  if (inGame) 
    window.requestAnimationFrame(anim);
  loop();
  if (pokeballArray.length === 1 || time_in_seconds) 
    gameOver();
}

function gameOver() {
  inGame = false;
}

function handle_start(time_in_seconds){
    init();
}
function handle_pause(){

}
function handle_reset(){
    gameOver();
    init();
}

init();


 