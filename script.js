let tempResult = null

const success = function (data) {
    lat = data.coords.latitude
    lon = data.coords.latitude
    tempResult = temp(lat, lon);
    tempResult.then(data => dataAtSite(data))
}

const error = function () {
    console.error("ERROR")
    chooseCity.classList.add('d-none')
    weatherDiv.classList.add('d-none')
}

navigator.geolocation.getCurrentPosition(success, error);

// let lat = 50.2727763
// let lon = 127.5404017
let lat = null
let lon = null
let api = '97109d73f740c94c7c42ac8c357cc62f'
const inputCity = document.getElementById('inputCity')
let cityName = null
let weatherDiv = document.querySelector('.weather')
let chooseCity = document.querySelector('.chooseCity')

inputCity.addEventListener('change', ()=>{
    cityName = inputCity.value
    console.log(cityName)
    inputCity.value = ''
    city()
    chooseCity.classList.add('d-none')
    weatherDiv.classList.remove('d-none')
})

async function city(){
    const geo = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}`)
    const data = await geo.json()
    console.log(data)
    return data
}
const cityResult = await city()
console.log(cityResult)

async function temp(lat, lon){
    const weather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${api}`)
    const data = await weather.json()
    return data
}

function dataAtSite(obj) {
    const weatherDiv = document.body.querySelector(".weather")
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
    button.addEventListener('click', ()=>{
        chooseCity.classList.remove('d-none')
        weatherDiv.classList.add('d-none')
        dataAtSite(cityResult)
    })
    
    h1.innerHTML=`${cel}℃`
    p.innerHTML=`${weather} в ${city}е`

    weatherDiv.append(img, h1, p, button)
}