class Triangle extends Shape {
  /**
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   */
  constructor(p1, p2, p3, canvasCtx) {
    super(p1.x, p1.y, canvasCtx);
    this._p1 = p1;
    this._p2 = p2;
    this._p3 = p3;
  }

  /**
   * @returns {number}
   */
  get p1() {
    return this._p1;
  }

  /**
   * @param {number} p1
   */
  set p1(p1) {
    this._p1 = p1;
  }

  /**
   * @returns {number}
   */
  get p2() {
    return this._p2;
  }

  /**
   * @param {number} p2
   */
  set p2(p2) {
    this._p2 = p2;
  }

  /**
   * @returns {number}
   */
  get p3() {
    return this._p3;
  }

  /**
   * @param {number} p3
   */
  set p3(p3) {
    this._p3 = p3;
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.p1.x, this.p1.y);
    this.ctx.lineTo(this.p2.x, this.p2.y);
    this.ctx.lineTo(this.p3.x, this.p3.y);
    this.ctx.closePath();
    this.ctx.stroke();
  };
}
