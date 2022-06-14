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
var bouncers = [];
var cols = 12;
var rows = 4;
let playerLauncher;
let score = 0;

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
  //Text Options for Scoreboard
  textSize(20);

  //Create Collision function to detect when playerball hits pegs and changed collided class
  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if (labelA == "peg" && labelB == "ball") {
        pairs[i].bodyA.collided = "true";
        World.remove(world, pairs[i].bodyA);
        score = score + 1;
      }
    }
  }
  Events.on(engine, "collisionEnd", collision);
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
        var p = new Peg(x, y, 15);
        pegs.push(p);
      }
    }
  }
  //Load in a new Ball to use in the Launcher
  var playerBall = new Ball(800, 100, 15);
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

  //Create 3 Bouncers at bottom of screen
  var bouncer1 = new Bouncer(320, 855, 100, 150);
  var bouncer2 = new Bouncer(640, 855, 100, 150);
  var bouncer3 = new Bouncer(960, 855, 100, 150);
  var bouncer4 = new Bouncer(1280, 855, 100, 150);
  bouncers.push(bouncer1, bouncer2, bouncer3, bouncer4);
}
//Mouse Release Function so that slingshot actually slings lol
function mouseReleased() {
  setTimeout(() => {
    playerLauncher.release();
  }, 20);
}
//Use P5 to render all of my objects in matter.js
function draw() {
  background(0, 0, 0);
  Engine.update(engine);
  //Scoreboard Text will go here
  text("Score:  " + score, 10, 25);
  //Player Launcher Render
  playerLauncher.show();

  //isOffScreen Function to delete balls when they fall through and reattach new ball to launcher
  for (var i = 0; i < balls.length; i++) {
    balls[i].show();
    if (balls[i].isOffScreen()) {
      World.remove(world, balls[i].body);
      balls.splice(i, 1);
      i--;

      //Repeat loading in new Ball + Launcher in same location once ball falls offscreen so the launcher "reloads"
      var playerBall = new Ball(800, 100, 15);
      balls.push(playerBall);

      playerLauncher = new Launcher(800, 100, playerBall.body);
    }
  }
  //For loop to display pegs, checks collided property and if true removes pegs from render
  for (var i = 0; i < pegs.length; i++) {
    pegs[i].show();
    if (pegs[i].body.collided === "true") {
      World.remove(world, pegs[i].body);
      pegs.splice(i, 1);
      i--;
    }
  }

  for (var i = 0; i < bouncers.length; i++) {
    bouncers[i].show();
  }
}
