
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,ground
var FoodGroup, obstacleGroup,jungle,jungleimage
var survivalTime=0
var gameState=Play 
var Play=1
var End=0;

function preload(){
  
  jungleimage=loadImage('jungle.jpg')
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

createCanvas(600,400)
jungle=createSprite(300,200,39,90)
jungle.addImage(jungleimage)
jungle.velocityX=-4
  
monkey=createSprite(80,315,20,20)  
monkey.addAnimation("mo",monkey_running)
monkey.scale=0.1
  
ground=createSprite(400,350,900,10)
//ground.velocityx=-4
ground.x=ground.width/2
FoodGroup=new Group();
obstacleGroup=new Group();
score=0
}


function draw() {
background(225)
stroke("white")
textSize(20)
fill("white")
text("Score:  "+score,50,30)
 if(gameState===Play){
  if(jungle.x<100){
    jungle.x=jungle.width/2
   }
   if(keyDown('space')&& monkey.y>=100){
     monkey.velocityY=-12
   }  
   monkey.velocityY=monkey.velocityY+0.8
   monkey.collide(ground)
   
   food();
   obstacle();
   ground.visible=false;
     
    if(FoodGroup.isTouching(monkey)){
      score=score+2
      FoodGroup.destroyEach();
    } 
     
   switch(score){
     case 10:monkey.scale=0.12
       break;
       case 20:monkey.scale=0.14
       break;
       case 30:monkey.scale=0.16
       break;
       case 40:monkey.scale=0.18
       break;
       case 50:monkey.scale=0.20
     break;
     default : break;
   }
  }
   if(obstacleGroup.isTouching(monkey)){
     gameState=End
   }else if(gameState===End){
    jungle.velocityX=0
    //ground.velocityX=0
    monkey.visible=false
 FoodGroup.destroyEach();
 obstacleGroup.destroyEach();
 textSize(30)
 fill(255)
 text('GAME OVER!',300,220)
  
  }




    


drawSprites();

}

  
 function food(){
if(frameCount % 80 === 0){
var banana=createSprite(600,200,68,45)
banana.y=Math.round(random(120,200))
banana.addImage(bananaImage)
banana.scale=0.1
banana.velocityX=-5
banana.lifetime=300
FoodGroup.add(banana);
}
}

   
function obstacle(){
  if(frameCount % 300 === 0) {
  var obstacle = createSprite(600,165,10,40);
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -5;
  obstacle.x=Math.round(random(120,200)) 
  obstacle.scale = 0.1;
  obstacle.lifetime = 300;
  obstacleGroup.add(obstacle);
  }
}




