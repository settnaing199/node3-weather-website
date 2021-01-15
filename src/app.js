//express is a function
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const gecode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { error } = require("console");

// console.log(__dirname);
// console.log(__filename);

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//set up handlesbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpeful text.",
    title: "Help",
  });
});

//set up route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an adress",
    });
  }

  gecode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(latitude, longtitude, (error, Weatherdata) => {
        if (error) {
          return res.send({
            error,
          });
        }
        return res.send({
          forecast: Weatherdata,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  console.log(req.query);

  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: " Help article note found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "My 404 page",
  });
});
//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
  console.log("server is up on port 3000");
});
