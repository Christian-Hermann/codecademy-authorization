// Import packages
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

// App config
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
// Import Passport config
require("./config/passport");

// Session Config
app.use(
  session({
    secret: "random-secret-string",
    cookie: { maxAge: 3000000, sameSite: "none", secure: true },
    saveUninitialized: false,
    resave: false,
  })
);
// Passport Config
passport.use(
  new LocalStrategy((username, password, done) => {
    helper.findByUsername(username, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
// Routes
app.use(require("./routes/index.routes"));

app.get("/", (req, res) => {
  const user = req.user || "Guest";
  res.render("home", { user });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
