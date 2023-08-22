const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
var Subscriber = require("./models/subscriber");
const subscribersController = require("./controllers/subscribersController");
const userController = require("./controllers/userController");
const expressSession = rerquire("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine", {
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

const express = require("express"),
  router = express.Router(),
  app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/items/:vegetable", homeController.sendReqParam);

app.get("/", (req, res) => {
  res.send("Welcome to Confetti Cuisine!");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", subscribersController.getSubscriptionPage);
app.get("/thanks", homeController.postedContactForm);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/users", userController.index);
router.get("/users/new", userController.new);
router.get("/users/:id", userController.show, userController.showView);
router.get("/users/:id/edit", userController.edit);
router.get("/users/login", userController.login);
router.put(
  "/users/:id/update",
  userController.update,
  userController.redirectView
);
router.post(
  "/users/create",
  userController.create,
  userController.redirectView
);
router.post(
  "/users/login",
  userController.authenticate,
  userController.redirectView
);
router.post(
  "/users/create",
  userController.validate,
  userController.create,
  userController.redirectView
);
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());

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

app.post("/subscribe", subscribersController.saveSubscriber);
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
