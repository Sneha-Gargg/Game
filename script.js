const score=document.querySelector('.score');
const startscreen=document.querySelector('.startscreen');
const gamearea=document.querySelector('.gamearea');

let player={
    speed:5,
    score:0
};
let highest=0;

startscreen.addEventListener('click',start);

let keys={
    arrowup:false,
    arrowdown:false,
    arrowleft:false,
    arrowright:false
};

//press keys=keyup
//release keys=keydown
document.addEventListener('keydown',keydown);
document.addEventListener('keyup',keyup);
function keydown(ev){
    ev.preventDefault();       //to prevent the refresh of page
    keys[ev.key.toLowerCase()]= true;
    //console.log(keys);
}
function keyup(ev){
    ev.preventDefault();
    keys[ev.key.toLowerCase()]=false;
}

function gameplay(){
    let car = document.querySelector('.car');
    let road = gamearea.getBoundingClientRect();
    //console.log(road);

    if (player.start){
        movelines();
        moveenemycar(car);
        if (keys.arrowup && player.y>(road.top+70)){
            player.y-=player.speed;
        }
        if (keys.arrowdown && player.y<(road.bottom-70)){
            player.y+=player.speed;
        }
        if (keys.arrowleft && player.x>0){
            player.x-=player.speed;
        }
        if (keys.arrowright && player.x<(road.width-50)){
            player.x+=player.speed;
        }

        car.style.top=player.y + 'px';
        car.style.left=player.x + 'px';

        window.requestAnimationFrame(gameplay);
        player.score++;
        if(player.score>=highest){
            highest=player.score;
        }
        score.innerHTML=" Your score:"+player.score+"<br><br>"+"Highest score:"+highest;

    }
}


function start(){
    startscreen.classList.add('hide');
    gamearea.innerHTML = ''; // Clear previous game elements if any
    player.score=0;

    player.start=true;
    player.x = gamearea.offsetWidth / 2;
    player.y = gamearea.offsetHeight - 100;

    let car=document.createElement('div');
    car.setAttribute('class','car');
    gamearea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log(player.x);
    // console.log(player.y);

    car.style.left = player.x + 'px';
    car.style.top = player.y + 'px';

    createlines();

    window.requestAnimationFrame(gameplay);

    for(x=0;x<3;x++){
        let enemycar=document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y = ((x+1)*350)*(-1);
        enemycar.style.top = enemycar.y+ 'px';
        enemycar.style.left=Math.floor(Math.random()*350)+'px';
        gamearea.appendChild(enemycar);
    }
   
}

function createlines(){
    for (x=0;x<5;x++){
        let roadline=document.createElement('div');
        roadline.setAttribute('class','lines');
        roadline.y=(x*140);
        roadline.style.top=roadline.y+'px';
        gamearea.appendChild(roadline);
        //roadline.y=x*140;
    }
}

function movelines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y>=646){
            item.y-=700;
        }
        item.y += player.speed;
        item.style.top=item.y + 'px';
    });
}


function moveenemycar(car){
    let other=document.querySelectorAll('.enemy');
    other.forEach(function (item){
        if(iscollide(car,item)){
            console.log('HIT');
            endgame();
        }
        if (item.y>=657){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*350)+'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';
    })
}

function iscollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));
}

function endgame(){
    
    player.start=false;
    startscreen.classList.remove('hide');
}

function reset(){
    highest=0;
}