let dx=2;
let dy = -2;
let BALLRADIUS =20;

//get the canvas element
let canvas=document.getElementById("responsive-canvas");
// call the getContext mathod to draw 2d shape
const context = canvas.getContext("2d");

//set image for the balls
let img= new Image();
img.src = 'Images/closePokeball.png';
img.width=BALLRADIUS;
img.height=BALLRADIUS;

//create ball class
class Pokeball
{
    constructor(x, y, velx, vely)
    {
        this.x = x; //horizontal position
        this.y = y; //vertical position
        this.velx = velx; //velocity x added to coordinate x when we animate our ball
        this.vely = vely; //velocity y added to coordinate x when we animate our ball
        this.img = img; //set pokeball image 
    }

    draw()
    {
        context.beginPath();
        //context.Image=this.img; //fill ball with the image
        context.drawImage(img,this.x,this.y, BALLRADIUS, BALLRADIUS);
        context.fill(); //finish drawing 
    }

    moving()
    {
        //if x and y position is greater or less than canvas than turn to another direction
        if(this.x  >= canvas.width-BALLRADIUS || this.x  <= 0) 
        {
            this.velx = -this.velx;
        }
        if(this.y  >= canvas.height-BALLRADIUS  || this.y  <= 0) 
        {
            this.vely = -this.vely;
        }
        //x and y velocity added to x and y coordinate
        this.x += this.velx;
        this.y +=this.vely;
    }
}

function loop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i< pokeballArray.length; i++)
    {
        pokeballArray[i].draw();
        pokeballArray[i].moving();
    }
}
 function init()
 {
    return setInterval(loop, 50);
 }
 //random number generator
 function random(min, max)
 {
     const num = Math.floor(Math.random() * (max - min +1)) + min;
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



 init();