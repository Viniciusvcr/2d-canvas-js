const canvas = document.getElementById("canvas");
canvas.width = 1024;
canvas.height = 768;

const style = canvas.style;
style.marginLeft = "auto";
style.marginRight = "auto";

const parentStyle = canvas.parentElement.style;
parentStyle.textAlign = "center";
parentStyle.width = "100%";

const canvasCtx = canvas.getContext("2d");

const shapes = [
  new Circle(200, 200, 30, canvasCtx),
  new Rectangle(new Point(500, 100), new Point(700, 300), canvasCtx),
  new Line(new Point(50, 300), new Point(300, 100), canvasCtx),
  new Triangle(
    new Point(100, 500),
    new Point(100, 700),
    new Point(300, 500),
    canvasCtx
  )
];

for (const shape of shapes) {
  shape.draw();
}
