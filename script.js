var player = {
	left:450,
	top:620
}
var enemies = [
	{left:650, top:100},
	{left:350, top:400},
	{left:100, top:220},
	{left:100, top:100},
	{left:450, top:250}
]
var velY = 0,
    velX = 0,
    speed = 2, // max speed
    friction = 0.98, // friction
    keys = [];
var missiles =[];
var shotsfired=0;
function drawPlayer(){
	var content = "<div class='player' style='left:" +player.left + "px; top:" + player.top + "px;'></div>";
	document.getElementById('players').innerHTML = content;
}
document.onkeydown = function(e){
	// console.log(e.keyCode);
	
	// if(e.keyCode == 39){
	// 	player.left=player.left+5

	// }
	// if(e.keyCode == 37){
	// 	player.left=player.left-5

	// }
	// if(e.keyCode == 38){

	// 	player.top=player.top-5
	// 	if(player.top<450){
	// 		player.top=player.top+5;
	// 	}
	// }
	// if(e.keyCode == 40){
	// 	player.top=player.top+5

	// }
	if (keys[38]) {
        if (velY > -speed) {
            velY--;
        }
    }
    
    if (keys[40]) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keys[39]) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys[37]) {
        if (velX > -speed) {
            velX--;
        }
    }
	if(e.keyCode == 32){
		shotsfired=shotsfired+1;
		missiles.push({left: (player.left +35) ,top: (player.top)});
		document.getElementById('shots').innerHTML = "<strong>Total Shots: " + shotsfired + "</strong>";
	}
    velY *= friction;
    player.top += velY;
    velX *= friction;
    player.left += velX;

}
function drawEnemies(){
	var content1='';
	for(var i = 0; i<enemies.length;i++)
	{
	content1+= "<div class='enemy' style='left:" +enemies[i].left + "px; top:" + enemies[i].top + "px;'></div>";
	//var content2 = "<div class='enemy1' style='left:" +enemies[1].left + "px; top:" + enemies[1].top + "px;'></div>";
	document.getElementById('enemies').innerHTML = content1;
	}
}
function drawMissile(){
	var content='';
	for(var i = 0; i<missiles.length;i++){
	content+= "<div class='missile' style='left:" +missiles[i].left + "px; top:" + missiles[i].top + "px;'></div>";
	document.getElementById('missiles').innerHTML = content;
	}
}
function moveEnemies(){   
	for(var i = 0; i<enemies.length;i++)
	{
	enemies[i].top= enemies[i].top+.1;
	}
}
function moveMissiles(){
	
	for(var i = 0; i<missiles.length;i++)
	{
		missiles[i].top=missiles[i].top-1;
		if(missiles[i].top<0){
			missiles.splice(i,1);
		}
	}
}
var kills = 0;
function checkImpact(){

	for(var i = 0; i<missiles.length;i++)
	{
		for(var x = 0; x<enemies.length;x++){
			if(missiles[i].left >= enemies[x].left-35 && missiles[i].left <= enemies[x].left+35 && missiles[i].top <= enemies[x].top) //strange collision bug plz help
			{ 
				enemies.splice(x,1);
				kills+=1;
				document.getElementById('kills').innerHTML= "kills: "+kills;
			}
		}		
	}
}
function gameLoop(){
	drawPlayer();
	moveEnemies();
	drawEnemies();
	drawMissile();
	moveMissiles();
	checkImpact();
	setTimeout(gameLoop, 10);
}
gameLoop();
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});