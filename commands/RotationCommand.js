// TODO Vários objetos
class RotationCommand {
  constructor(theta, x, y) {
    this.theta = -(theta * (Math.PI / 180));
    this.object = Object.values(state.selected)[0];
    this.x = x;
    this.y = y;
    this.previousCoordinates = this.object.shape.points;
  }

  execute() {
    const cos = Math.cos;
    const x = this.x ? this.x : this.object.shape.p1.x;
    const y = this.y ? this.y : this.object.shape.p1.y;
    const sin = Math.sin;
    const mObj = generateMatrix(Object.values(state.selected));
    const mTransformation = [
      [
        cos(this.theta),
        -sin(this.theta),
        y * sin(this.theta) - x * cos(this.theta) + x
      ],
      [
        sin(this.theta),
        cos(this.theta),
        -x * sin(this.theta) - y * cos(this.theta) + y
      ],
      [0, 0, 1]
    ];

    const result = matrixMultiply(mTransformation, mObj);
    const newCoordinates = getCoordinates(result);

    this.object.shape.update(newCoordinates);
  }

  undo() {
    this.object.shape.update(this.previousCoordinates);
  }
}
