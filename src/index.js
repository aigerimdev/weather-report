// Temperature & Landscape UI Module
let isFahrenheit = true;

const convertToCelsius = (f) => Math.round((f - 32) * 5 / 9);

const WeatherUI = {
  currentTemp: 70, // always stored in Fahrenheit

  updateTemperatureUI() {
    const tempDisplay = document.getElementById("tempValue");
    const landscapeImage = document.getElementById("landscapeImage");
    const caption = document.getElementById("landscapeCaption");

    // Determine what to show
    const displayTemp = isFahrenheit ? this.currentTemp : convertToCelsius(this.currentTemp);
    tempDisplay.textContent = `${displayTemp}°${isFahrenheit ? "F" : "C"}`;
    tempDisplay.className = "";

    // Choose range thresholds based on current unit
    let tempForRange = isFahrenheit ? this.currentTemp : convertToCelsius(this.currentTemp);

    if ((isFahrenheit && tempForRange >= 80) || (!isFahrenheit && tempForRange >= 27)) {
      tempDisplay.classList.add("red");
      landscapeImage.src = "assets/hot.png";
      caption.textContent = "City landscape - very hot day.";
    } else if ((isFahrenheit && tempForRange >= 70) || (!isFahrenheit && tempForRange >= 21)) {
      tempDisplay.classList.add("orange");
      landscapeImage.src = "assets/warmer.png";
      caption.textContent = "City landscape - sunny summer day.";
    } else if ((isFahrenheit && tempForRange >= 60) || (!isFahrenheit && tempForRange >= 15)) {
      tempDisplay.classList.add("yellow");
      landscapeImage.src = "assets/warm.png";
      caption.textContent = "City landscape - blooming spring.";
    } else if ((isFahrenheit && tempForRange >= 30) || (!isFahrenheit && tempForRange >= 0)) {
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
      const fahrenheit = Math.round((kelvin - 273.15) * 9 / 5 + 32);
      WeatherUI.currentTemp = fahrenheit;
      WeatherUI.updateTemperatureUI();

      // 🌅 Update background image by day/night
      const sunrise = weatherRes.data.sys.sunrise;
      const sunset = weatherRes.data.sys.sunset;
      const now = Date.now() / 1000;

      const body = document.body;
      if (now > sunrise && now < sunset) {
        body.style.backgroundColor = "#a8ddf0";
      } else {
        body.style.backgroundColor ="#1a1a2e";
      }
    })
    .catch((error) => {
        console.error("Error getting temperature:", error);
        tempValue.textContent = "Error loading temperature";
    });
});

const cityNameReset = document.getElementById("cityNameReset");
cityNameReset.addEventListener('click', () => {
    const defaultCity = '';
    cityNameInput.value = defaultCity;
    headerCityName.textContent = defaultCity;
});

document.getElementById("unitToggle").addEventListener("change", (event) => {
  isFahrenheit = !event.target.checked; // Assuming toggle: checked = Celsius
  WeatherUI.updateTemperatureUI();
});