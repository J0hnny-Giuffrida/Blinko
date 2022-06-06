//Create Engine
var Engine = Matter.Engine,
  //Create World
  World = Matter.World,
  //Create Bodies
  Bodies = Matter.Bodies;

var engine;
var world;
var balls = [];

//Canvas for Game
//----Add matter.js engine to canvas
function setup() {
  createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;

  //Create PlayerBall launcher at top of canvas
  //----Create new Ball constructor function and reference ball.js
  var b = new Ball(300, 50, 10);
  balls.push(b);
}

//Draw background
function draw() {
  background(50);
  balls[0].show();
}
