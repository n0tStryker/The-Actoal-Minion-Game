var minion,  bg, gameOver, invisibleGround;
var minionImage, bananaImage, bananaImage2,bananaImage3,evilMinionImage1,evilMinionImage2,evilMinionImage3,evilMinionImage4cloudImage, bgImage, gameOverImage;
var timeSurvived, Score = 0;
var gameState = play;
var evilMinionGroup,bananaGroup,cloudsGroup;
function preload(){
    minionImage = loadImage("Running_Minion.jpg")
    bananaImage = loadImage("Minion Banana.jpg")
    cloudImage = loadImage("Cloud.jpg")
    gameOverImage = loadImage("GameOverIMG.png")
    bgImage = loadImage("Ground.jpg")
    evilMinionImage1 = loadImage("Enemy_Minion.jpg")
    evilMinionImage2 = loadImage("Enemy_Minion2.png")
    evilMinionImage3 = loadImage("Enemy_Minion3.png")
    evilMinionImage4 = loadImage("Enemy_Minion4.png")
    bananaImage2 = loadImage("Minion Banana2.jpg")
    bananaImage3 = loadImage("Groupof Banana.jpg")
  
}
function setup(){
  createCanvas(600,200)
  minion = createSprite(50,160,50,50)
  minion.addImage(minionImage)

  bg = createSprite(300,100,600,200)
  bg.addImage(bgImage)

  gameOver = createSprite(300,100)
  gameOver.addImage(gameOverImage)

  invisibleGround = createSprite(200,190,400,10)
  invisibleGround.visible = false

  evilMinionGroup = createGroup()
  bananaGroup = createGroup()

}
function draw(){
    Text("Score:"+Score,500,50)
    Text("timeSurvived="+timeSurvived,500,50)

    if (gameState === Play) {
      gameOver.visible = false
      bg.velocityX = -(4 + 3* score/100)
      timeSurvived = timeSurvived+1

      if (bg.x < 0) {
        bg.x = bg.width/2

      }

      if (keyDown("space")&& minion.y>= 161) {
        minion.velocityY = -12
      }
      minion.velocityY = minion.velocityY + 0.8
      spawnEvilMinions()
      spawnClouds()
      spawnBanana()

    }
    if (evilMinionGroup.isTouching(minion)){
    gameState = End


    }




    else if (gameState===End){
    gameOver.visible = true
    minion.velocityX = 0
    bg.velocityX = 0 
    evilMinionGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    bananaGroup.setLifetimeEach(-1)
    evilMinionGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)

    if (mousePressedOver(gameOver)){
    reset()   
}



    }

    minion.collide(invisibleGround)








drawSprites()
 
}
function spawnEvilMinions() {
  if(frameCount % 60 === 0){
  var evilMinion = createSprite(600,165,10,40)
  evilMinion.velocityX = -(4+score/100)
  var rand = Math.round(random(1,4))
  switch (rand) {
    case 1: evilMinion.addImage(evilMinionImage1)
      
      break;
  
    case 2 : evilMinion.addImage(evilMinionImage2)
      break;


    case 3 : evilMinion.addImage(evilMinionImage3)
    break;

    case 4 : evilMinion.addImage(evilMinionImage4)

    default: break;
  }
  evilMinion.lifetime = 300
  evilMinionGroup.add(evilMinion)


  }
}


function spawnBanana(){
  if (frameCount % 60 === 0){
     var banana = createSprite(600,125,20,50)
     banana.velocityX = -(4+score/100)
     var rand = Math.round(random(1,3))
     switch (rand) {
      case 1: banana.addImage(bananaImage1)
        
        break;
    
      case 2 : banana.addImage(bananaImage2)
        break;
  
  
      case 3 : banana.addImage(bananaImage3)
      default: break;
    }
    banana.lifetime = 300
    bananaGroup.add(banana)



  }
  }


function spawnClouds(){
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = minion.depth
    minion.depth = minion.depth + 1
    cloudsGroup.add(cloud)
    }
}


function reset(){
  gameState = Play
  cloudsGroup.destroyEach()
  evilMinionGroup.destroyEach()
  bananaGroup.destroyEach()
  score = 0
  timeSurvived = 0
}