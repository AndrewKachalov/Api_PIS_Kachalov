const apiKey = "6c6eeaa81683f58a2a4b8052c6a1e5de"; // Ваш ключ API
const weatherForm = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        alert("Введіть місто");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod !== "404") {
                const weather = {
                    city: data.name,
                    temperature: data.main.temp,
                    description: data.weather[0].description,
                    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                };

                displayWeather(weather);
            } else {
                alert("Місто не знайдено");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Помилка при отриманні прогнозу погоди");
        });
});

function displayWeather(weather) {
    weatherInfo.innerHTML = `
        <h2>${weather.city}</h2>
        <p>Температура: ${weather.temperature}°C</p>
        <p>Опис: ${weather.description}</p>
        <img src="${weather.icon}" alt="Іконка погоди">
    `;
}
