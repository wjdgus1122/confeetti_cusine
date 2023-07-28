const layouts = require("express-ejs-layouts");
const express = require("express"),
  app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/", (req, res) => {
  res.send("Welcome to Confetti Cuisine!");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.get("/thanks", homeController.postedContactForm);

app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
