class Shape {
  /**
   * @param {Array} point
   */
  constructor(points, ctx) {
    this._points = points;
    this._ctx = ctx;
  }

  /**
   * @param {Array} points
   */
  set points(points) {
    this._points = points;
  }

  /**
   * @returns {Array}
   */
  get points() {
    return this._points;
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
