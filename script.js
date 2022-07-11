'use strict';

const container = document.querySelector('.container');


const getCountry = function (country,i) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);


    request.send();
    // console.log(request.responseText)

    request.addEventListener('load', function () {
        // console.log(this.responseText);

        const [data] = JSON.parse(this.responseText);
        // console.log(data);

        const html =
        ` <div class="countries">
            <div class="country-flag country-flag-${i}">
            </div>
            <div class="country-info">
                <h2>${data.name.common}</h2>
                <p>${data.region}</p>
                <ul>
                    <li class="population">🧑‍🤝‍🧑&nbsp; &nbsp;<span>${(data.population / 1000000).toFixed(2)}M people</span></li>
                    <li class="language">🗣️ &nbsp;&nbsp;<span>${data.languages[Object.keys(data.languages)[0]]}</span></li>
                    <li class="currrency">💵 &nbsp;&nbsp;<span>${data.currencies[Object.keys(data.currencies)[0]].name}(${data.currencies[Object.keys(data.currencies)[0]].symbol})</span></li>
                </ul>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
    const flag = document.querySelector(`.country-flag-${i}`);
    flag.style.background = `url(${data.flags.png})`;
    });
}

const country1 = prompt('Enter first country name');
const country2 = prompt('Enter second country name');

getCountry(country1,'1');

getCountry(country2,'2');