const express = require("express"),
  router = express.Router();
const homeController = require("./../controllers/homeController");

router.get("/chat", homeController.chat);
