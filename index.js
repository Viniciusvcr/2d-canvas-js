// Constants
const canvas = document.getElementById("canvas");
const currentTask = document.getElementById("currentTask");
const canvasCtx = canvas.getContext("2d");
const objectsOnCanvas = [];
const operation = new Operation();
const p0 = new Point(0, 0);

// Variables
let drawing = false;
let pointsNeeded = 0;
let shape = undefined;
let points = [];

// Buttons
const clearButton = document.getElementById("clearButton");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const lineButton = document.getElementById("lineButton");
const rectangleButton = document.getElementById("rectButton");
const triangleButton = document.getElementById("triangleButton");

// Styling
const style = canvas.style;
const parentStyle = canvas.parentElement.style;
canvas.width = 1024;
canvas.height = 768;
style.marginLeft = "auto";
style.marginRight = "auto";
parentStyle.textAlign = "center";
parentStyle.width = "100%";
