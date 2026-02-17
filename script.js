async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("API response:", data);

    if (data.error) {
      alert("Error: " + data.error.message);
      return;
    }

    const weatherHtml = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p><strong>${data.current.condition.text}</strong></p>
      <p>🌡️ Temp: ${data.current.temp_c} °C</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>🌬️ Wind: ${data.current.wind_kph} km/h</p>
      <img src="https:${data.current.condition.icon}" alt="Weather Icon" />
    `;

    document.getElementById("weatherInfo").innerHTML = weatherHtml;
    changeBackground(data.current.condition.text.toLowerCase());

  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Error fetching weather data.");
  }
}

function changeBackground(condition) {
  let imageUrl = "";

  if (condition.includes("sunny") || condition.includes("clear")) {
    imageUrl = "https://source.unsplash.com/1600x900/?sunny,sky";
  } else if (condition.includes("cloud")) {
    imageUrl = "https://source.unsplash.com/1600x900/?cloudy,sky";
  } else if (condition.includes("rain")) {
    imageUrl = "https://source.unsplash.com/1600x900/?rain";
  } else if (condition.includes("snow")) {
    imageUrl = "https://source.unsplash.com/1600x900/?snow";
  } else if (condition.includes("thunder")) {
    imageUrl = "https://source.unsplash.com/1600x900/?thunderstorm";
  } else {
    imageUrl = "https://source.unsplash.com/1600x900/?weather";
  }

  document.body.style.backgroundImage = `url(${imageUrl})`;
}
