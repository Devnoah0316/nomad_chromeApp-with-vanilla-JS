const toDoForm = document.querySelector(".js-to-do"),
    toDoInput = document.querySelector(".js-add-to-do"),
    toDoList = document.querySelector(".js-list");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDo(event){
    // click된 span태그를 반환하여 btn에 대입
    const btn = event.target;
    // btn의 부모노드 li에 대입
    const li = btn.parentNode;
    // toDoList의 자손들중 해당하는 li 삭제
    toDoList.removeChild(li);
    
    // 모든 toDos가 li의 id와 같지 않을 때
    const cleanToDos = toDos.filter(function(toDo){
        // 삭제된 요소를 제외하고 나머지 요소를 다시 새로운 배열에 저장
        // li.id는 string이기 때문에 int로 변환
        return toDo.id !== parseInt(li.id);
    });
    // 새로운 배열을 다시 원래 배열에 대입 
    toDos = cleanToDos;
    saveToDos();

}

function saveToDos(){
    // JSON.stringify -> 자바스크립트 object를 string으로 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    // empty li를 생성
    const li = document.createElement("li");
    li.className = "toDo";
    // local stroage에도 todo를 저장하기 위해 id 부여
    const newId = toDos.length + 1;
    // span 생성
    const delBtn = document.createElement("span");
    delBtn.innerHTML = "❌";
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    
    const label = document.createElement("label");
    label.innerText = text;
    // li의 자손으로 delBtn을 삽입
    li.appendChild(delBtn);
    // li의 자손으로 span을 삽입
    li.appendChild(label);
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
