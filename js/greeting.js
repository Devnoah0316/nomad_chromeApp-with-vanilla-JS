const nameContainer = document.querySelector("#js-name");
const greetText = document.querySelector('#js-greet-text');
const nameText = document.querySelector('#js-name');

function getHours(){
    const now = new Date();
    const hours = now.getHours();
    return hours;
}

function greetingMessage(hour) {
    if (hour > 5 && hour < 11) {
      return '🌤 좋은 아침이에요.';
    } else if (hour >= 11 && hour < 14) {
      return '🍜 벌써 점심이에요.';
    } else if (hour >= 14 && hour < 17) {
      return '🌇 좋은 오후네요.';
    } else if (hour >= 17 && hour < 23) {
      return '🌛 좋은 저녁이에요.';
    } else {
      return '🌙 오늘도 고생 많았어요.';
    }
  }


function paintName(name, hours) {
  nameContainer.innerHTML = "";
  const title = document.createElement("span");
  title.className = "name__text";
  title.innerHTML = `${greetingMessage(hours)} ${name}님`;
  nameContainer.appendChild(title);
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const value = input.value;
  localStorage.setItem("username", value);
  paintName(value);
}

function paintInput() {
  const input = document.createElement("input");
  input.placeholder = "Type your name here";
  input.type = "text";
  input.className = "name__input";
  const form = document.createElement("form");
  form.addEventListener("submit", handleSubmit);
  form.appendChild(input);
  nameContainer.appendChild(form);
}

function loadName() {
  const name = localStorage.getItem("username");
  const hours = getHours();
  if (name === null) {
    paintInput();
  } else {
    paintName(name, hours);
  }
}

function init() {
  loadName();
}

init();
