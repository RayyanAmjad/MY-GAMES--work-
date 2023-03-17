var sand,sandbg;
var cowboy, cowboyimg
var zombie, zombieimg
var bullet,bulletimg
var zombieGroup,bulletGroup;
var wall;
var deadcowboyimg
var zombiedeadimg
var lives; 

var PLAY = 1;
var END = 0;
var gamestate = PLAY;






function preload(){
    sand = loadImage("IMAGES/SAND.jpg")
    cowboyimg = loadAnimation("IMAGES/COWBOY.png")
    zombieimg = loadAnimation("IMAGES/zombies1.png","IMAGES/zombies2.png","IMAGES/zombies3.png","IMAGES/zombies4.png","IMAGES/zombies5.png","IMAGES/zombies6.png")
bulletimg = loadImage("IMAGES/BULLET.png")
deadcowboyimg = loadAnimation("IMAGES/DEAD_COWBOY.png")
zombiedeadimg = loadAnimation("IMAGES/zombie_dead.png")

}

function setup() {
  createCanvas(1000,1000);

  sandbg = createSprite(200,200,5000,1000);
  sandbg.addImage(sand);
  sandbg.scale = 3;

  cowboy = createSprite(100,500,100,100);
  cowboy.addAnimation("cowboy", cowboyimg);
  cowboy.addAnimation("deadcowboy", deadcowboyimg);
  cowboy.scale = 0.3

  zombieGroup = createGroup()
  bulletGroup = createGroup()
  

score = 0;
lives = 3;

wall = createSprite(200,365,100,1500);
wall.scale=0.5;
wall.shapeColor = "brown";
//wall.setCollider(rect)
wall.debug = true;
  

  
}

function draw() {
  
  background(255);

  if(gamestate===PLAY){

  if(keyDown(UP_ARROW)){
    cowboy.y = cowboy.y -10;
  }

  if(keyDown(DOWN_ARROW)){
    cowboy.y = cowboy.y +10;
  }

  if(keyDown(RIGHT_ARROW)){
    spawnBullet();
  }

  if(bulletGroup.isTouching(zombieGroup)){
 zombieDestroy();
 bulletGroup.destroyEach();
 score = score+1
// zombie.changeAnimation("deadzombie", zombiedeadimg);
 //zombie.velocityY = 0;
  }

  spawnZombie();

  if(wall.isTouching(zombieGroup)){
  lifeover()
  zombieDestroy();
  }
 if(lives === 0){
  gamestate = END;
 }


}
else if(gamestate===END){
cowboy.changeAnimation("deadcowboy", deadcowboyimg);

zombieGroup.lifetime = 5;


}






  drawSprites();
  fill("red");
  textSize(30)
  text("Score: "+ score, 850,50);

  fill("blue");
  text("lives: " + lives,100,50);

  
  

}

function spawnZombie(){
  if(frameCount % 80 === 0){
  zombie = createSprite(1000,500,20,20);
  zombie.y = Math.round(random(100,600));
  zombie.addAnimation("zombies",zombieimg);
  zombie.addAnimation("deadzombie", zombiedeadimg)
  zombie.velocityX = -6;
  zombie.scale = 0.9;
  zombie.lifetime = 150;
  zombie.debug = true;
  zombieGroup.add(zombie)
  
  }
 
}

function spawnBullet(){
  bullet = createSprite(0,0,0,0);
  bullet.addImage(bulletimg);
  bullet.y = cowboy.y;
  bullet.x = cowboy.x;
  bullet.velocityX = 10;
  bullet.scale = 0.09;
  bulletGroup.add(bullet);
  
}
function zombieDestroy(){
  bulletGroup.overlap(zombieGroup, function(collector, collected) {
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });

}

function bulletDestroy(){
  zombieGroup.overlap(bulletGroup, function(collector, collected) {
    //collected is the sprite in the group collectibles that triggered
    //the event
    collected.remove();
  });

}

function lifeover(){
  lives = lives - 1;
  if(lives>=1) {
    gamestate = PLAY;
  }
  else {
    gamestate = END;
  }
}