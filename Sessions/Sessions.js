// installing a express session
const express = require("express");
const app = express();
const session = require("express-session");
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4001;
const store = new session.MemoryStore();

app.use(
  session({
    secret: "D53gxl41G",
    // Add the cookie property below:
    cookie: { maxAge: 172800000, secure: true, sameSite: "none" },
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
