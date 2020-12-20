var PLAY  = 1;
var end = 0;
var gameState = PLAY;
var Snowman;
var snowCount=5;
var score1 = 0;

function preload(){
 pointImage = loadImage("5point.PNG");
 backgroundImage = loadImage("background.jpg");
 fireballImage = loadImage("fireball.png");
 snowballImage = loadImage("snowball.PNG");
 snowmanImage = loadImage("snowman.png");
 tree1Image = loadImage("tree1.png");
 tree2Image = loadImage("tree2.png");
 tree3Image = loadImage("tree3.PNG");
 gameoverImage = loadImage("gameover.png");
 resetImage = loadImage("reset2.png");
}

function setup(){
    createCanvas(600,400);

    Background = createSprite(300,200);
    Background.addImage(backgroundImage);
    Background.scale = 1.1;

    Snowman = createSprite(100,300);
    Snowman.addImage(snowmanImage);
    Snowman.scale = 0.3;

    ground = createSprite(300,390,600,10);
    ground.visible=false;

    treeGroup = createGroup();

    Snowman.setCollider("rectangle", 0,0,200,500);
    
    gameover = createSprite(300,150);
    gameover.addImage(gameoverImage);

    reset = createSprite(300,185);
    reset.addImage(resetImage);
    reset.scale=0.15;

    fireGroup = createGroup();

    snowGroup = createGroup();

    shootSnowGroup = createGroup();

}

function draw(){
    background("pink");

    Snowman.collide(ground);

    if(gameState === PLAY){
        if(Background.x<0){
            Background.x = 300;
        }
        if(keyDown(UP_ARROW)){
            Snowman.velocityY = -12;
        }
        Snowman.velocityY = Snowman.velocityY+0.5;
        gameover.visible = false;

      createTree();

       Background.velocityX = -3;

       if(Snowman.isTouching(treeGroup)){
           gameState = end; 
       }

       
       if(frameCount%80==0){
        number = Math.round(random(1,2))
        if(number === 1){
            fireball();
           }
          if(number === 2){
            snowball();
           }
       }
     
       if(Snowman.isTouching(fireGroup)){
           gameState = end;
       }

       if(Snowman.isTouching(snowGroup)){
           snowCount = snowCount+5;
           snowGroup.destroyEach();
       }

       if(keyDown("space")&& snowCount>0){
           shootSnowball();
           snowCount = snowCount-1;
       }

       if(shootSnowGroup.isTouching(fireGroup)){
         fireGroup.destroyEach();
         score1 = score1+100;
       }

       score = Math.round(frameCount/4)+score1;

       reset.visible = false;
    }

    else if(gameState === end){
        Background.velocityX = 0; 
        treeGroup.setVelocityXEach(0);
        gameover.visible = true;
        Snowman.velocityY = 0;
        fireGroup.setVelocityXEach(0);
        snowGroup.setVelocityXEach(0);
        shootSnowGroup.setVelocityXEach(0);

        reset.visible = true;
    }

    drawSprites();
    textSize(20);
    fill("green");
    text("snow count = "+snowCount,50,50);
    
    
    text("score = "+score,50,80);

}

function createTree(){
    if(frameCount%150===0){
        tree=createSprite(600,320);
        number=Math.round(random(1,3));
        if(number === 1){
            tree.addImage(tree1Image);
            tree.scale=0.3;
        }
        if(number === 2){
            tree.addImage(tree2Image);
            tree.scale=0.5
        }
        if(number === 3){
            tree.addImage(tree3Image);
            tree.scale = 0.5
        }
        tree.velocityX=-(4+score/200);

        tree.setCollider("rectangle",0,0,150,250);
        treeGroup.add(tree);
        
        
    }
}

function fireball(){
    //if(frameCount%70 === 0){
        fire = createSprite(600,Math.round(random(50,250)));
        fire.addImage(fireballImage);
        fire.scale = 0.08;
        fire.velocityX = -(4+score/200);
        fireGroup.add(fire);
   // }
}

function snowball(){
    //if(frameCount%70===0){
        snow = createSprite(600,Math.round(random(50,250)));
        snow.addImage(snowballImage);
        snow.scale = 0.15;
        snow.velocityX = -(4+score/200);
        snowGroup.add(snow);
   ///}
}

function shootSnowball(){
    shootSnow = createSprite(Snowman.x, Snowman.y);
    shootSnow.addImage(snowballImage);
    shootSnow.velocityX = 5;
    shootSnow.scale = 0.1;
    shootSnowGroup.add(shootSnow);
}
    
