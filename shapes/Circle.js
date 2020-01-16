class Circle extends Shape {
  /**
   * @param {Point} p1
   * @param {number} radius
   */
  constructor(p1, p2, canvasCtx) {
    super(p1, canvasCtx);
    this._p1 = p1;
    this._p2 = p2;
    this._radius = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
    this._type = "Círculo";
  }

  /**
   * @param {Array} arrayOfPoints
   */
  setPoints(arrayOfPoints) {
    this.p1 = arrayOfPoints[0];
    this.p2 = arrayOfPoints[1];
    this.radius = [this.p1, this.p2];
  }

  /**
   * @returns {String}
   */
  get type() {
    return this._type;
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
   * @returns {number}
   */
  get radius() {
    return this._radius;
  }

  /**
   * @param {array} radius
   */
  set radius([p1, p2]) {
    this._radius = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.p1.x, this.p1.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.stroke();
  };
}
