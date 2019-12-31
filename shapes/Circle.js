class Circle extends Shape {
  /**
   * @param {Point} p1
   * @param {number} radius
   */
  constructor(p1, radius, canvasCtx) {
    super(p1, canvasCtx);
    this._radius = radius;
  }

  /**
   * @returns {number}
   */
  get radius() {
    return this._radius;
  }

  /**
   * @param {number} radius
   */
  set radius(radius) {
    this._radius = radius;
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
  };
}
