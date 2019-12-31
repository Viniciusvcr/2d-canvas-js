class Point {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this._x = x;
    this._y = y;
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
  set x(x) {
    this._x = x;
  }

  /**
   * @returns {number}
   */
  get y() {
    return this._y;
  }

  /**
   * @param {number} y
   */
  set y(y) {
    this._y = y;
  }
}
