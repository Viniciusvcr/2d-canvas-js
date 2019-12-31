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
