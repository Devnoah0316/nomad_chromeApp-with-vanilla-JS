const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input")
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
const toDos = [];

function saveToDos(){
    // JSON.stringify -> 자바스크립트 object를 string으로 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    // empty li를 생성
    const li = document.createElement("li");
    // buttont 생성
    const delBtn = document.createElement("button");
    // local stroage에도 todo를 저장하기 위해 id 부여
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    // span을 생성
    const span = document.createElement("span");
    span.innerText = text;
    // li의 자손으로 delBtn을 삽입
    li.appendChild(delBtn);
    // li의 자손으로 span을 삽입
    li.appendChild(span);
    // li id 설정
    li.id = newId;
    // toDoList의 자손으로 li삽입
    toDoList.appendChild(li);
    const toDoObj ={
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    // local storage에서 불러온 todo data 저장변수 선언 및 초기화
    const loadedToDos = localStorage.getItem(TODOS_LS);
    // todo data를 저장하는 변수가 비어있지 않다면
    if(loadedToDos !== null){
        // json 문자열 구문을 분석하고, 결과에서 javascript 객체를 생성해 parsedToDos변수에 대입
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init() {
    // local storage에서 todo data load 
    loadToDos();
    // submit event handling 
    toDoForm.addEventListener("submit", handleSubmit);

}

init();
