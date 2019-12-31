// Constants
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
const objectsOnCanvas = [];
const operation = new Operation();

// Buttons
const clearButton = document.getElementById("clearButton");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const rectangleButton = document.getElementById("rectButton");

// Styling
const style = canvas.style;
const parentStyle = canvas.parentElement.style;
canvas.width = 1024;
canvas.height = 768;
style.marginLeft = "auto";
style.marginRight = "auto";
parentStyle.textAlign = "center";
parentStyle.width = "100%";
