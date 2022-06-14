//Create Player ball passing x, y, and r as arguments
//----make player ball a circle w/ matter.js
//----add player ball to world w/ matter.js
function Ball(x, y, r) {
  var options = {
    restitution: 1.1,
    friction: 0.5,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "ball";
  this.body.collided = "false";
  this.r = r;
  World.add(world, this.body);
}

//Create function to show all balls
//----Color and outline ball for visual clarity
//----Position ball w/ matter.js
Ball.prototype.show = function () {
  fill(233, 236, 239);
  stroke(108, 117, 125);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
};

//Create function to delete balls once they fall offscreen
Ball.prototype.isOffScreen = function () {
  var x = this.body.position.x;
  var y = this.body.position.y;
  return x < -50 || x > width + 50 || y > height;
};

//Multiplier Functions for Score
Ball.prototype.score2 = function () {
  var x = this.body.position.x;
  var y = this.body.position.y;
  return x < 270 && x > 0 && y > height;
};

Ball.prototype.scoreHalf = function () {
  var x = this.body.position.x;
  var y = this.body.position.y;
  return x < 590 && x > 370 && y > height;
};

Ball.prototype.scorehalfRight = function () {
  var x = this.body.position.x;
  var y = this.body.position.y;
  return x < 1230 && x > 1010 && y > height;
};

Ball.prototype.score2Right = function () {
  var x = this.body.position.x;
  var y = this.body.position.y;
  return x < 1600 && x > 1330 && y > height;
};
