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

const initDrawing = button => {
  unselectButton("rectButton");
  unselectButton("circleButton");
  unselectButton("lineButton");
  unselectButton("triangleButton");
  drawing = true;
  selectButton(button);
  canvas.style.cursor = "crosshair";
  $("#currentTask")
    .removeClass("badge-light")
    .addClass("badge-success");
  currentTask.innerHTML = `Selecione o Ponto ${points.length + 1} do(a) ${
    shape.type
  }`;
};

const selectButton = button => {
  $(`#${button}`)
    .removeClass("btn-outline-dark")
    .addClass("btn-dark");
};

const unselectButton = button => {
  $(`#${button}`)
    .removeClass("btn-dark")
    .addClass("btn-outline-dark");
};

const endDrawing = () => {
  drawing = false;
  points = [];
  shape = undefined;
  canvas.style.cursor = "default";
  currentTask.innerHTML = `Selecione acima a ferramenta a ser usada`;

  $("#currentTask")
    .removeClass("badge-success")
    .addClass("badge-light");

  unselectButton("rectButton");
  unselectButton("circleButton");
  unselectButton("lineButton");
  unselectButton("triangleButton");
};

const makeRect = () => {
  shape = new Rectangle(p0, p0, canvasCtx);
  initDrawing("rectButton");
  pointsNeeded = 2;
};

const makeTriangle = () => {
  shape = new Triangle(p0, p0, p0, canvasCtx);
  initDrawing("triangleButton");
  pointsNeeded = 3;
};

const makeLine = () => {
  shape = new Line(p0, p0, canvasCtx);
  initDrawing("lineButton");
  pointsNeeded = 2;
};

const makeCircle = () => {
  shape = new Circle(p0, p0, canvasCtx);
  initDrawing("circleButton");
  pointsNeeded = 2;
};

const initTransformation = operation => {
  transforming = true;
  canvas.style.cursor = "crosshair";
  transformation = operation;
  $("#currentTask")
    .removeClass("badge-light")
    .addClass("badge-success");
  currentTask.innerHTML = `Selecione o Ponto ${points.length +
    1} para o(a) ${transformation}`;
};

const endTransformation = () => {
  transforming = false;
  transformation = undefined;
  points = [];
  canvas.style.cursor = "default";
  currentTask.innerHTML = `Selecione acima a ferramenta a ser usada`;
  $("#currentTask")
    .removeClass("badge-success")
    .addClass("badge-light");
};

const translate = () => {
  if (Object.keys(state.selected).length > 0) {
    initTransformation("Translação");
  } else {
    alert("Não há formas selecionadas!");
  }
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
  } else {
    const obj = Object.values(state.selected)[0];
    const theta = Number.parseFloat(
      prompt("Insira o ângulo de rotação (em graus)", 0)
    );

    const x = Number.parseFloat(
      prompt(
        "Insira o ponto de rotação X (padrão: X do primeiro ponto do primeiro objeto selecionado)",
        obj.shape.p1.x
      )
    );

    const y = Number.parseFloat(
      prompt(
        "Insira o ponto de rotação Y (padrão: Y do primeiro ponto do primeiro objeto selecionado)",
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

const zoom = () => {
  initTransformation("Zoom");
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
    const { Command, needsPoints, qntd } = transformations[transformation];
    if (needsPoints) {
      points.push(createPoint(e));
      currentTask.innerHTML = `Selecione o Ponto ${points.length +
        1} para o(a) ${transformation}`;

      if (points.length === qntd) {
        operation.executeCommand(new Command(points));
        endTransformation();
      }
    } else {
      operation.executeCommand(new Command());
    }
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

zoomButton.addEventListener("click", () => {
  zoom();
});

selectAllButton.addEventListener("click", () => {
  selectAll();
});

unselectAllButton.addEventListener("click", () => {
  unselectAll();
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
  },

  A() {
    unselectAll();
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
  },

  Escape() {
    endDrawing();
    endTransformation();
  },

  A() {
    selectAll();
  },

  Z() {
    zoom();
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
