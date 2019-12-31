class Shape {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y, ctx) {
    this._x = x;
    this._y = y;
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
