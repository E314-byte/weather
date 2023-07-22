import conditions from "./conditions.js";


const APIkey = '0f0f41aa8d604c1fbc1145233231407';
//http://api.weatherapi.com/v1/current.json?key=0f0f41aa8d604c1fbc1145233231407&q=London

const search = document.querySelector('#iput');
const saetchBox = document.querySelector('.saetch-box');
const error = document.querySelector('.error-404');

function errorCard(errorMessaga) {
    if (errorMessaga) {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
}

function removeCard() {
    const prevCard = document.querySelector('.weather-box');
    const prevCard1 = document.querySelector('.weather-details');
    if (prevCard) { prevCard.remove(); prevCard1.remove(); error.style.display = "none"; }
}

function newCards(icon, temp, text, info, humidity, wind_kph) {

    const html = `<div class="weather-box">
                <img src="${icon}" />
                <p class="temparatyre">${temp}<span>°C</span></p>
                <!--<p class="description">${text}</p>-->
                <p class="description">${info}</p>
            </div>
            <div class="weather-details">
                <div class="humidity">
                <img src="./img/humidity.png" />
                <div class="text">
                    <span>${humidity}</span>
                    <p>Влажность</p>
                </div>
                </div>
                <div class="windS">
                <img src="./img/windS.png" />
                <div class="text">
                    <span>${wind_kph}</span>
                    <p>Скрость ветра</p>
                </div>
                </div>
            </div>`
    //отрисовка новой карточки
    saetchBox.insertAdjacentHTML('afterend', html);
}

saetchBox.onsubmit = (e) => {
    e.preventDefault();

    let city = search.value.trim();
    const url = `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}`;
    fetch(url).then((respons) => {
        return respons.json();
    }).then((data) => {
        errorCard(data.error);
        removeCard();
        const info = conditions.find((el) => el.code === data.current.condition.code);
        newCards(
            data.current.condition.icon,
            data.current.temp_c,
            data.current.condition.text,
            data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text'],
            data.current.humidity,
            data.current.wind_kph
        );
    });
};

