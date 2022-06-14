function Bouncer(x, y, w, h) {
  var options = {
    restitution: 3,
    friction: 0.3,
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

Bouncer.prototype.show = function () {
  fill(233, 236, 239);
  stroke(108, 117, 125);
  var pos = this.body.position;
  push();
  rectMode(CENTER);
  translate(pos.x, pos.y);
  rect(0, 0, this.w, this.h);
  pop();
};
