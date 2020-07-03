const weather = document.querySelector(".js-weather");

const API_KEYS = "6abad5f3ff125b0dbecf1f354c474afc";
const COORDS = 'coords';

function getWeather(lat, lng){
    // fetch를 통해 data를 가져온다.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEYS}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const sky_status = json.weather[0].main;
        const place = json.name;
        weather.innerText = ` ${sky_status} in ${place}, ${Math.floor(temperature)}°   `;
    })
}

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
    getWeather(latitude, longitude);
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
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();