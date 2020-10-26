const button = document.querySelector(".talk")
const content = document.querySelector(".content")
const api = {
    key: "0745e06b9eb32f7951ec195099a340b7",
    base: "https://api.openweathermap.org/data/2.5/"
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.onstart = () => {
    console.log("activated...")
}
recognition.onresult = (event) => {

    const current = event.resultIndex
    const transcript = event.results[current][0].transcript
    getResults(transcript)
  
}
cheapAlexaTalking = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech)
}

button.addEventListener('click', () => {
    recognition.start()
})



getResults = (query) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => {
            if (response.status !== 200) {
                cheapAlexaTalking('I feel sorry master,location is not found')
            }
            return response.json();
        }).then(displayResults);
}

displayResults = (weather) => {

    const sayweather = new SpeechSynthesisUtterance();
    const weatherin = "It is Currently"
    const degree = "degrees"
    const inword = "in"
    sayweather.text = weatherin + weather.main.temp + degree + inword + weather.name 
    sayweather.volume = 1;
    sayweather.pitch = 1;
    sayweather.rate = 1;
    console.debug(sayweather)
    const temperature = weather.main.temp + "degrees"
    content.textContent = `${weather.name}` + temperature
    window.speechSynthesis.speak(sayweather)
    console.log(weather)
}
