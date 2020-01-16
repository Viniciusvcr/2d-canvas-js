class Retangulo {
  constructor(x1, y1, x2, y2) {
    this.p1 = new Point(x1, y1);
    this.p2 = new Point(x2, y2);

    this.construct();
  }

  construct() {
    operation.executeCommand(
      new DrawObjectCommand(new Rectangle(this.p1, this.p2, canvasCtx))
    );
  }
}
