class Rectangle extends Shape {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} side
   */
  constructor(x, y, width, height, canvasCtx) {
    super(x, y, canvasCtx);
    this._width = width;
    this._height = height;
  }

  /**
   * @returns {number}
   */
  get width() {
    return this._width;
  }

  /**
   * @param {number} width
   */
  set width(width) {
    this._width = width;
  }

  /**
   * @returns {number}
   */
  get height() {
    return this._height;
  }

  /**
   * @param {number} height
   */
  set height(height) {
    this._height = height;
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.stroke();
  };
}
