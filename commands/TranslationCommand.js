class TranslationCommand {
  constructor([{ x, y }], needsCalc = true) {
    this.x = x;
    this.y = y;
    this.objects = Object.entries(state.selected);
    this.previousCoordinates = [];
    this.dx = needsCalc
      ? this.x - this.objects[0][1].shape.points[0].x
      : this.x;
    this.dy = needsCalc
      ? this.y - this.objects[0][1].shape.points[0].y
      : this.y;
  }

  execute() {
    let newCoordinates = [];
    for (const [id, obj] of this.objects) {
      const listOfPoints = obj.shape.points;
      for (const point of listOfPoints) {
        const p = new Point(point.x + this.dx, point.y + this.dy);
        newCoordinates.push(p);
      }

      this.previousCoordinates.push({
        id: id,
        oldCoordinates: obj.shape.points
      });
      obj.shape.update(newCoordinates);
      newCoordinates = [];
    }
  }

  undo() {
    for (const obj of this.previousCoordinates) {
      state.onCanvas[obj.id].shape.update(obj.oldCoordinates);
    }
  }
}
