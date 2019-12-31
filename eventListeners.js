// Functions
const writeAxisLabels = e => {
  const xAxis = document.getElementById("xAxis");
  const yAxis = document.getElementById("yAxis");

  xAxis.innerHTML = `Eixo X: ${e.offsetX}`;
  yAxis.innerHTML = `Eixo X: ${e.offsetY}`;
};

// FIXME Forever Selected
const makeRect = () => {
  let clicks = 0;
  let points = [new Point(0, 0), new Point(0, 0)];

  canvas.style.cursor = "crosshair";
  canvas.addEventListener("click", e => {
    if (clicks < 2) {
      points[clicks].x = e.offsetX;
      points[clicks].y = e.offsetY;
      clicks += 1;

      if (clicks === 2) {
        canvas.style.cursor = "default";
        clicks = 0;
        const newRectangle = new Rectangle(points[0], points[1], canvasCtx);
        operation.executeCommand(
          new DrawObjectCommand(canvas, newRectangle, objectsOnCanvas)
        );
      }
    }
  });
};

// Canvas EventListeners
canvas.addEventListener("mousemove", e => writeAxisLabels(e));

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

rectangleButton.addEventListener("click", makeRect);

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
