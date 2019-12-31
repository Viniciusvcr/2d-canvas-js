class DrawObjectCommand {
  constructor(canvas, object, shapes) {
    this.canvas = canvas;
    this.object = object;
    this.shapesBeforeDraw = [...shapes];
    shapes.push(object);
  }

  execute() {
    this.object.draw();
  }

  undo() {
    new ClearCommand(
      this.canvas,
      this.canvas.getContext("2d"),
      this.shapesBeforeDraw
    ).execute();
    for (const shape of this.shapesBeforeDraw) {
      shape.draw();
    }
  }
}
