const request = require("request");

// request({ url: url, json: true }, (error, response) =>{
//     const currentWeather = response.body.current
//     console.log(currentWeather.weather_descriptions[0]+ '. It is currently '+ currentWeather.temperature + ' degrees out. It feels like ' + currentWeather.feelslike + ' degree out.')
// })

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=427a2720dbcdaa1185704a7b55140d79&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather corrdiante", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degree out."
      );
    }
  });
};

module.exports = forecast;
