class ClearCommand {
  constructor({ onCanvas, selected }) {
    this.previouslyOnCanvas = onCanvas;
    this.previouslySelected = selected;
  }

  execute() {
    state.onCanvas = {};
    state.selected = {};
  }

  // TODO
  undo() {
    state.onCanvas = this.previouslyOnCanvas;
    state.selected = this.previouslySelected;
  }
}
