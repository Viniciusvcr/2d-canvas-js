class ClearCommand {
  constructor({ onCanvas, selected }) {
    this.previouslyOnCanvas = onCanvas;
    this.previouslySelected = selected;
  }

  execute() {
    state.onCanvas = {};
    state.selected = {};
  }

  undo() {
    state.onCanvas = this.previouslyOnCanvas;
    state.selected = this.previouslySelected;
  }
}
