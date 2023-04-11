let lat = 50.2727763
let lon = 127.5404017
let api = '97109d73f740c94c7c42ac8c357cc62f'

async function temp(){
    const weather = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`)
    const data = await weather.json()
    return data
}

const result = await temp()
// console.log(result)

dataAtSite(result)

function dataAtSite(obj) {
    const container = document.body.querySelector(".container__main")
    //создаем карточку
    const p = document.createElement('p')
    const h1 = document.createElement('h1')
    let cel = Math.floor(obj.main.temp - 273,15)
    let city = obj.name
    let weather = obj.weather[0].main
    const button = document.createElement('button')
    button.innerHTML='Change city'
    
    h1.innerHTML=`${cel}℃`
    p.innerHTML=`${weather} in ${city}`

    container.append(h1, p, button)
}