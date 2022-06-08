//Launcher for player ball will go here
class Launcher {
  constructor(x, y, body) {
    const options = {
      pointA: {
        x: x,
        y: y,
      },
      bodyB: body,
      stiffness: 0.2,
      length: 10,
    };
    this.launch = Constraint.create(options);
    World.add(world, this.launch);
  }

  release() {
    this.launch.bodyB = null;
  }

  show() {
    if (this.launch.bodyB) {
      stroke(255);
      const posA = this.launch.pointA;
      const posB = this.launch.bodyB.position;
      line(posA.x, posA.y, posB.x, posB.y);
    }
  }
}
