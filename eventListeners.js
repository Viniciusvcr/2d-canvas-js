// Functions
const writeAxisLabels = e => {
  const xAxis = document.getElementById("xAxis");
  const yAxis = document.getElementById("yAxis");

  xAxis.innerHTML = `Eixo X: ${e.offsetX}`;
  yAxis.innerHTML = `Eixo Y: ${e.offsetY}`;
};

const createPoint = e => {
  return new Point(e.offsetX, e.offsetY);
};

const initDrawing = () => {
  drawing = true;
  canvas.style.cursor = "crosshair";
  currentTask.innerHTML = `Selecione o Ponto ${points.length + 1}`;
};

const endDrawing = () => {
  drawing = false;
  points = [];
  shape = undefined;
  canvas.style.cursor = "default";
  currentTask.innerHTML = `Selecione a ferramenta a ser usada`;
};

const makeRect = () => {
  initDrawing();
  pointsNeeded = 2;
  shape = new Rectangle(p0, p0, canvasCtx);
};

const makeTriangle = () => {
  initDrawing();
  pointsNeeded = 3;
  shape = new Triangle(p0, p0, p0, canvasCtx);
};

const makeLine = () => {
  initDrawing();
  pointsNeeded = 2;
  shape = new Line(p0, p0, canvasCtx);
};

// Canvas EventListeners
canvas.addEventListener("mousemove", e => writeAxisLabels(e));
canvas.addEventListener("click", e => {
  if (drawing) {
    const newPoint = createPoint(e);
    points.push(newPoint);
    currentTask.innerHTML = `Selecione o Ponto ${points.length + 1}`;

    if (points.length === pointsNeeded) {
      drawing = false;
      canvas.style.cursor = "default";
      shape.setPoints(points);
      operation.executeCommand(
        new DrawObjectCommand(canvas, shape, objectsOnCanvas)
      );
      endDrawing();
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

triangleButton.addEventListener("click", () => {
  makeTriangle();
});

lineButton.addEventListener("click", () => {
  makeLine();
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

document.addEventListener("keydown", event => {
  if (event.key === "t") {
    makeTriangle();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "l") {
    makeLine();
  }
});
