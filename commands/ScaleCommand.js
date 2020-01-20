class ScaleCommand {
  constructor(sx, sy) {
    this.sx = sx;
    this.sy = sy;
    this.objects = Object.entries(state.selected);
    this.previousCoordinates = [];
  }

  execute() {
    let start = 0;
    for (const [id, obj] of this.objects) {
      const mObj = generateMatrix([obj]);
      const x = obj.shape.p1.x;
      const y = obj.shape.p1.y;
      const mTransformation = [
        [this.sx, 0, x - x * this.sx],
        [0, this.sy, y - y * this.sy],
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
