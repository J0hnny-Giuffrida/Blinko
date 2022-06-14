//Create Boundary that prevents playerball from leaving sides
//-----Allow playerball to exit map via bottom
function Boundary(x, y, w, h) {
  var options = {
    restitution: 1,
    friction: 0,
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

Boundary.prototype.show = function () {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rectangle(0, 0, this.w, this.h);
  pop();
};
