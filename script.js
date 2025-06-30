const apiKey = "0d3794fb2951d78e62edab24cb3997d5"; // Tumhara API Key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("City name likho bro!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    document.getElementById("cityName").innerText = `📍 ${data.name}, ${data.sys.country}`;
    document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp} °C`;
    document.getElementById("condition").innerText = `☁️ Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `🌬️ Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById("weatherResult").classList.remove("hidden");
  } catch (err) {
    alert("City not found ya koi aur masla: " + err.message);
  }
}
