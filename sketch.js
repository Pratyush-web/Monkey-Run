//creates the monkey, banana, obstacle, ground and invisible ground sprites
var monkey, monkeyRunning, monkeyCollided;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var ground1, invisibleGround;
//creates the score
var score;
//creates the gameState
var gameState = "play";

function preload()
{
  //loads animation to the monkey sprite
  monkeyRunning =  loadAnimation("monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey7.png","monkey8.png","monkey9.png");
  monkeyCollided = loadAnimation("monkey1.png");
  //loads images to the banana and obstacle sprites
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}

function setup() 
{
  //creates the canvas
  createCanvas(600, 200);
  
  //creates the monkey sprite
  //adds animation to the monkey sprite
  monkey = createSprite(50, 180, 10, 10);
  monkey.addAnimation("running", monkeyRunning);
  monkey.addAnimation("collided", monkeyCollided);
  monkey.scale = 0.09;
    
  //creates the ground and the invisible ground
  ground1 = createSprite(300, 175, 600, 2.5);
  invisibleGround = createSprite(300, 190, 600, 2.5);
  invisibleGround.visible = false;
  
  //creates the banana group
  bananaGroup = new Group();
  //creates the obstacle group
  obstacleGroup = new Group();
}

function draw() 
{
  //cleans the background
  background("white");
  
  //assigns specific tasks that should be done by the monkey sprite
  monkey.velocityY = monkey.velocityY+1;
  monkey.collide(invisibleGround);
  monkey.depth = ground1.depth;
  monkey.depth = monkey.depth+1;
    
  //starts the game
  if(gameState === "play")
  {
    //creates the score
    score = Math.ceil(frameCount/frameRate()); 
        
    //makes the monkey jump
    if(keyDown("space") && monkey.y > 160)
    {
      monkey.velocityY = -15;
    }
    
    //creates banana sprites
    createBananas();
    //creates obstacle sprites
    createObstacles();
    
    //monkey gets the banana
    if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
    }
      
    //stops the game
    if(monkey.isTouching(obstacleGroup))
    {
      gameState = "end";    
    }
  }
  else
  if(gameState === "end")
  {
    monkey.changeAnimation("collided", monkeyCollided);
    bananaGroup.setVelocityEach(0, 0);
    bananaGroup.destroyEach();
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityEach(0, 0);
    obstacleGroup.destroyEach();    
    obstacleGroup.setLifetimeEach(-1);
  }
        
  //displays the score
  stroke("black");
  textSize("20");
  fill("black");
  text("Survival Time:" + score, 300, 10);
  
  //draws the sprites on the screen 
  drawSprites();
}

function createBananas()
{
  if(frameCount%80 === 0)
  {
    banana = createSprite(600, 100, 10, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -(5 + Math.round(score/100));
    banana.y = Math.round(random(50, 80));
    banana.scale = 0.1;    
    bananaGroup.add(banana);
  }
}

function createObstacles()
{
  if(frameCount%120 === 0)
  {
    obstacle = createSprite(600, 170, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -(3 + Math.round(score/100));
    obstacle.scale = 0.1;
    obstacle.debug = false;
    obstacle.setCollider("rectangle", 5, 5, 5, 5);
    obstacleGroup.add(obstacle);
  }
}
