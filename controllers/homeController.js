var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50,
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25,
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10,
  },
];

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {
  let paramsName = req.params.myName;
  res.render("index", { name: paramsName });
};

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses,
  });
};

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedContactForm = (req, res) => {
  res.render("thanks");
};

module.exports = {
  showCourses: (req, res) => {
    res.render("courses", {
      offeredCourses: courses,
    });
  },
};
