const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
// const toDoForm = document.querySelector(".js-toDoForm");

const USER_LS = "currentUser";
const SHOWING = "showing";

function saveName(value) {
    localStorage.setItem(USER_LS, value);
}

function handleSubmit(event) {
    const toDoForm = document.querySelector(".js-toDoForm");

    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    toDoForm.classList.add(SHOWING);
}

function askForName() {
    form.classList.add(SHOWING);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    const date = new Date();
    const hours = date.getHours();

    form.classList.remove(SHOWING);

    greeting.classList.add(SHOWING);

    if (hours > 5 && hours <= 10) {
        greeting.innerText = `Good Morning, ${text}`;
    } else if (hours > 10 && hours <= 16) {
        greeting.innerText = `Have a nice day, ${text}`;
    } else if (hours > 16 && hours <= 21) {
        greeting.innerText = `Good Evening, ${text}`;
    } else {
        greeting.innerText = `Good Night, ${text}`;
    }
}

function loadName() {
    const toDoForm = document.querySelector(".js-toDoForm");
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
        toDoForm.classList.add(SHOWING);
    }
}

function init() {
    loadName();
}
init();
