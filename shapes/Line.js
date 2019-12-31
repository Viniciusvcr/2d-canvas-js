class Line extends Shape {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   */
  constructor(x, y, endX, endY, canvasCtx) {
    super(x, y, canvasCtx);
    this._endX = endX;
    this._endY = endY;
  }

  /**
   * @returns {number}
   */
  get endX() {
    return this._endX;
  }

  /**
   * @param {number} endX
   */
  set endX(endX) {
    this._endX = endX;
  }

  /**
   * @returns {number}
   */
  get endY() {
    return this._endY;
  }

  /**
   * @param {number} endY
   */
  set endY(endY) {
    this._endY = endY;
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.endX, this.endY);
    this.ctx.stroke();
  };
}
