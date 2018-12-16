require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo")(session);
const app = express();

mongoose.connect('mongodb://localhost/rideWithMe', {useNewUrlParser: true})
 .then(x => {
   console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
 })
 .catch(err => {
   console.error("Error connecting to mongo", err)
 });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

//handlebars middlewares
let hbs = require('express-handlebars');

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//body & cookie parser middlewares
app.use(cookieParser());
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({
  extended: true
})); 

//static
app.use(express.static('public'));

// session use
app.use(session({
  secret: "basic-auth-secret",
  cookie: {maxAge: 6000000},
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

//load routes
let routesIndex = require('./routes/index');
let routesSignUp = require('./routes/signup');
let routesLogIn = require('./routes/login');
let routesRegister = require('./routes/registration');
let routesLogOut = require('./routes/logout');
let routesProceed = require('./routes/proceed');
let routesOffer = require('./routes/offerTrip');
let routesRepeatOffer = require('./routes/repeatedOffer');
let routesPostOffer = require('./routes/postedTrip');
let routesHistory = require('./routes/historyTrip');
let routesAvailable = require('./routes/availableTrips');
let routesJoinTrip = require('./routes/joinTrip');
let routesPassengerTrip = require('./routes/passengerTrip');

//implement routes
app.use('/', routesIndex);
app.use('/signup', routesSignUp);
app.use('/login', routesLogIn);
app.use('/registration', routesRegister);
app.use('/logout', routesLogOut);
app.use('/proceed', routesProceed);
app.use('/offer-trip', routesOffer);
app.use('/repeated-offer', routesRepeatOffer);
app.use('/trip-posted', routesPostOffer);
app.use('/history', routesHistory);
app.use('/available-trips', routesAvailable);
app.use('/join-trip', routesJoinTrip);
app.use('/passenger-trip', routesPassengerTrip);


app.listen(3000);