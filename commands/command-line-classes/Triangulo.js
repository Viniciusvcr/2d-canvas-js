class Triangulo {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.p1 = new Point(x1, y1);
    this.p2 = new Point(x2, y2);
    this.p3 = new Point(x3, y3);

    this.construct();
  }

  construct() {
    operation.executeCommand(
      new DrawObjectCommand(new Triangle(this.p1, this.p2, this.p3, canvasCtx))
    );
  }
}
