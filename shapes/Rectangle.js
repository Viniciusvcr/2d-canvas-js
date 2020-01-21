class Rectangle extends Shape {
  /**
   * @param {Point} p1
   * @param {Point} p2
   */
  constructor(p1, p2, canvasCtx) {
    super([p1, p2], canvasCtx);
    this._p1 = p1;
    this._p2 = p2;
    this._p3 = new Point(p1.x, p2.y);
    this._p4 = new Point(p2.x, p1.y);
    this._type = "Retângulo";
  }

  /**
   * @param {Array} arrayOfPoints
   */
  setPoints(arrayOfPoints) {
    if (arrayOfPoints.length === 4) {
      this.p1 = arrayOfPoints[0];
      this.p2 = arrayOfPoints[1];
      this.p3 = arrayOfPoints[2];
      this.p4 = arrayOfPoints[3];
      this.points = arrayOfPoints;
    } else {
      this.p1 = arrayOfPoints[0];
      this.p2 = arrayOfPoints[1];
      this.p3 = new Point(this.p1.x, this.p2.y);
      this.p4 = new Point(this.p2.x, this.p1.y);
      this.points = [...arrayOfPoints, this.p3, this.p4];
    }
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
   * @returns {Point}
   */
  get p3() {
    return this._p3;
  }

  /**
   * @param {Point} p3
   */
  set p3(p3) {
    this._p3 = p3;
  }

  /**
   * @returns {Point}
   */
  get p4() {
    return this._p4;
  }

  /**
   * @param {Point} p4
   */
  set p4(p4) {
    this._p4 = p4;
  }

  /**
   * @override
   *
   */
  draw = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.p1.x, this.p1.y);
    this.ctx.lineTo(this.p3.x, this.p3.y);
    this.ctx.lineTo(this.p2.x, this.p2.y);
    this.ctx.lineTo(this.p4.x, this.p4.y);
    this.ctx.lineTo(this.p1.x, this.p1.y);
    this.ctx.stroke();
  };

  /**
   * @override
   *
   */
  update = arrayOfPoints => {
    this.setPoints(arrayOfPoints);
  };
}
