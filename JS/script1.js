//global vairable
let g_state = {};
g_state.dx=2;
g_state.dy = -2;
g_state.BALLRADIUS =20;
g_state.is_close=true;
g_state.POKEBALLS_AMOUNT = 4;
g_state.id;
g_state.inGame = false;
g_state.pokeballArray =[];
g_state.timer_id = null;
g_state.is_timer_mode = true; //check if we in timer or not
 

//get the canvas element
g_state.canvas=document.getElementById("responsive-canvas");
// call the getContext mathod to draw 2d shape
g_state.context = g_state.canvas.getContext("2d");
g_state.img = document.querySelector("img");

g_state.btn_start = document.querySelector( '#btn_start');
g_state.btn_start.addEventListener( 'click', handle_start);
		
g_state.btn_pause = document.querySelector( '#btn_pause');
g_state.btn_pause.addEventListener( 'click', handle_pause);

g_state.btn_reset = document.querySelector( '#btn_reset');
g_state.btn_reset.addEventListener( 'click', handle_reset);

g_state.timer = document.querySelector( '#ftime');
g_state.timer_value = g_state.timer.value; //getting timer value


//set image for the balls
g_state.img_close1= new Image();
g_state.img_close2= new Image();
g_state.img_close3= new Image();
g_state.img_close4= new Image();

g_state.img_close1.src = 'Images/closePokeball.png';
g_state.img_close2.src = 'Images/closePokeball.png';
g_state.img_close3.src = 'Images/closePokeball.png';
g_state.img_close4.src = 'Images/closePokeball.png';

