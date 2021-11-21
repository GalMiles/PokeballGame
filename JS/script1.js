let dx=2;
let dy = -2;
let BALLRADIUS =20;
let is_close=true;

//get the canvas element
let canvas=document.getElementById("responsive-canvas");
// call the getContext mathod to draw 2d shape
const context = canvas.getContext("2d");
let img = document.querySelector("img");

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
    }

    draw()
    {
        if(!this.exploded)
        {
            context.beginPath();
            context.drawImage(this.img,this.x,this.y, this.img.width, this.img.height);
            context.fill(); //finish drawing
            
        }

    }

    moving()
    {
        if (!this.exploded)
        {
            //if x and y position is greater or less than canvas than turn to another direction
            if(this.x  >= canvas.width-BALLRADIUS || this.x  <= 0) 
                this.velx = -this.velx;
            if(this.y  >= canvas.height-BALLRADIUS  || this.y  <= 0) 
                this.vely = -this.vely;
            //x and y velocity added to x and y coordinate
            this.x += this.velx;
            this.y +=this.vely;
            
        }
    }

    explosion()
    {

        if (is_close)
        {
            this.img=img_open;
            //this.draw();
            is_close=false;
        }
        else
        {
            this.img=img_close;
            //this.draw();
            is_close=true;
        }
    }
}

 let  Countdown = function(endDate, exp_ball) {

    this.updateCountdown = function() {
        let currentMoment = Date.now();
        if (currentMoment < endDate)
        {
            context.clearRect(0, 0, canvas.width, canvas.height);
            exp_ball.explosion();
            show_pokeballs();
        }
        else {
            clearInterval(self.interval);
            exp_ball.x=0;
            exp_ball.y=0;
        }
    }
  
    let interval = setInterval(this.updateCountdown, 100);
}

function show_pokeballs()
{
    for(let i=0; i< pokeballArray.length; i++)
    {
        pokeballArray[i].draw();
        pokeballArray[i].moving();
    }
}

function loop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    show_pokeballs();
    let i=0;
    let j=1;
    let timerId =null;
    while (i< pokeballArray.length)
    {
        while(j < pokeballArray.length && !pokeballArray[i].exploded)
        {
            if (!pokeballArray[j].exploded)
            {
                let thisball = pokeballArray[j];
                if(pokeballArray[i].x > thisball.x && pokeballArray[i].x < thisball.x + BALLRADIUS && pokeballArray[i].y > thisball.y && pokeballArray[i].y < thisball.y + BALLRADIUS)
                {
                    if(random(0,1))
                    {
                        
                        let countdown = new Countdown(Date.now()+500, pokeballArray[i]);
                        pokeballArray[i].velx=0;
                        pokeballArray[i].vely=0;

                        pokeballArray[i].exploded=true;
                        
                        pokeballArray[j].velx= -pokeballArray[j].velx;
                        pokeballArray[j].vely= -pokeballArray[j].vely;
                    }
                    else
                    {
                        let countdown = new Countdown(Date.now()+500, pokeballArray[j]);
                        pokeballArray[j].velx=0;
                        pokeballArray[j].vely=0;
                        pokeballArray[j].exploded=true; 
                        
                        pokeballArray[i].velx= -pokeballArray[i].velx;
                        pokeballArray[i].vely= -pokeballArray[i].vely;
                            
                    }
                    break;
                }
            }
            j++;
        }
        i++;
    }
}
 function init()
 {
    return setInterval(loop, 50);
 }

 //random number generator
 function random(min, max)
 {
    let num =Math.floor(Math.random() * (max - min +1)) + min;
    // while (num==0)
    // {
    //    num = Math.floor(Math.random() * (max - min +1)) + min;
    // }
     return num;
 }

const pokeballArray =[];

while (pokeballArray.length <4)
{
    //create a new instance of a ball
    const pokeball = new Pokeball(
        random(BALLRADIUS, canvas.width - BALLRADIUS), 
        random(BALLRADIUS, canvas.height- BALLRADIUS), 
        random(-5,5), 
        random(-5,5));
    pokeballArray.push(pokeball);
}

function start(){
    init();
}
function pause(){

}
function reset(){

}
 //init();

 