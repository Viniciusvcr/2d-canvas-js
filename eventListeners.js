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

const makeCircle = () => {
  initDrawing();
  pointsNeeded = 2;
  shape = new Circle(p0, p0, canvasCtx);
};

const initTransformation = operation => {
  transforming = true;
  canvas.style.cursor = "crosshair";
  currentTask.innerHTML = `Selecione o ponto de translação`;
  transformation = operation;
};

const endTransformation = () => {
  transforming = false;
  transformation = undefined;
  canvas.style.cursor = "default";
  currentTask.innerHTML = `Selecione a ferramenta a ser usada`;
};

const translate = () => {
  if (Object.keys(state.selected).length > 0) {
    initTransformation();
  } else {
    alert("Não há formas selecionadas!");
  }
  transformation = "Translation";
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
      operation.executeCommand(new DrawObjectCommand(shape));
      endDrawing();
    }
  }
});
canvas.addEventListener("click", e => {
  if (transforming) {
    const newPoint = createPoint(e);
    const Command = transformations[transformation];

    for (const selected of Object.values(state.selected)) {
      operation.executeCommand(new Command(newPoint, selected));
    }

    canvas.style.cursor = "default";
    endTransformation();
  }
});

// Buttons EventListeners
clearButton.addEventListener("click", () => {
  operation.executeCommand(new ClearCommand(state));
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

circleButton.addEventListener("click", () => {
  makeCircle();
});

translationButton.addEventListener("click", () => {
  translate();
});

// Accepted Keyboard Shortcuts of Tools (Ctrl key has to be pressed)
const acceptedCtrlKeys = {
  L() {
    operation.executeCommand(new ClearCommand(state));
  },

  z() {
    operation.undoCommand();
  },

  Z() {
    operation.redoCommand();
  },

  y() {
    operation.redoCommand();
  }
};

// Accepted Keyboard Shortcuts of Shapes
const acceptedKeys = {
  r() {
    makeRect();
  },

  t() {
    makeTriangle();
  },

  l() {
    makeLine();
  },

  c() {
    makeCircle();
  },

  T() {
    translate();
  }
};

// Document EventListener
document.addEventListener("keydown", event => {
  const keyPressed = event.key;
  const action = event.ctrlKey
    ? acceptedCtrlKeys[keyPressed]
    : acceptedKeys[keyPressed];

  if (action) action();
});
