const express = require("express");
const expHbs = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
//INITIAZATIONS
const app = express();
require("./database");
//SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  expHbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
//GLOBAL VARIABLES
app.use((req,res,next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});
//ROUTES
app.use(require("./routes/index.js"));
app.use(require("./routes/notes.js"));
app.use(require("./routes/users.js"));
//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
//SERVER IS LISTENNIG
app.listen(app.get("port"), () => {
  console.log(`SERVER ON PORT: ${app.get("port")}`);
});
