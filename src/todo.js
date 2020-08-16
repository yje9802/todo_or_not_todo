const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
//empty todo list
let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const btn = event.target;
    const span = btn.parentNode;
    const li = span.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;

    //update ids
    toDos.forEach(function (newId) {
        newId = toDos.length + 1;
        id = newId;
    });
    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");
    const spanWrapper = document.createElement("div");
    const doneBtn = document.createElement("input");
    const span = document.createElement("div");
    // const delBtn = document.createElement("button");
    const delBtn = document.createElement("span");
    const newId = toDos.length + 1;

    doneBtn.setAttribute("type", "checkbox");
    delBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    delBtn.setAttribute("onclick", "deleteToDo(event)");
    delBtn.classList.add("delete-btn");
    // delBtn.innerHTML = "✖️";
    // delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;

    spanWrapper.classList.add("span-wrapper");
    spanWrapper.appendChild(doneBtn);
    spanWrapper.appendChild(span);
    li.appendChild(spanWrapper);
    li.appendChild(delBtn);

    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);

    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;

    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();
