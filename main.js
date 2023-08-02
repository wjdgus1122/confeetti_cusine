const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
var Subscriber = require("./models/subscriber");
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

var subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@jonwaxler.com",
});

subscriber1.save((error, saveDocument) => {
  if (error) console.log(error);
  console.log(saveDocument);
});

Subscriber.create(
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
  },
  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);

var myQuery = Subscriber.findOne({
  name: "JH Kang",
}).where("email", /Kang/);
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});
// const express = require("express"),
//   app = express();

// app.set("port", process.env.PORT || 3000);
// app.set("view engine", "ejs");

// app.get("/items/:vegetable", homeController.sendReqParam);

// app.get("/", (req, res) => {
//   res.send("Welcome to Confetti Cuisine!");
// });

// app.get("/courses", homeController.showCourses);
// app.get("/contact", homeController.showSignUp);
// app.get("/thanks", homeController.postedContactForm);

// app.use(layouts);
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
// app.use(express.json());
// app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalError);

// app.post("/", (req, res) => {
//   console.log(req.body);
//   console.log(req.query);
//   res.send("POST Successful!");
// });

// app.listen(app.get("port"), () => {
//   console.log(`Server running at http://localhost:${app.get("port")}`);
// });
