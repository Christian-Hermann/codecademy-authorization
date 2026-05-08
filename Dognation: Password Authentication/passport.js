const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const helper = require("../helpers/helper");

// Session Config
app.use(session({...}));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

// Serialize a user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize a user
passport.deserializeUser((id, done) => {
  helper.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }

    return done(null, user);
  });
});
