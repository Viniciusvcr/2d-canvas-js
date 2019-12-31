class Rectangle extends Shape {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} side
   */
  constructor(p1, p2, canvasCtx) {
    super(p1.x, p1.y, canvasCtx);
    this._width = p2.x - p1.x;
    this._height = p2.y - p1.y;
    this.p1 = p1;
    this.p2 = p2;
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
    this.ctx.moveTo(this.p1.x, this.p1.y);
    this.ctx.lineTo(this.p1.x, this.p2.y);
    this.ctx.lineTo(this.p2.x, this.p2.y);
    this.ctx.lineTo(this.p2.x, this.p1.y);
    this.ctx.lineTo(this.p1.x, this.p1.y);

    // this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.stroke();
  };
}
