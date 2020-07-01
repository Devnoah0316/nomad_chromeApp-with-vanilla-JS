const form = document.querySelector(".js-form"), 
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function handleSubmit(event){
    event.preventDefault();
    // input의 값을 가져옴
    const currentValue = input.value;
    paintGreeting(currentValue);
    
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)

}

// form을 지우고, greeting을 보여준다음, user가 보낸 text를 js-greetings에 넣는다.
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //user를 가지고 있지 않으면 동작하지 않음
        askForName();

    } else{
        // user를 가지고 있으면 동작
        paintGreeting(currentUser);

    }
}

function init(){
    loadName();

}

init();
