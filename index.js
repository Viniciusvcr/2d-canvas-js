const canvas = document.getElementById("canvas");
canvas.width = 1024;
canvas.height = 768;

const style = canvas.style;
style.marginLeft = "auto";
style.marginRight = "auto";

const parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";

canvas.addEventListener("mousemove", e => {
  const xAxis = document.getElementById("xAxis");
  const yAxis = document.getElementById("yAxis");

  xAxis.innerHTML = `Eixo X: ${e.offsetX}`;
  yAxis.innerHTML = `Eixo X: ${e.offsetY}`;
});

const canvasCtx = canvas.getContext("2d");

const objectsOnCanvas = [
  new Circle(new Point(200, 200), 30, canvasCtx),
  new Rectangle(new Point(500, 100), new Point(700, 300), canvasCtx),
  new Line(new Point(50, 300), new Point(300, 100), canvasCtx),
  new Triangle(
    new Point(100, 500),
    new Point(100, 700),
    new Point(300, 500),
    canvasCtx
  )
];

for (const shape of objectsOnCanvas) {
  shape.draw();
}

const operation = new Operation();
const clearButton = document
  .getElementById("clearButton")
  .addEventListener("click", () => {
    operation.executeCommand(
      new ClearCommand(canvas, canvasCtx, objectsOnCanvas)
    );
  });
const clearBind = document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key === "L") {
    operation.executeCommand(
      new ClearCommand(canvas, canvasCtx, objectsOnCanvas)
    );
  }
});

const undoButton = document
  .getElementById("undoButton")
  .addEventListener("click", () => {
    operation.undoCommand();
  });
const undoBind = document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key === "z") {
    operation.undoCommand();
  }
});

const redoButton = document
  .getElementById("redoButton")
  .addEventListener("click", () => {
    operation.redoCommand();
  });
const redoBind = document.addEventListener("keydown", event => {
  if (
    (event.ctrlKey && event.key === "Z") ||
    (event.ctrlKey && event.key === "y")
  ) {
    operation.redoCommand();
  }
});

const rectangleButton = document
  .getElementById("rectButton")
  .addEventListener("click", makeRect);
const rectangleBind = document.addEventListener("keydown", event => {
  if (event.key === "r") {
    makeRect();
  }
});
