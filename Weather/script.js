const weatherData = {
  Mumbai: { temperature: "32°C", description: "Sunny" },
  Delhi: { temperature: "35°C", description: "Hot" },
  Bangalore: { temperature: "25°C", description: "Cloudy" },
  Kolkata: { temperature: "30°C", description: "Humid" },
  Chennai: { temperature: "33°C", description: "Partly Cloudy" },
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  if (weatherData[city]) {
    const { temperature, description } = weatherData[city];
    weatherResult.innerHTML = `<strong>${city}</strong>: ${temperature}, ${description}`;
  } else {
    weatherResult.innerHTML = `Weather data not found for "${city}".`;
  }
});
