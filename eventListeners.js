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
  currentTask.innerHTML = `Selecione o Ponto ${points.length + 1} do(a) ${
    shape.type
  }`;
};

const endDrawing = () => {
  drawing = false;
  points = [];
  shape = undefined;
  canvas.style.cursor = "default";
  currentTask.innerHTML = `Selecione a ferramenta a ser usada`;
};

const makeRect = () => {
  shape = new Rectangle(p0, p0, canvasCtx);
  initDrawing();
  pointsNeeded = 2;
};

const makeTriangle = () => {
  shape = new Triangle(p0, p0, p0, canvasCtx);
  initDrawing();
  pointsNeeded = 3;
};

const makeLine = () => {
  shape = new Line(p0, p0, canvasCtx);
  initDrawing();
  pointsNeeded = 2;
};

const makeCircle = () => {
  shape = new Circle(p0, p0, canvasCtx);
  initDrawing();
  pointsNeeded = 2;
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

const scale = () => {
  if (Object.keys(state.selected).length === 0) {
    alert("Selecione um objeto para realizar a escala");
  } else {
    const sx = Number.parseFloat(prompt("Insira a escala do eixo X", 1));
    const sy = Number.parseFloat(prompt("Insira a escala do eixo Y", 1));
    operation.executeCommand(new ScaleCommand(sx, sy));
  }
};

const rotate = () => {
  if (Object.keys(state.selected).length === 0) {
    alert("Selecione um objeto para realizar a rotação");
  } else if (Object.keys(state.selected).length > 1) {
    alert("Não é possível usar a rotação em mais de um objeto ao mesmo tempo");
  } else {
    const obj = Object.values(state.selected)[0];
    const theta = Number.parseFloat(
      prompt("Insira o ângulo de rotação (em graus)", 0)
    );
    const x = Number.parseFloat(
      prompt(
        "Insira o ponto de rotação X (padrão: primeiro ponto do objeto)",
        obj.shape.p1.x
      )
    );
    const y = Number.parseFloat(
      prompt(
        "Insira o ponto de rotação Y (padrão: primeiro ponto do objeto)",
        obj.shape.p1.y
      )
    );
    operation.executeCommand(new RotationCommand(theta, x, y));
  }
};

const zoomExt = () => {
  let xMin = canvas.width,
    yMin = canvas.height,
    xMax = 0,
    yMax = 0;

  for (const obj of Object.values(state.onCanvas)) {
    for (const point of obj.shape.points) {
      if (point.x > xMax) {
        xMax = point.x;
      }

      if (point.y > yMax) {
        yMax = point.y;
      }

      if (point.x < xMin) {
        xMin = point.x;
      }

      if (point.y < yMin) {
        yMin = point.y;
      }
    }
  }

  operation.executeCommand(
    new ZoomExtentCommand(
      new Point(xMin, yMin),
      new Point(xMax, yMax),
      p0,
      new Point(1024, 768)
    )
  );
};

// Canvas EventListeners
canvas.addEventListener("mousemove", e => writeAxisLabels(e));
canvas.addEventListener("click", e => {
  if (drawing) {
    const newPoint = createPoint(e);
    points.push(newPoint);
    currentTask.innerHTML = `Selecione o Ponto ${points.length + 1} do(a) ${
      shape.type
    }`;

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
    const { Command, needsPoints } = transformations[transformation];
    if (needsPoints) {
      const newPoint = createPoint(e);

      operation.executeCommand(new Command(newPoint));
    } else {
      operation.executeCommand(new Command());
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

scaleButton.addEventListener("click", () => {
  scale();
});

rotationButton.addEventListener("click", () => {
  rotate();
});

zoomExtButton.addEventListener("click", () => {
  zoomExt();
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
  },

  E() {
    scale();
  },

  R() {
    rotate();
  },

  X() {
    zoomExt();
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
