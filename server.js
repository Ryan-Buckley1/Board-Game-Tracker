const express = require("express");
const session = require("express-session");
const expbhs = require("express-handlebars");
const path = require("path");

const routes = require("./controllers");
const sequelize = require("./config/connection");

require("dotenv").config();

const app = express();
const hbs = expbhs.create({});
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET || "the secretest secret",
  cookie: { expires: 600000 },
  resave: false,
  saveUnitialized: true,
  proxy: true,
  store: new SequelizeStore({ db: sequelize }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
  );
});
