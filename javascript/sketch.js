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
  MouseConstraint = Matter.MouseConstraint,
  //Create Events
  Events = Matter.Events;

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

  //Create Collision function to detect when playerball hits pegs and deletes them from world
  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if (labelA == "ball" && labelB == "peg") {
      }
      if (labelA == "peg" && labelB == "ball") {
        console.log(labelB, labelA);
      }
    }
  }
  Events.on(engine, "collisionStart", collision);
  //Mouse Constraint for interaction with playerball Launcher
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  //Create for loop for pegs to test physics
  var spacing = width / cols;
  if (pegs.length === 0) {
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
  }
  //Load in a new Ball to use in the Launcher
  var playerBall = new Ball(800, 100, 10);
  balls.push(playerBall);
  //Create PlayerBall launcher at top of canvas
  //----Create new Ball constructor function and reference ball.js
  //--------Eventually create an array of different ball types playerball draws from
  playerLauncher = new Launcher(800, 100, playerBall.body);

  //Create Boundaries here
  //-----Extend bottom boundaries below canvas slightly so I can use isOffScreen function to remove ball when it leaves canvas
  var bottomBound = new Boundary(width / 2, height + 50, width + 25, 0);
  var rightBound = new Boundary(1625, 450, 50, height + 50);
  var leftBound = new Boundary(-25, 450, 50, height + 50);
  var topBound = new Boundary(width / 2, 0, width + 25, 10);
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
  playerLauncher.show();

  //isOffScreen Function to delete balls when they fall through and reattach new ball to launcher
  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
    if (balls[i].isOffScreen()) {
      World.remove(world, balls[i].body);
      balls.splice(i, 1);
      i--;

      var playerBall = new Ball(800, 100, 10);
      balls.push(playerBall);

      playerLauncher = new Launcher(800, 100, playerBall.body);
    }
  }

  for (var i = 0; i < pegs.length; i++) {
    pegs[i].show();
  }
}
