function clearScreen() {
  operation.executeCommand(new ClearCommand(state));
}

function undo() {
  operation.undoCommand();
}

function redo() {
  operation.redoCommand();
}

function desenhar_triangulo(x1, y1, x2, y2, x3, y3) {
  p1 = new Point(x1, y1);
  p2 = new Point(x2, y2);
  p3 = new Point(x3, y3);

  operation.executeCommand(
    new DrawObjectCommand(new Triangle(p1, p2, p3, canvasCtx))
  );
}

function desenhar_circulo(x1, y1, x2, y2) {
  p1 = new Point(x1, y1);
  p2 = new Point(x2, y2);

  operation.executeCommand(
    new DrawObjectCommand(new Circle(this.p1, this.p2, canvasCtx))
  );
}

function desenhar_reta(x1, y1, x2, y2) {
  p1 = new Point(x1, y1);
  p2 = new Point(x2, y2);

  operation.executeCommand(
    new DrawObjectCommand(new Line(this.p1, this.p2, canvasCtx))
  );
}

function desenhar_retangulo(x1, y1, x2, y2) {
  p1 = new Point(x1, y1);
  p2 = new Point(x2, y2);
  operation.executeCommand(
    new DrawObjectCommand(new Rectangle(this.p1, this.p2, canvasCtx))
  );
}

function transladar(x1, x2) {
  const newPoint = new Point(x1, x2);
  for (const obj of Object.values(state.selected)) {
    operation.executeCommand(new TranslationCommand(newPoint));
  }
}
