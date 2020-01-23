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

  const rectangle = new Rectangle(this.p1, this.p2, canvasCtx);
  rectangle.setPoints([this.p1, this.p2]);

  operation.executeCommand(new DrawObjectCommand(rectangle));
}

function transladar(x1, x2) {
  const newPoint = new Point(x1, x2);
  for (const obj of Object.values(state.selected)) {
    operation.executeCommand(new TranslationCommand(newPoint));
  }
}

function escala(sx, sy) {
  if (Object.values(state.selected).length > 0) {
    operation.executeCommand(new ScaleCommand(sx, sy));
  } else return "Selecione objetos para mudar a escala";
}

function rotacao(theta, x = undefined, y = undefined) {
  if (Object.values(state.selected).length > 0) {
    operation.executeCommand(new RotationCommand(theta, x, y));
  } else return "Selecione objetos para rotacionar";
}

function zoom_extent() {
  zoomExt();
}

function selectAll() {
  for (const [id, obj] of Object.entries(state.onCanvas)) {
    new SelectCommand(id, obj).execute();
  }

  updateObjTable();

  return Object.values(state.onCanvas).length === 0
    ? "Não há objetos para serem selecionados"
    : "Todos os objetos foram selecionados";
}

function unselectAll() {
  const previouslySelected = Object.values(state.selected).length;

  for (const obj of Object.values(state.onCanvas)) {
    obj.selected = false;
  }

  updateObjTable();

  state.selected = {};

  return previouslySelected === 0
    ? "Não há objetos para serem deselecionados"
    : "Todos os objetos foram deselecionados";
}

function aplicar_zoom(x1, y1, x2, y2) {
  operation.executeCommand(
    new ZoomCommand([new Point(x1, y1), new Point(x2, y2)])
  );
}
