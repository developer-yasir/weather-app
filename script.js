const apiKey = "0d3794fb2951d78e62edab24cb3997d5";

function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").innerText = now.toLocaleString();
}
setInterval(updateDateTime, 1000);

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function quickSearch(city) {
  document.getElementById("cityInput").value = city;
  getWeather();
}

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("City likho bro!");

  await fetchWeather(city);
}

async function fetchWeather(city) {
  const loader = document.getElementById("loader");
  const card = document.getElementById("weatherResult");

  loader.classList.remove("hidden");
  card.classList.add("hidden");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp}°C`;
    document.getElementById("condition").innerText = `☁️ ${data.weather[0].main}`;
    document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").innerText = `🌬️ Wind: ${data.wind.speed} m/s`;
    document.getElementById("weatherIcon").src = iconURL;

    card.classList.remove("hidden");
  } catch (err) {
    alert("Kuch masla hai: " + err.message);
  } finally {
    loader.classList.add("hidden");
  }
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      const loader = document.getElementById("loader");
      const card = document.getElementById("weatherResult");

      loader.classList.remove("hidden");
      card.classList.add("hidden");

      try {
        const res = await fetch(url);
        const data = await res.json();
        const icon = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temp").innerText = `🌡️ Temp: ${data.main.temp}°C`;
        document.getElementById("condition").innerText = `☁️ ${data.weather[0].main}`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").innerText = `🌬️ Wind: ${data.wind.speed} m/s`;
        document.getElementById("weatherIcon").src = iconURL;

        card.classList.remove("hidden");
      } catch (err) {
        alert("Location fetch error: " + err.message);
      } finally {
        loader.classList.add("hidden");
      }
    });
  } else {
    alert("Geolocation not supported!");
  }
}
