//Create Engine
var Engine = Matter.Engine,
  //Create World
  World = Matter.World,
  //Create Bodies
  Bodies = Matter.Bodies,
  //Create Mouse
  Mouse = Matter.Mouse,
  //Create Constraint
  Constraint = Matter.Constraint,
  //Create Mouse Constraint
  MouseConstraint = Matter.MouseConstraint;

var engine;
var world;
var balls = [];
var pegs = [];
var boundaries = [];
var cols = 12;
var rows = 12;
let playerLauncher;

//Canvas for Game
//----Add matter.js engine to canvas
function setup() {
  const canvas = createCanvas(1600, 900);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;
  //Mouse for Matter
  const mouse = Mouse.create(canvas.elt);
  //Options for canvas
  const options = {
    mouse: mouse,
  };
  //Mouse Constraint for interaction with playerball Launcher
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
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
      var p = new Peg(x, y, 10);
      pegs.push(p);
    }
  }

  //Create PlayerBall launcher at top of canvas
  //----Create new Ball constructor function and reference ball.js
  //--------Eventually create an array of different ball types playerball draws from
  var b = new Ball(800, 100, 10);
  balls.push(b);

  playerLauncher = new Launcher(800, 100, b.body);

  //Create Boundaries here
  //-----Extend bottom boundaries below canvas slightly so I can use isOffScreen function to remove ball when it leaves canvas
  var bottomBound = new Boundary(width / 2, height + 50, width, 200);
}
//Mouse Release Function so that slingshot actually slings lol
function mouseReleased() {
  setTimeout(() => {
    playerLauncher.release();
  }, 20);
}
//Draw background
function draw() {
  background(50);
  Engine.update(engine);
  balls[0].show();
  playerLauncher.show();

  for (var i = 0; i < pegs.length; i++) {
    pegs[i].show();
  }
}
