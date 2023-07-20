import conditions from "./conditions.js";



const APIkey = '0f0f41aa8d604c1fbc1145233231407';
//http://api.weatherapi.com/v1/current.json?key=0f0f41aa8d604c1fbc1145233231407&q=London

const cards = document.querySelector('.cards');
const search = document.querySelector('#iput');
const saerchButton = document.querySelector('.saerch-button');
const saetchBox = document.querySelector('.saetch-box');
const error = document.querySelector('.error-404');

// const link = document.querySelector('link');
// console.log(link);
// const body = document.querySelector('body');
// console.log(body);






saetchBox.onsubmit = (e) => {
    //e.preventDefault();
    let city = search.value.trim();

    const url = `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}/`;


    // получить данные из запроса в формате json
    fetch(url).then((respons) => {
        return respons.json();
    }).then((data) => {
        //смена иконки 
        // const icon = `<link rel="icon" href="${data.current.condition.icon}" type="image/x-icon" />`

        // увеличение карточки 
        saerchButton.addEventListener('click', () => {
            cards.style.maxHeight = "600px";
            console.log('hello');

        });

        // если есть ошибка
        if (data.error) {
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }

        //удаление преждей карточки
        const prevCard = document.querySelector('.weather-box');
        const prevCard1 = document.querySelector('.weather-details');
        if (prevCard) { prevCard.remove(); prevCard1.remove(); error.style.display = "none"; }

        // let isCyrillic = function (text) {
        //     return /[а-я]/i.test(text);
        // }
        // console.log(isCyrillic(city));

        const info = conditions.find((el) => el.code === data.current.condition.code)

        const html = `<div class="weather-box">
                <img src="${data.current.condition.icon}" />
                <p class="temparatyre">${data.current.temp_c}<span>°C</span></p>
                <!--<p class="description">${data.current.condition.text}</p>-->
                <p class="description">${data.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text']}</p>
            </div>
            <div class="weather-details">
                <div class="humidity">
                <img src="./img/humidity.png" />
                <div class="text">
                    <span>${data.current.humidity}</span>
                    <p>Влажность</p>
                </div>
                </div>
                <div class="windS">
                <img src="./img/windS.png" />
                <div class="text">
                    <span>${data.current.wind_kph}</span>
                    <p>Скрость ветра</p>
                </div>
                </div>
            </div>`
        //отрисовка новой карточки
        saetchBox.insertAdjacentHTML('afterend', html);
    });
};

