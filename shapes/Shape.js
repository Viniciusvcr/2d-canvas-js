class Shape {
  /**
   * @param {Point} point
   */
  constructor(point, ctx) {
    this._x = point.x;
    this._y = point.y;
    this._ctx = ctx;
  }

  /**
   * @param {number} x
   */
  set x(x) {
    this._x = x;
  }

  /**
   * @returns {number}
   */
  get x() {
    return this._x;
  }

  /**
   * @param {number} x
   */
  set y(y) {
    this._y = y;
  }

  /**
   * @returns {number}
   */
  get y() {
    return this._y;
  }

  set ctx(ctx) {
    this._ctx = ctx;
  }

  get ctx() {
    return this._ctx;
  }

  draw = () => {};
  update = () => {};
  rotate = () => {};
  scale = () => {};
  translate = () => {};
}
