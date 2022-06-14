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

//Create varying types of playerballs
//----each type of ball has different friction +
