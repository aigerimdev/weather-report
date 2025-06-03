// Temperature & Landscape UI Module
const WeatherUI = {
    currentTemp: 70,

    updateTemperatureUI() {
    const tempDisplay = document.getElementById("tempValue");
    const landscapeImage = document.getElementById("landscapeImage");
    const caption = document.getElementById("landscapeCaption");

    tempDisplay.textContent = `${this.currentTemp}°`;
    tempDisplay.className = "";

    if (this.currentTemp >= 80) {
        tempDisplay.classList.add("red");
        landscapeImage.src = "assets/hot.png";
        caption.textContent = "City landscape - very hot day.";
    } else if (this.currentTemp >= 70) {
        tempDisplay.classList.add("orange");
        landscapeImage.src = "assets/warmer.png";
        caption.textContent = "City landscape - sunny summer day.";
    } else if (this.currentTemp >= 60) {
        tempDisplay.classList.add("yellow");
        landscapeImage.src = "assets/warm.png";
        caption.textContent = "City landscape - blooming spring.";
    } else if (this.currentTemp >= 30) {
        tempDisplay.classList.add("teal");
        landscapeImage.src = "assets/cool.png";
        caption.textContent = "City landscape - rainy cool day.";
    } else {
        tempDisplay.classList.add("blue");
        landscapeImage.src = "assets/cold.png";
        caption.textContent = "City landscape - cold snowy day.";
    }
    },

    increaseTemp() {
    this.currentTemp += 1;
    this.updateTemperatureUI();
    },

    decreaseTemp() {
        this.currentTemp -= 1;
        this.updateTemperatureUI();
    }
};

// Update the city name in the header live when user types
document.addEventListener("DOMContentLoaded", () => {
    const cityNameInput = document.getElementById("cityNameInput");
    const headerCityName = document.getElementById("headerCityName");

    cityNameInput.addEventListener("input", () => {
    headerCityName.textContent = cityNameInput.value;
    });

  // Add temperature control event listeners
    document.getElementById("increaseTempControl").addEventListener("click", () => {
        WeatherUI.increaseTemp();
    });

    document.getElementById("decreaseTempControl").addEventListener("click", () => {
        WeatherUI.decreaseTemp();
    });

    // Show initial temperature and landscape
    WeatherUI.updateTemperatureUI();
    });

// Update sky display based on user selection from dropdown
const skySelect = document.getElementById('skySelect');
const sky = document.getElementById('sky');

const skyOptions = {
    sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
    cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
    rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
    snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨'
}
skySelect.addEventListener('change', () => {
    const selectedSky = skySelect.value;
    sky.textContent = skyOptions[selectedSky];
});

// Api call
const currentTempButton = document.getElementById("currentTempButton");
const tempValue = document.getElementById("tempValue");
const headerCityName = document.getElementById("headerCityName");

currentTempButton.addEventListener("click", () => {
    const city = headerCityName.textContent;

    // Step 1: Get lat/lon using LocationIQ via proxy
    axios.get("http://localhost:5000/location", {
        params: { q: city }
    })
    .then((locationRes) => {
        const lat = locationRes.data[0].lat;
        const lon = locationRes.data[0].lon;

        // Step 2: Get weather using OpenWeather via proxy
        return axios.get("http://localhost:5000/weather", {
            params: { lat, lon }
        });
    })
    .then((weatherRes) => {
        const kelvin = weatherRes.data.main.temp;
        const fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32).toFixed(1);
        tempValue.textContent = `${fahrenheit}°F`;
    })
    .catch((error) => {
        console.error("Error getting temperature:", error);
        tempValue.textContent = "Error loading temperature";
    });
});
