// Functions
const writeAxisLabels = e => {
  const xAxis = document.getElementById("xAxis");
  const yAxis = document.getElementById("yAxis");

  xAxis.innerHTML = `Eixo X: ${e.offsetX}`;
  yAxis.innerHTML = `Eixo X: ${e.offsetY}`;
};

const createPoint = e => {
  return new Point(e.offsetX, e.offsetY);
};

const makeRect = () => {
  drawing = true;
  canvas.style.cursor = "crosshair";
  pointsNeeded = 2;
  shape = new Rectangle(p0, p0, canvasCtx);
};

// Canvas EventListeners
canvas.addEventListener("mousemove", e => writeAxisLabels(e));
canvas.addEventListener("click", e => {
  if (drawing) {
    const newPoint = createPoint(e);
    points.push(newPoint);

    if (points.length === pointsNeeded) {
      drawing = false;
      canvas.style.cursor = "default";
      shape.setPoints(points);
      operation.executeCommand(
        new DrawObjectCommand(canvas, shape, objectsOnCanvas)
      );
      points = [];
      shape = undefined;
    }
  }
});

// Buttons EventListeners
clearButton.addEventListener("click", () => {
  operation.executeCommand(
    new ClearCommand(canvas, canvasCtx, objectsOnCanvas)
  );
});

undoButton.addEventListener("click", () => {
  operation.undoCommand();
});

redoButton.addEventListener("click", () => {
  operation.redoCommand();
});

rectangleButton.addEventListener("click", () => {
  makeRect();
});

// Document EventListeners
document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key === "L") {
    operation.executeCommand(
      new ClearCommand(canvas, canvasCtx, objectsOnCanvas)
    );
  }
});

document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key === "z") {
    operation.undoCommand();
  }
});

document.addEventListener("keydown", event => {
  if (
    (event.ctrlKey && event.key === "Z") ||
    (event.ctrlKey && event.key === "y")
  ) {
    operation.redoCommand();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "r") {
    makeRect();
  }
});
