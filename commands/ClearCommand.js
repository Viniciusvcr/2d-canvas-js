class ClearCommand {
  constructor(canvas, ctx, objectsOnCanvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.objectsOnCanvas = objectsOnCanvas;
  }

  execute() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  undo() {
    for (const shape of this.objectsOnCanvas) {
      shape.draw();
    }
  }
}
