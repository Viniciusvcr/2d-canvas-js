// Constants
const canvas = document.getElementById("canvas");
const currentTask = document.getElementById("currentTask");
const canvasCtx = canvas.getContext("2d");
let state = {
  onCanvas: {},
  selected: {},
  axis: [
    new Line(new Point(10, 10), new Point(10, 280), canvasCtx), // Eixo Y
    new Line(new Point(10, 10), new Point(280, 10), canvasCtx), // Eixo X
    new Line(new Point(10, 280), new Point(5, 275), canvasCtx), // Seta Y
    new Line(new Point(10, 280), new Point(15, 275), canvasCtx), // Seta Y
    new Line(new Point(280, 10), new Point(275, 5), canvasCtx), // Seta X
    new Line(new Point(280, 10), new Point(275, 15), canvasCtx), // Seta X
    new Line(new Point(265, 20), new Point(270, 15), canvasCtx), // X
    new Line(new Point(270, 20), new Point(265, 15), canvasCtx), // X
    new Line(new Point(20, 262), new Point(15, 270), canvasCtx), // Y
    new Line(new Point(15, 262), new Point(17, 266), canvasCtx) // Y
  ]
};
const operation = new Operation();
const p0 = new Point(0, 0);
const SHAPE_COLOR = "black";
const SELECTED_COLOR = "#D50000";
const AXIS_COLOR = "#000000";

// Variables
let drawing = false;
let transforming = false;
let pointsNeeded = 0;
let shape = undefined;
let transformation = undefined;
let points = [];
let ID = 0;

// Transformations
const transformations = {
  Translação: { Command: TranslationCommand, needsPoints: true, qntd: 2 },
  Scale: { Command: ScaleCommand, needsPoints: false },
  Zoom: { Command: ZoomCommand, needsPoints: true, qntd: 2 }
};

// Buttons
const helpButton = document.getElementById("helpButton");
const clearButton = document.getElementById("clearButton");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const lineButton = document.getElementById("lineButton");
const rectangleButton = document.getElementById("rectButton");
const triangleButton = document.getElementById("triangleButton");
const circleButton = document.getElementById("circleButton");
const translationButton = document.getElementById("translationButton");
const scaleButton = document.getElementById("scaleButton");
const rotationButton = document.getElementById("rotationButton");
const zoomExtButton = document.getElementById("zoomExtButton");
const zoomButton = document.getElementById("zoomButton");
const selectAllButton = document.getElementById("selectAllButton");
const unselectAllButton = document.getElementById("unselectAllButton");

// Table
const objTable = document.getElementById("object-table");

// Styling
const style = canvas.style;
const parentStyle = canvas.parentElement.style;
canvas.width = 1024;
canvas.height = 768;

function render() {
  const onCanvasValues = Object.values(state.onCanvas);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  for (const obj of onCanvasValues) {
    if (obj.selected) {
      canvasCtx.strokeStyle = SELECTED_COLOR;
    } else {
      canvasCtx.strokeStyle = SHAPE_COLOR;
    }
    obj.shape.draw();
  }

  canvasCtx.strokeStyle = AXIS_COLOR;
  for (const line of state.axis) {
    line.draw();
    line.draw();
    line.draw();
  }
  canvasCtx.fillText("(0,0)", 15, 23);

  requestAnimationFrame(render);
}

render();
