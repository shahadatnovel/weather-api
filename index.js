const express = require('express');
const axios = require('axios');
const nodemon =require('nodemon');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;
  const apiKey = '4f27ad54e72a5b23a36f8618b5096880'; // Replace with your OpenWeather API key

  try {
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weatherData = weatherResponse.data;

    // You can extract specific data like temperature, humidity, etc., from weatherData and send it back to the client
    res.send(`
      <h2>Weather in ${city}</h2>
      <p>Temperature: ${weatherData.main.temp} K</p>
      <p>Longitude: ${weatherData.coord.lon}</p>
      <p>Latitude: ${weatherData.coord.lat}</p>
    `);
  } catch (error) {
    res.status(400).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost: ${PORT}`);
});
