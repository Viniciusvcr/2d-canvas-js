class TranslationCommand {
  constructor({ x, y }, object) {
    this.x = x;
    this.y = y;
    this.object = object;
    this.previousCoordinates = object.shape.points;
  }

  execute() {
    const listOfPoints = this.object.shape.points;
    const dx = this.x - listOfPoints[0].x;
    const dy = this.y - listOfPoints[0].y;

    const newCoordinates = [];
    for (const point of listOfPoints) {
      const p = new Point(point.x + dx, point.y + dy);
      newCoordinates.push(p);
    }

    this.object.shape.update(newCoordinates);
  }

  undo() {
    this.object.shape.update(this.previousCoordinates);
  }
}
