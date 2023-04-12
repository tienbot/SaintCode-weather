let tempResult = null

const success = function (data) {
    lat = data.coords.latitude
    lon = data.coords.latitude
    tempResult = temp(lat, lon);
    tempResult.then(data => dataAtSite(data))
}

const error = function () {
    console.error("ERROR")
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
    tempResult = city()
    tempResult.then(data => dataAtSite(data))
    // if(datа.cod === '404'){
    //     errorDiv.classList.remove('d-none')
    //     weatherDiv.classList.add('d-none')
    //     chooseCityDiv.classList.add('d-none')
    // } else {
        chooseCityDiv.classList.add('d-none')
        weatherDiv.classList.remove('d-none')
    // }
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

async function city(){
    const geo = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ru&appid=${api}`)
    const data = await geo.json()
    console.log(data.cod)
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
    button.innerHTML='Change city'
    button.setAttribute("class", 'changeCity')
    button.addEventListener('click', ()=>{
        chooseCityDiv.classList.remove('d-none')
        weatherDiv.classList.add('d-none')
    })
    

    h1.innerHTML=`${cel}℃`
    //склонение города в зависимости от последней буквы
    if (city[city.length-1] == 'а'){
        city=city.split('')
        city.pop('а')
        city.push('е')
        city = city.join('')
    } else if(city[city.length-1] == 'и'){
        city=city
    } else {
        city=city.split('')
        city.push('е')
        city = city.join('')
    }
    p.innerHTML=`${weather} в ${city}`

    weatherDiv.append(img, h1, p, button)
}