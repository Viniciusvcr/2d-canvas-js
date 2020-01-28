class TranslationCommand {
  constructor([p1, p2 = { x: undefined, y: undefined }], needsCalc = true) {
    this.x1 = p1.x;
    this.y1 = p1.y;
    this.x2 = p2.x;
    this.y2 = p2.y;
    this.objects = Object.entries(state.selected);
    this.previousCoordinates = [];
    this.dx = needsCalc ? this.x2 - this.x1 : this.x1;
    this.dy = needsCalc ? this.y2 - this.y1 : this.y1;
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
