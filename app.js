
async function getWeather() {
    const countryInput = document.getElementById("countryInput").value;

    // Проверяем, не пустое ли значение ввода
    if (!countryInput) {
        alert("Пожалуйста, введите название страны.");
        return;
    }

    // Проверяем наличие ключа API
    const apiKey = '3d830cc3d7f3a680105538d2a1e5d7d1';
    if (!apiKey) {
        alert("Отсутствует ключ API. Получите его на сайте OpenWeatherMap и укажите в коде.");
        return;
    }

    // Подготавливаем URL для запроса к API OpenWeatherMap
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryInput}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Проверяем статус ответа
        if (response.ok) {
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = `
                <h2>Погода в ${data.name}, ${data.sys.country}:</h2>
                <p>Температура: ${data.main.temp}°C</p>
                <p>Ощущается как: ${data.main.feels_like}°C</p>
                <p>Минимальная температура: ${data.main.temp_min}°C</p>
                <p>Максимальная температура: ${data.main.temp_max}°C</p>
                <p>Влажность: ${data.main.humidity}%</p>
                <p>Скорость ветра: ${data.wind.speed} м/с</p>
            `;
        } else {
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = `<p>Ошибка: ${data.message}</p>`;
        }
    } catch (error) {
        console.error("Ошибка при получении данных о погоде:", error);
    }
}
    });
});
