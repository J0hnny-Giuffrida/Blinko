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
function setup() {
  createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;
}

//Draw background
function draw() {
  background(50);
}
