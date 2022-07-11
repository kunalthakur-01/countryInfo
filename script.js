'use strict';

const container = document.querySelector('.container');


const renderCountry = function (data, i, className = '') {
    const html =
        ` <div class="countries ${className}">
            <div class="country-flag country-flag-${i}">
            </div>
            <div class="country-info">
                <h2>${data.name.common}</h2>
                <p>${data.region}</p>
                <ul>
                    <li class="population">🧑‍🤝‍🧑&nbsp; &nbsp;<span>${(data.population / 1000000).toFixed(2)}M people</span></li>
                    <li class="language">🗣️ &nbsp;&nbsp;<span>${data.languages[Object.keys(data.languages)[0]]}</span></li>
                    <li class="currrency">💰 &nbsp;&nbsp;<span>${data.currencies[Object.keys(data.currencies)[0]].name}(${data.currencies[Object.keys(data.currencies)[0]].symbol})</span></li>
                </ul>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', html);
    const flag = document.querySelector(`.country-flag-${i}`);
    flag.style.background = `url(${data.flags.png})`;
    flag.style.backgroundPosition = 'center';
    flag.style.backgroundSize = 'cover';
    flag.style.backgroundRepeat = 'no-repeat';
}

const getCountryData = country => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0], '1'));
}

getCountryData('india');