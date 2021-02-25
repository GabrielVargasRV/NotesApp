const express = require("express");
const expHbs = require("express-handlebars");
const path = require("path");
const methodOverride = require('method-override');
const session = require('express-session')
//INITIAZATIONS
const app = express();
require('./database')
//SETTINGS
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",
  expHbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'mysecretapp',
	resave: true,
	saveUninitialized: true
}));
//GLOBAL VARIABLES

//ROUTES
app.use(require('./routes/index.js'));
app.use(require('./routes/notes.js'));
app.use(require('./routes/users.js'));
//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
//SERVER IS LISTENNIG
app.listen(app.get("port"), () => {
  console.log(`SERVER ON PORT: ${app.get("port")}`);
});
