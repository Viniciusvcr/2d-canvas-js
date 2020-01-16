class DrawObjectCommand {
  constructor(object) {
    this.object = object;
    this.objId = ++ID;
  }

  execute() {
    state.onCanvas[this.objId] = { shape: this.object, selected: false };
  }

  undo() {
    delete state.onCanvas[this.objId];
  }
}
