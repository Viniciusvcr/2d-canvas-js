class ZoomCommand {
  constructor([xyMin, xyMax]) {
    this.xyMin = xyMin;
    this.xyMax = xyMax;
    this.uvMin = p0;
    this.uvMax = new Point(canvas.width, canvas.height);

    this.zoomExtCommand = new ZoomExtentCommand(
      this.xyMin,
      this.xyMax,
      this.uvMin,
      this.uvMax
    );
  }

  execute() {
    this.zoomExtCommand.execute();
  }

  undo() {
    this.zoomExtCommand.undo();
  }
}
