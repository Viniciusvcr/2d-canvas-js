class ZoomExtentCommand {
  constructor(xyMin, xyMax, uvMin, uvMax) {
    this.xyMin = xyMin;
    this.xyMax = xyMax;
    this.uvMin = uvMin;
    this.uvMax = uvMax;

    this.rw = (xyMax.x - xyMin.x) / ((xyMax.y - xyMin.y) * 1.0);
    this.rv = (uvMax.x - uvMin.x) / ((uvMax.y - uvMin.y) * 1.0);
    this.centerH = this.centerV = 0;

    if (this.rw != this.rv) {
      if (this.rw > this.rv) {
        const oldVmax = this.uvMax.y;

        this.uvMax = new Point(
          uvMax.x,
          (uvMax.x - uvMin.x) / this.rw + uvMin.y
        );
        this.centerV = (this.uvMax.y - oldVmax) / 2.0;
      } else {
        const oldVmax = this.uvMax.x;

        this.uvMax = new Point(
          this.rw * (this.uvMax.y - this.uvMin.y) + this.uvMin.x,
          this.uvMax.y
        );
        this.centerH = (this.uvMax.x - oldVmax) / 2.0;
      }
    }

    this.sx =
      (this.uvMax.x - this.uvMin.x) / ((this.xyMax.x - this.xyMin.x) * 1.0);
    this.sy =
      (this.uvMax.y - this.uvMin.y) / ((this.xyMax.y - this.xyMin.y) * 1.0);

    this.previousCoordinates = [];
  }

  execute() {
    const mObjs = generateMatrix(Object.values(state.onCanvas));
    const mTransformation = [
      [this.sx, 0, -this.sx * this.xyMin.x],
      [0, this.sy, -this.sy * this.xyMin.y],
      [0, 0, 1]
    ];

    const result = matrixMultiply(mTransformation, mObjs);
    const newCoordinates = getCoordinates(result);

    let start = 0;
    for (const [id, obj] of Object.entries(state.onCanvas)) {
      const [pos, coordinates] = getCoordinatesForObject(
        newCoordinates,
        start,
        obj.shape.type
      );

      this.previousCoordinates.push({
        id: id,
        oldCoordinates: obj.shape.points
      });

      start = pos;
      obj.shape.update(coordinates);
    }

    const selectCommands = [];
    for (const [id, obj] of Object.entries(state.onCanvas)) {
      selectCommands.push(new SelectCommand(id, obj));
    }

    for (const selectCommand of selectCommands) {
      selectCommand.execute();
    }

    new TranslationCommand(
      new Point(-this.centerH, -this.centerV),
      false
    ).execute();

    for (const selectCommand of selectCommands) {
      selectCommand.undo();
    }
  }

  undo() {
    for (const obj of this.previousCoordinates) {
      state.onCanvas[obj.id].shape.update(obj.oldCoordinates);
    }
  }
}
