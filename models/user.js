const subscriber = require("./subscriber");

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true,
        },
        last: {
          type: String,
          trim: true,
        },
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999,
      },
      password: {
        type: String,
        required: true,
      },
      courses: [{ true: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    },
    {
      timestamps: true,
    }
  );

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;

  bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((error) => {
      console.log(`Error in hashing password: ${error.message}`);
      next(error);
    });
  if (user.subscribedAccount === undefined) {
    subscriber
      .findOne({
        email: user.email,
      })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subscriber: ? ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

userSchema.methods.passwordComparison = function (inputPassword) {
  let user = this;
  return brypt.compare(inputPassword, user.password);
};

module.exports = mongoose.model("User", userSchema);
