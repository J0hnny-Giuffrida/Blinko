//Create Engine
var Engine = Matter.Engine,
  //Create World
  World = Matter.World,
  //Create Bodies
  Bodies = Matter.Bodies;

var engine;
var world;
var balls = [];
var pegs = [];
var cols = 11;
var rows = 11;

//Canvas for Game
//----Add matter.js engine to canvas
function setup() {
  createCanvas(600, 800);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;
  //Create for loop for pegs to test physics
  var spacing = width / cols;

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
        if (i == 2) x -= 3;
        if (i == cols - 3) x += 3;
      }
      var y = 2 * spacing + j * spacing;
      var p = new Peg(x, y, 4);
      pegs.push(p);
    }
  }

  //Create PlayerBall launcher at top of canvas
  //----Create new Ball constructor function and reference ball.js
  //--------Eventually create an array of different ball types playerball draws from
  var b = new Ball(300, 0, 10);
  balls.push(b);
}

//Draw background
function draw() {
  background(50);
  Engine.update(engine);
  balls[0].show();

  for (var i = 0; i < pegs.length; i++) {
    pegs[i].show();
  }
}
