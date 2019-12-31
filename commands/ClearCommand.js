class ClearCommand {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  execute() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // TODO
  undo() {}
}
