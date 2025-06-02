// Update the city name in the header live when user types
ocument.addEventListener("DOMContentLoaded", () => {
    const cityNameInput = document.getElementById("cityNameInput");
    const headerCityName = document.getElementById("headerCityName");

    cityNameInput.addEventListener("input", () => {
    headerCityName.textContent = cityNameInput.value;
    });
});