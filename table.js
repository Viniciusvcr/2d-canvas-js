function addTableLine(id, obj) {
  const newTr = document.createElement("tr");
  const newTd = document.createElement("td");

  newTd.innerHTML = `${obj.shape.type} (ID: ${id})`;
  newTr.style.cursor = "pointer";

  let clicked;
  if (obj.selected) {
    clicked = true;
    newTr.style.backgroundColor = SELECTED_COLOR;
    newTd.style.color = "white";
  } else {
    clicked = false;
    newTr.style.backgroundColor = "";
    newTd.style.color = "black";
  }

  newTr.appendChild(newTd);
  newTr.addEventListener("click", () => {
    const selectCommand = new SelectCommand(id, obj);

    if (!clicked) {
      selectCommand.execute();
      clicked = true;
      newTr.style.backgroundColor = SELECTED_COLOR;
      newTd.style.color = "white";
    } else {
      selectCommand.undo();
      clicked = false;
      newTr.style.backgroundColor = "";
      newTd.style.color = "black";
    }
  });
  newTr.addEventListener("mouseenter", () => {
    if (!clicked) state.onCanvas[id].selected = true;
  });
  newTr.addEventListener("mouseleave", () => {
    if (!clicked) state.onCanvas[id].selected = false;
  });

  objTable.appendChild(newTr);
}

function clearObjTable() {
  while (objTable.firstChild) {
    objTable.removeChild(objTable.firstChild);
  }

  const standardTr = document.createElement("tr");
  const standardTh = document.createElement("th");

  standardTh.innerHTML = "Objetos na tela";
  standardTr.appendChild(standardTh);
  objTable.appendChild(standardTr);
}

function updateObjTable() {
  const onCanvasValues = Object.entries(state.onCanvas);

  clearObjTable();
  for (const [id, obj] of onCanvasValues) {
    addTableLine(id, obj);
  }
}
