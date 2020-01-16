class SelectCommand {
  constructor(objId, object) {
    this.objId = objId;
    this.object = object;
  }

  execute() {
    state.selected[this.objId] = state.onCanvas[this.objId];
    state.onCanvas[this.objId].selected = true;
  }

  undo() {
    delete state.selected[this.objId];
    state.onCanvas[this.objId].selected = false;
  }
}
