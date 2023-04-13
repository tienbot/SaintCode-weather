let tempResult = null

const success = function (data) {
    lat = data.coords.latitude
    lon = data.coords.latitude
    tempResult = temp(lat, lon);
    tempResult.then(data => dataAtSite(data))
}

const error = function () {
    console.error("ERROR")
    // получить ip
    fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => getIP(data))
        .catch(console.log('IP not found...'))

    chooseCityDiv.classList.add('d-none')
    weatherDiv.classList.add('d-none')
    errorDiv.classList.remove('d-none')
}

navigator.geolocation.getCurrentPosition(success, error);

let lat = null
let lon = null
let api = '97109d73f740c94c7c42ac8c357cc62f'
const inputCity = document.getElementById('inputCity')
const tryAgain = document.getElementById('tryAgain')
let cityName = null
let weatherDiv = document.querySelector('.weatherDiv')
let chooseCityDiv = document.querySelector('.chooseCityDiv')
let errorDiv = document.querySelector('.errorDiv')

inputCity.addEventListener('change', ()=>{
    cityName = inputCity.value
    inputCity.value = ''
    tempResult = city(cityName)
    tempResult.then(data => dataAtSite(data))
    chooseCityDiv.classList.add('d-none')
    weatherDiv.classList.remove('d-none')
})

tryAgain.addEventListener('click', ()=>{
    chooseCityDiv.classList.remove('d-none')
    errorDiv.classList.add('d-none')
    weatherDiv.classList.addc('d-none')
    // lat = 50.2727763
    // lon = 127.5404017
    tempResult = temp(lat, lon);
    tempResult.then(data => dataAtSite(data))
})

async function city(cityName){
    const geo = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ru&appid=${api}`)
    const data = await geo.json()
    //если введен несуществующий город
    if(data.cod === '404'){
        errorDiv.classList.remove('d-none')
        weatherDiv.classList.add('d-none')
        chooseCityDiv.classList.add('d-none')
    }
    return data
}

async function temp(lat, lon){
    const weather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${api}`)
    const data = await weather.json()
    return data
}

function dataAtSite(obj) {
    const weatherDiv = document.body.querySelector(".weatherDiv")
    weatherDiv.innerHTML=''
    //создаем карточку
    const p = document.createElement('p')
    const h1 = document.createElement('h1')
    let imgSrc = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
    const img = document.createElement('img')
    img.setAttribute("src", imgSrc)
    let cel = Math.round(obj.main.temp)
    let city = obj.name
    let weather = obj.weather[0].description
    weather = weather.split('')
    weather[0] = weather[0].toUpperCase()
    weather = weather.join('')
    const button = document.createElement('button')
    button.innerHTML='Изменить город'
    button.setAttribute("class", 'changeCity')
    button.addEventListener('click', ()=>{
        chooseCityDiv.classList.remove('d-none')
        weatherDiv.classList.add('d-none')
    })
    

    h1.innerHTML=`${cel}℃`
    //склонение названия города, в зависимости от последней буквы
    let letter = city[city.length-1]
    if (letter == 'а' || letter == 'я' || letter == 'ь' || letter == 'й'){
        city=city.split('')
        city.pop(letter)
        city.push('е')
        city = city.join('')
    } else if (city == 'бали' || city == 'Бали' || letter == 'у' || letter == 'е' || letter == 'о' || letter == 'э'){
        city=city
    } else if (letter == 'и' || letter == 'ы'){
        city=city.split('')
        city.pop(letter)
        city.push('ах')
        city = city.join('')
    } else {
        city=city.split('')
        city.push('е')
        city = city.join('')
    }
    p.innerHTML=`${weather} в ${city}`
    weatherDiv.append(img, h1, p, button)
}

function getIP(json) {
    console.log("My public IP address is: ", json.ip);
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_wEUr3KA826hpiltp2wrwhQIagaHxK&ipAddress=${json.ip}`)
        .then(response => response.json())
        // .then(data => console.log(data))
        // .then(data => console.log(data.location.region))
        .then(data => dataAtSite(data.location.region))
}