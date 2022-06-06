//Create Player ball passing x, y, and r as arguments
//----make player ball a circle w/ matter.js
//----add player ball to world w/ matter.js
function Ball(x, y, r) {
  this.body = Bodies.circle(x, y, r);
  this.r = r;
  World.add(world, this.body);
}

//Create function to show all balls
//----Color and outline ball for visual clarity
//----Position ball w/ matter.js
Ball.prototype.show = function () {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
};
