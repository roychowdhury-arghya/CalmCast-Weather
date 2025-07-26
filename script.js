const apiKey = '.......';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const locationName = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const music = document.getElementById('homepage-music');
const musicSource = document.getElementById('musicSource');
const card = document.querySelector('.card');

const rainyDescriptions = [
    "light rain", "moderate rain", "heavy intensity rain",
    "very heavy rain", "extreme rain", "freezing rain",
    "shower rain", "ragged shower rain", "drizzle", "light intensity drizzle",
    "thunderstorm", "thunderstorm with rain", "thunderstorm with heavy rain"
];

const sunnyDescriptions = [
    "clear sky", "sunny"
];

const cloudyDescriptions = [
    "few clouds", "scattered clouds", "broken clouds", "cloudy", "overcast clouds"
];

function createRain() {
    const rainContainer = document.querySelector('.rain');
    rainContainer.innerHTML = '';

    for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = (0.5 + Math.random()).toFixed(2) + 's';
        drop.style.animationDelay = (Math.random() * 1).toFixed(2) + 's';
        rainContainer.appendChild(drop);
    }
}
function startThunder() {
    const flash = document.querySelector('.flash');

    const flashOnce = () => {
        flash.style.opacity = 3;
        setTimeout(() => {
            flash.style.opacity = 0;
        }, 100);
    };

    flashOnce();
    setTimeout(flashOnce, 300);
    setTimeout(flashOnce, 1000);
    setTimeout(flashOnce, 2000);
    setTimeout(flashOnce, 4000);
    setTimeout(flashOnce, 200);
    setTimeout(flashOnce, 200);
}

searchButton.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const fullUrl = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            locationName.textContent = `📍 ${data.name}, ${data.sys.country}`;
            temperature.textContent = `🌡️ Temp: ${data.main.temp}°C`;
            const desc = data.weather[0].description.toLowerCase();
            description.textContent = `🌤️ ${desc}`;

            // clear previous weather effects
            document.querySelector('.rain').innerHTML = '';
            const sunGlow = document.querySelector('.sun-glow');
            if (sunGlow) sunGlow.remove(); // 
            document.body.classList.remove('sunny-body', 'rainy-body', 'cloudy-body');

            // Apply background class only
            if (sunnyDescriptions.includes(desc)) {
                document.body.classList.add('sunny-body');
            } else if (rainyDescriptions.includes(desc)) {
                document.body.classList.add('rainy-body');
            } else if (cloudyDescriptions.includes(desc)) {
                document.body.classList.add('cloudy-body');
            }

            // Default home page content
            let quote = "🌍 Weather is nature's mood.✌️";
            let musicFile = "default.mp3";
            let bgColor = "#87c1e2ff";

            // Weather logic
            if (rainyDescriptions.includes(desc)) {
                quote = "🌧️ Let the rain wash away your worries.🤞";
                musicFile = "rain.mp3";
                bgColor = "#7a7a7aff";
                startThunder();
                createRain();

            } else if (sunnyDescriptions.includes(desc)) {
                quote = "☀️ A sunny day is a new beginning!✌️";
                musicFile = "sunny.mp3";
                bgColor = "#d3caacff";

                // Adding sun glow
                if (!document.querySelector('.sun-glow')) {
                    const sunGlow = document.createElement('div');
                    sunGlow.className = 'sun-glow';
                    document.body.appendChild(sunGlow);
                    document.body.classList.add('sunny-body');
                }

            } else if (cloudyDescriptions.includes(desc)) {
                quote = "☁️ Even clouds need a break from the sun.✌️";
                musicFile = "cloudy.mp3";
                bgColor = "#b9b7b7ff";
            } else {
                quote = "🌍 Weather is nature's mood.✌️";
                musicFile = "default.mp3";
                bgColor = "#87c1e2ff";
            }
            // Update quote
            document.getElementById('weatherQuote').textContent = quote;

            // Update music
            const newSrc = `Audios/${musicFile}`;
            if (musicSource.src !== newSrc) {
                musicSource.src = newSrc;
                music.load();
                music.play();
            }

            // Update card background
            card.style.backgroundColor = bgColor;

            //Animation Chupana hai
            document.getElementById('sunElement').style.display = "none";
            document.getElementById('cloud1').style.display = "none";
            document.getElementById('cloud2').style.display = "none";
            document.getElementById('cloud3').style.display = "none";

            // Animation for cloud
            if (sunnyDescriptions.includes(desc)) {
                document.getElementById('sunElement').style.display = "block";
            } else if (cloudyDescriptions.includes(desc)) {
                document.getElementById('cloud1').style.display = "block";
                document.getElementById('cloud2').style.display = "block";
                document.getElementById('cloud3').style.display = "block";
            }
        })
        .catch(error => {
            locationName.textContent = "";
            temperature.textContent = "";
            description.textContent = "";
            alert("Error: " + error.message);
        });
});
music.load();
music.play().catch(error => {
    console.warn("Autoplay failed:", error);
});


document.getElementById("homepage-music").volume = 0.70;
document.querySelector('.weather-info').classList.add('show');
window.addEventListener('DOMContentLoaded', () => {
    //main  quote
    document.getElementById('weatherQuote').textContent = "🌍 Weather is nature's mood.✌️";

    const music = document.getElementById("homepage-music");
    const musicSource = document.getElementById("musicSource");
    musicSource.src = "Audios/default.mp3";
    music.load();
    music.play();

    // Setting background color
    const card = document.querySelector('.card');


    document.getElementById('sunElement').style.display = "none";
    document.getElementById('cloud1').style.display = "none";
    document.getElementById('cloud2').style.display = "none";
    document.getElementById('cloud3').style.display = "none";
});
music.muted = false;
music.play();





