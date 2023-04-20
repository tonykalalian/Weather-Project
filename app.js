const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apikey = "352daed4288c6f64d7f47f1f3cafae4a";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apikey;
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      const description = weatherData.weather[0].description;
      console.log(description);
      console.log(icon);
      res.write(
        "<h1>The temperature in " +
          query +
          " is :" +
          temp +
          "degree celsius</h1>"
      );
      res.write(
        "<p>The temperature in " + query + " is :" + description + "</p>"
      );
      res.write("<img src=" + imageUrl + ">");

      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
