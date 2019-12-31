class Line {
  /**
   * @param {Point} p1
   * @param {Point} p2
   */
  constructor(p1, p2, canvasCtx) {
    this._p1 = p1;
    this._p2 = p2;
    this._ctx = canvasCtx;
  }

  /**
   * @returns {Point}
   */
  get p1() {
    return this._p1;
  }

  /**
   * @param {Point} p1
   */
  set p1(p1) {
    this._p1 = p1;
  }

  /**
   * @returns {Point}
   */
  get p2() {
    return this._p2;
  }

  /**
   * @param {Point} p2
   */
  set p2(p2) {
    this._p2 = p2;
  }

  /**
   * @returns {any}
   */
  get ctx() {
    return this._ctx;
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.p1.x, this.p1.y);
    this.ctx.lineTo(this.p2.x, this.p2.y);
    this.ctx.stroke();
  };
}
