// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var width = 790;
var height = 400;
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var hit1 = 0;
var score=0;
var labelScore;
var player;
var pipes = [];
var gapMargin=50;
var gapSize = 150;
var blockHeight = 50;
var pipeEndExtraWidth=10;
var pipeEndHeight=25;
var gameSpeed = 375;
var balloons =[];
var weights =[];
var gameGravity=600;
var splashDisplay;
var vel = 0;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/flappy.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
  game.load.image("pipeEnd","../assets/pipe-end.png");
  game.load.image("balloons","../assets/balloons.png");
  game.load.image("weight","../assets/weight.png");
  game.load.image("Background","../assets/background.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene

    var backgroungVelocity = gameSpeed/10;
    var backgroundSprite = game.add.tileSprite(0, 0, width, height, "Background");
    backgroundSprite.autoScroll(-backgroungVelocity, 0);
    //game.stage.setBackgroundImg(url ="Background"); //#f2ee10//
    player = game.add.sprite(100,200,"playerImg");

    player.x = 100;
    player.y = 250;


    game.input.keyboard.addKey(Phaser.Keyboard.D)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.A)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.W)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.S)
    .onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);

    //game.add.sprite(200, 280, "playerImg");
    //game.input.onDown.add(clickHandler);
    //game.input
    //.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    //.onDown.add(spaceHandler);
    labelScore = game.add.text(20,20,"0");
    //labelscore.setText(score.toString());
    //generatePipe();


    //game.add.text(240,190,"Hello world!, and welcome to my page",{font: "20px Silom", fill:"#2bd811"});

     game.input.keyboard
     .addKey(Phaser.Keyboard.ENTER)
     .onDown.add(start);
     game.physics.arcade.enable(player);
     //splashDisplay.destroy();
     player.anchor.setTo(0.5, 0.5);
     player.body.setSize(25,25,0,0);
     player.body.velocity.x = 0;
      console.log("message12");
      console.log(player.body.velocity);
    splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump");
}


function start(){
  console.log("message");
  game.physics.startSystem(Phaser.Physics.ARCADE);

  player.body.velocity.x = 10;
  player.body.velocity.y = -100;
  game.input.keyboard
  .addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(playerJump);

  player.body.gravity.y = 150;
  var pipeInterval =1.75 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval,generate);
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
  splashDisplay.destroy();
  console.log(Phaser.Timer.SECOND);
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);

  if((player.y<0) || (player.y>400)) {
    location.reload();
  }
    for(var i = balloons.length - 1; i >= 0; i--){
    game.physics.arcade.overlap(player, balloons[i], function(){
    changeGravity(-50);
    balloons[i].destroy();
    balloons.splice(i, 1);

    setInterval(game.time.events.add(changeGravity(10), this),3000);
    game.time.events.add(changeGravity(-10));
    //if(hit1 == 0){
      //console.log(hit1);
         //game.time.events.add(Phaser.Timer.SECOND * 3, changeGravity(10), this);

        // hit1 = 1;}
    });

    game.physics.arcade.overlap(player, weights[i], function(){
    changeGravity(50);
    weights[i].destroy();
    weights.splice(i, 1);
    });
    }

    player.rotation = Math.atan(player.body.velocity.y/330);

    if(score>2 && score<4) {
      player.body.x += 1;
    }
    else
      if(score>4 && score<6) {
        player.body.x += 1.125;

      }
      else if(score==6 && vel == 0) {
        vel = 1;
        player.body.x += 1.15;
      }

  }


  function gameOver(){

  registerScore(score);
  game.state.restart();

}

function clickHandler(event){
  game.add.sprite(event.x, event.y, "playerImg");

}


function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());


}

function spaceHandler() {
game.sound.play("score");
}

    function moveRight(){
player.x = player.x + 45;
    }

function moveLeft() {
  player.x = player.x + -45;

}

function moveUp(){
  player.y = player.y + -45;
}

function moveDown() {
player.y = player.y + 45;
}

function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
  for(var y = gapStart; y > 0; y -= blockHeight){
    addPipeBlock(width, y - blockHeight);
  }
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize -25);
  for(var y = gapStart + gapSize; y < height; y += blockHeight) {
    addPipeBlock(width, y);
  }
  changeScore();
}
/*
function addPipeEnd(){
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

  for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
  addPipeBlock(width, y - blockHeight);
  }

  for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
  addPipeBlock(width, y);
  }
  changeScore();

}
*/
function addPipeEnd(x, y) {
 var block = game.add.sprite(x, y, "pipeEnd");
 pipes.push(block);
 game.physics.arcade.enable(block);
 block.body.velocity.x = -gameSpeed;
}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -gameSpeed;
}

function playerJump() {
player.body.velocity.y = -175;
}

function gameOver() {
  registerScore(score);
  score = 0;
  game.state.restart();

}

function registerScore(score){
  var playerName = prompt("What is your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
    jQuery("#content2").append(
    "<div>" + scoreEntry + "</div>"
  );
  console.log(scoreEntry);
}

function generate(){
  var diceRoll = game.rnd.integerInRange(1, 10);
   if(diceRoll==1) {
     generateBalloons();
   } else if(diceRoll==2) {
     generateWeight();
   } else {
     generatePipe();
   }
}

function changeGravity(g){
 gameGravity += g;
 player.body.gravity.y = gameGravity;
}

function generateBalloons(){
  var bonus = game.add.sprite(width, height, "balloons");
   balloons.push(bonus);
   game.physics.arcade.enable(bonus);
   bonus.body.velocity.x = -200;
   bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}

function generateWeight(){
  var bonus = game.add.sprite(width, height, "weight");
   weights.push(bonus);
   game.physics.arcade.enable(bonus);
   bonus.body.velocity.x = -200;
   bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);

}
