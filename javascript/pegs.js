//Create Static pegs
//-----On contact with playerball pegs remove themselves from world
//---------Most likely do this with Matter.Collision(???)
function Peg(x, y, r) {
  var options = {
    restitution: 2,
    friction: 0,
    isStatic: true,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.body.label = "peg";
  this.r = r;
  this.body.collided = "false";
  World.add(world, this.body);
}

Peg.prototype.show = function () {
  fill(52, 58, 64);
  stroke(108, 117, 125);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
};
