'use strict';

const container = document.querySelector('.container');
const form = document.querySelector('.formHandler');
const getCountry = document.querySelector('.getCountry');
const backButton = document.querySelector('.backButton');

// error message
const renderError = (msg, className = '') => {
    let error = `
        <div class="errorHandler ${className}">
            <h3>${msg}</h3>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', error);
}


// render country
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



// getJSON
const getJSON = (url, errorMsg = 'Something Went Wrong!!') => {
    return fetch(url).then(response => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

        return response.json()
    })
}




// // get the country data
// const getCountryData = country => {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {

//             if (!response.ok) throw new Error(`country not found (${response.status})`);

//             return response.json()
//         })
//         .then(data => {
//             // country 1
//             renderCountry(data[0], '1');

//             // neighbour country
//             // const neighbour = data[0].borders[0];
//             const neighbour = 'dsdsdsds';

//             if (!neighbour) return;

//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//         })
//         .then(response => {

//             if (!response.ok) throw new Error(`neighbour not found (${response.status})`);

//             return response.json()
//         })
//         .then(data2 => renderCountry(data2[0], '2', 'neighbour'))
//         .catch(err => {
//             console.error(err);
//             renderError(err);
//         });
// }


// get the country data
const getCountryData = country => {
    let i = 0;

    if(country === 'india' || country === 'India' || country === 'INDIA'){
        i = 1;
    }

    getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country Not Found ')
        .then(data => {
            // country 1
            renderCountry(data[i], '1');

            if (!data[i].borders) throw new Error('No Neighbour Found');
            
            // neighbour country
            const neighbour = data[i].borders[0];


            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country Not Found')
        })
        .then(data2 => renderCountry(data2[0], '2', 'neighbour'))
        .catch(err => {
            console.error(err);
            renderError(err, err.message === 'No Neighbour Found' ? 'neighbour-error' : '');
        });
}


form.addEventListener('submit', e => {
    e.preventDefault();

    // hidden the form section
    getCountry.classList.add('hidden');

    // display the container section
    container.classList.remove('hidden');

    // display the back button
    backButton.classList.remove('hidden');

    // display the countries in the container section
    getCountryData(e.target[0].value);

    e.target[0].value = '';
});

backButton.addEventListener('click', () => {

    setTimeout(() => {
        getCountry.classList.remove('hidden');
    }, 1000);

    container.innerHTML = '';
    container.classList.add('hidden');

    backButton.classList.add('hidden');

})