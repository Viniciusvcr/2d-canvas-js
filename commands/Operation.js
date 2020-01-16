class Operation {
  constructor() {
    this.history = [];
    this.undone = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
    updateObjTable();
  }

  undoCommand() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
      this.undone.push(lastCommand);
      updateObjTable();
    }
  }

  redoCommand() {
    const lastUndone = this.undone.pop();
    if (lastUndone) {
      lastUndone.execute();
      this.history.push(lastUndone);
      updateObjTable();
    }
  }
}
