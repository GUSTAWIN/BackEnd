const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
//------------------------------
const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser'); // 👈 import junto com os outros
const session = require('express-session');
const middlewares = require('./middlewares/middlewares');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'textosecreto',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));
app.use(cookieParser()); // 👈 use junto com os outros middlewares
app.use(middlewares.logRegister, middlewares.sessionControl);

app.use(routes);

app.listen(8081, function () {
    console.log("Servidor no http://localhost:8081")
});

