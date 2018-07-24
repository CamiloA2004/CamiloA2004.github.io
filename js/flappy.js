// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score=0;
var labelScore;
var player;
var pipes = [];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/flappy.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#f2ee10");
    player = game.add.sprite(100,200,"playerImg");
    game.physics.arcade.enable(player);
    player.x = 100;
    player.y = 250;
    player.body.velocity.x = 10;
    player.body.velocity.y = -100;
    player.body.gravity.y = 200;
    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);
    game.add.text(240,190,"Hello world!, and welcome to my page",{font: "20px Silom", fill:"#2bd811"});
    //game.add.sprite(200, 280, "playerImg");
    //game.input.onDown.add(clickHandler);
    //game.input
    //.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    //.onDown.add(spaceHandler);
    labelScore = game.add.text(20,20,"0");
    //labelscore.setText(score.toString());
    generatePipe();
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval,generatePipe);

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

function generatePipe() {
  var gap = game.rnd.integerInRange(1 ,5);
  for (var count = 0; count < 8; count++) {
    if (count != gap && count != gap+1) {
      addPipeBlock(750, count * 50);
    }
  }
  changeScore();
}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -175;
}

function playerJump() {
player.body.velocity.y = -250;
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
