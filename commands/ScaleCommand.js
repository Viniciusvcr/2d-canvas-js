// TODO Multiple objects
class ScaleCommand {
  constructor(sx, sy) {
    this.sx = sx;
    this.sy = sy;
    this.object = Object.values(state.selected)[0];
    this.previousCoordinates = this.object.shape.points;
  }

  execute() {
    const mObj = generateMatrix(Object.values(state.selected));
    const x = this.object.shape.p1.x;
    const y = this.object.shape.p1.y;
    const mTransformation = [
      [this.sx, 0, x - x * this.sx],
      [0, this.sy, y - y * this.sy],
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
