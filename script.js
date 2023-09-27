document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "8f8135442ebba38fa189c2a7f396a165"; // Replace with your API key
    const weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    const locationInput = document.getElementById("location");
    const getWeatherButton = document.getElementById("getWeather");
    const unitToggle = document.getElementById("unitToggle");

    getWeatherButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        const unit = unitToggle.value;

        if (location === "") {
            displayError("Please enter a location.");
            return;
        }

        fetch(`${weatherEndpoint}?q=${location}&units=${unit}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    displayError("Location not found. Please check the input.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                displayError("An error occurred while fetching weather data.");
            });
    });

    function displayWeather(data) {
        document.getElementById("locationName").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °${unitToggle.options[unitToggle.selectedIndex].textContent}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById("error").textContent = "";
    }

    function displayError(message) {
        document.getElementById("error").textContent = message;
    }
});





