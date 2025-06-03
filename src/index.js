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