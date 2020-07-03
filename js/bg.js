const body = document.querySelector("body");

const IMG_NUMBER = 6;


function paintImage(imgNumber){
    // image객체 생성
    const image = new Image();
    // 속성 값 부여(파일 경로)
    image.src = `/images/${imgNumber + 1}.jpg`;
    // classList에 추가하여 css이용 제어
    image.classList.add("bgImage");
    // body의 제일 앞부분에 image 추가
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    // generate random number
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();