// Constants
const canvas = document.getElementById("canvas");
const currentTask = document.getElementById("currentTask");
const canvasCtx = canvas.getContext("2d");
const state = {
  onCanvas: {},
  selected: {}
};
const operation = new Operation();
const p0 = new Point(0, 0);
const SHAPE_COLOR = "black";
const SELECTED_COLOR = "red";

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
  Translation: TranslationCommand
};

// Buttons
const clearButton = document.getElementById("clearButton");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const lineButton = document.getElementById("lineButton");
const rectangleButton = document.getElementById("rectButton");
const triangleButton = document.getElementById("triangleButton");
const circleButton = document.getElementById("circleButton");
const translationButton = document.getElementById("translationButton");

// Table
const objTable = document.getElementById("object-table");

// Styling
const style = canvas.style;
const parentStyle = canvas.parentElement.style;
canvas.width = 1024;
canvas.height = 768;
style.marginLeft = "auto";
style.marginRight = "auto";
parentStyle.textAlign = "center";
parentStyle.width = "100%";

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

  requestAnimationFrame(render);
}

render();
