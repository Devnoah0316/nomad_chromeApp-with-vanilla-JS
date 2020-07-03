const API_KEYS = "6abad5f3ff125b0dbecf1f354c474afc";
const COORDS = 'coords';

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    // 사용자의 localStorage에 geolocation 정보 저장 
    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords(){
    // using navigator api 
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    // user의 geolocation 정보가 없다면
    if(loadedCoords === null){
        askForCoords();
    } else{
        // getWeather
    }
}


function init(){
    loadCoords();
}

init();