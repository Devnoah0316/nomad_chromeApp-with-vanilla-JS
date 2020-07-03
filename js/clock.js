const clock = document.querySelector(".js-clock .clock__text");
    
function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes(); 
  clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes}`;
}

function init() {
    // 현재 시간 얻어오기
  setInterval(getTime, 1000);
  return;
}

init();