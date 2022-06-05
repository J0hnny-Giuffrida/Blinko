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
}

//Create PlayerBall launcher at top of canvas
//----Create new Ball constructor function and reference ball.js

//Draw background
function draw() {
  background(50);
}