g_state.img_close1.width=g_state.img_close1.height=g_state.BALLRADIUS;
g_state.img_close2.width=g_state.img_close2.height=g_state.BALLRADIUS;
g_state.img_close3.width=g_state.img_close3.height=g_state.BALLRADIUS;
g_state.img_close4.width=g_state.img_close4.height=g_state.BALLRADIUS;


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
        this.size = g_state.BALLRADIUS;
        this.initSize = this.size;
        this.explosionSize = 10;
        this.color="white";
    }

    draw()
    {
        g_state.context.beginPath();
        g_state.context.drawImage(this.img,this.x,this.y, this.img.width, this.img.height);
        g_state.context.fill(); //finish drawing
        g_state.context.closePath();
    }

    moving()
    {
        if (!this.exploded)
        {
            this.x += this.velx;
            this.y +=this.vely;
            //if x and y position is greater or less than canvas than turn to another direction
            if(this.x  >= g_state.canvas.width-g_state.BALLRADIUS || this.x  <= 0) 
                this.velx = -this.velx;
            if(this.y  >= g_state.canvas.height-g_state.BALLRADIUS  || this.y  <= 0) 
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
                g_state.pokeballArray.splice(g_state.pokeballArray.indexOf(this), 1);
                
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
    destroying(){
       delete this.x; 
       delete this.y; 
       delete this.velx; 
       delete this.vely; 
       delete this.img;  
       delete this.exploded;
       delete this.size;
       delete this.initSize;
       delete this.explosionSize;
       delete this.color;
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
    g_state.context.clearRect(0, 0, g_state.canvas.width, g_state.canvas.height);
    for(let i=0; i< g_state.pokeballArray.length; i++)
    {
        g_state.pokeballArray[i].moving();
        g_state.pokeballArray[i].draw();
    }
}

function loop(){
    show_pokeballs();
    let i=0;
    let j=1;
    while (i< g_state.pokeballArray.length)
    {
        while(j < g_state.pokeballArray.length && !g_state.pokeballArray[i].exploded )
        {
            let thisball = g_state.pokeballArray[j];
            if(g_state.pokeballArray[i].x > thisball.x && g_state.pokeballArray[i].x < thisball.x + g_state.BALLRADIUS && g_state.pokeballArray[i].y > thisball.y && g_state.pokeballArray[i].y < thisball.y + g_state.BALLRADIUS)
            {
                    //there is hit between two pokeballs
                    //the slower will explode and the faster will change diretion
                    
                if(Math.abs(g_state.pokeballArray[i].velx)+Math.abs(g_state.pokeballArray[i].vely) < Math.abs(g_state.pokeballArray[j].velx)+Math.abs(g_state.pokeballArray[j].vely))
                {
                    g_state.pokeballArray[i].exploded=true;
                    show_pokeballs();
                    g_state.context.beginPath();
                    g_state.context.arc(g_state.pokeballArray[i].x, g_state.pokeballArray[i].y, g_state.pokeballArray[i].explosionSize, 0, Math.PI * 2);
                    g_state.context.strokeStyle = pokeballArray[i].color;
                    g_state.context.stroke();
                    g_state.context.closePath();
                    //pokeballArray.pop(pokeballArray[i]); //remove the ball from the array
                }
                else
                {
                    g_state.pokeballArray[j].exploded=true;
                    show_pokeballs();
                    g_state.context.beginPath();
                    g_state.context.arc(g_state.pokeballArray[j].x, g_state.pokeballArray[j].y, g_state.pokeballArray[j].explosionSize, 0, Math.PI * 2);
                    g_state.context.strokeStyle = g_state.pokeballArray[j].color;
                    g_state.context.stroke();
                    g_state.context.closePath();
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
    g_state.context.fillRect(0, 0, g_state.canvas.width, g_state.canvas.height);
    const pokeball1 = new Pokeball(
        random(g_state.BALLRADIUS, g_state.canvas.width - g_state.BALLRADIUS), 
        random(g_state.BALLRADIUS, g_state.canvas.height- g_state.BALLRADIUS), 
        random(-2,2), 
        random(2,2), g_state.img_close1);
    g_state.pokeballArray.push(pokeball1);

    const pokeball2 = new Pokeball(
        random(g_state.BALLRADIUS, g_state.canvas.width - g_state.BALLRADIUS), 
        random(g_state.BALLRADIUS, g_state.canvas.height- g_state.BALLRADIUS), 
        random(-2,2), 
        random(2,2), g_state.img_close2);
    g_state.pokeballArray.push(pokeball2);

    const pokeball3 = new Pokeball(
        random(g_state.BALLRADIUS, g_state.canvas.width - g_state.BALLRADIUS), 
        random(g_state.BALLRADIUS, g_state.canvas.height- g_state.BALLRADIUS), 
        random(-2,2), 
        random(2,2), g_state.img_close3);
    g_state.pokeballArray.push(pokeball3);

    const pokeball4 = new Pokeball(
        random(g_state.BALLRADIUS, g_state.canvas.width - g_state.BALLRADIUS), 
        random(g_state.BALLRADIUS, g_state.canvas.height- g_state.BALLRADIUS), 
        random(-2,2), 
        random(2,2), g_state.img_close4);
    g_state.pokeballArray.push(pokeball4);



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
    g_state.inGame = true;
    anim();
}

function anim() 
{
  if (g_state.inGame) 
    window.requestAnimationFrame(anim);
  loop();
  if (g_state.pokeballArray.length === 1 || !g_state.is_timer_mode) {
    let message = document.querySelector( '#message');
    message.style.display = 'block';
    game_over();
   }
}
function game_over() {
    g_state.inGame = false;
    g_state.is_timer_mode = false;
    clearInterval(g_state.timer_id);
}

function handle_start()
{
    if ( !g_state.timer_id ){

        let message = document.querySelector( '#message');
        message.style.display = 'none';
        g_state.timer_value = g_state.timer.value; //getting timer value from input
        init();
        g_state.timer_id = window.setInterval(  handle_tick, 1000 )  
    }
    g_state.is_timer_mode = true;
}

function handle_pause()
{
    if(!g_state.timer_id) return;

    g_state.is_timer_mode = false
    //clear canvas;
}

function handle_reset()
{
    if(!g_state.timer_id || g_state.is_timer_mode ) return;

    let message = document.querySelector( '#message');
    message.style.display = 'none';
    g_state.context.clearRect(0, 0, g_state.canvas.width, g_state.canvas.height);
    g_state.is_timer_mode = false;
    clearInterval(g_state.timer_id);
    g_state.timer_id =  null;
    killing_pokeballs();
    
}

//decending timer value
function handle_tick()
{
	if ( !g_state.timer_value) {
        game_over();
    }

    else{
        g_state.timer_value--;
    }
}
function killing_pokeballs(){
    for(let i=0; i< g_state.pokeballArray.length; i++)
    {
        g_state.pokeballArray[i].destroying();
    }
    g_state.pokeballArray=[];

}





 