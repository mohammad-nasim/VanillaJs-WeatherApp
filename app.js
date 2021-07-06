const condition       = document.getElementById('condition')
const distric         = document.getElementById('distric')
const country         = document.getElementById('country')
const temp            = document.getElementById('temp')
const pressure        = document.getElementById('pressure')
const humidity        = document.getElementById('humidity')
const main            = document.getElementById('main')
const description     = document.getElementById('description')


const inputcity       = document.getElementById('input-city')
const historyEl       = document.getElementById('history')
const MasterHistory   = document.getElementById('master-history')

const DEAFULT_CITY    = 'Dhaka,Bangladesh'

const API_KEY = '50e5a24a233e1347dac9cf61232e3b37'

const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`

const ICON_URL = `http://openweathermap.org/img/w/`

// `api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`

window.onload = function(){
    navigator.geolocation.getCurrentPosition(s => {
        getWeatherLocation(null, s.coords )
    } , e => {
        getWeatherLocation( DEAFULT_CITY )
    })

    inputcity.addEventListener('keypress' , function(e){
        if(e.key === 'Enter'){
            if(e.target.value){
                getWeatherLocation(e.target.value)
                e.target.value = ''
            }
            else{
                alert('Please enter a valid city name')
            }
        }
    })
}


function getWeatherLocation(city = DEAFULT_CITY , coords){
    let url = BASE_URL

    city == null ? 
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` : 

        
        //url = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`

        url = `${url}&q=${city}`

    axios.get(url)
        .then(({data}) => {
            console.log(data)

            let weather = {
                name : data.name,
                country : data.sys.country ,
                temp : data.main.temp, 
                pressure: data.main.pressure,
                humidity : data.main.humidity, 
                main: data.weather[0].main,
                desc: data.weather[0].description,
                icon: data.weather[0].icon

            }

            setWeather(weather)
        })
        .catch(e => {
            console.log(e)
            alert("No data found")
        })
}

function setWeather(weather){
    condition.src = `${ICON_URL}${weather.icon}.png`
    distric.innerHTML  = weather.name
    humidity.innerHTML = weather.humidity 
    pressure.innerHTML = weather.pressure
    temp.innerHTML     = parseFloat(weather.temp - 273.15).toFixed(2)
    country.innerHTML  = weather.country
    main.innerHTML     = weather.main
    description.innerHTML = weather.desc

}

