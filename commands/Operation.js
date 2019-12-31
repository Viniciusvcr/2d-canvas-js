class Operation {
  constructor() {
    this.history = [];
    this.undone = [];
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }

  undoCommand() {
    const lastCommand = this.history.pop();
    lastCommand.undo();
    this.undone.push(lastCommand);
  }

  redoCommand() {
    const lastUndone = this.undone.pop();
    lastUndone.execute();
    this.history.push(lastUndone);
  }
}
