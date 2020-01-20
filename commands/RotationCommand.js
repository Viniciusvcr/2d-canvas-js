class RotationCommand {
  constructor(theta, x, y) {
    this.theta = -(theta * (Math.PI / 180));
    this.objects = Object.entries(state.selected);
    this.x = x;
    this.y = y;
    this.previousCoordinates = [];
  }

  execute() {
    const cos = Math.cos;
    const sin = Math.sin;
    const x = this.x;
    const y = this.y;

    for (const [id, obj] of this.objects) {
      const mObj = generateMatrix([obj]);
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

      this.previousCoordinates.push({
        id: id,
        oldCoordinates: obj.shape.points
      });

      obj.shape.update(newCoordinates);
    }
  }

  undo() {
    for (const obj of this.previousCoordinates) {
      state.onCanvas[obj.id].shape.update(obj.oldCoordinates);
    }
  }
}
