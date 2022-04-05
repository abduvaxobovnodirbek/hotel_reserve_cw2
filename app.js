const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorPage = require('./controllers/error');
let port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const hotelRoute = require('./routes/hotel');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(hotelRoute);
app.use(errorPage.getErrorPage);


mongoose
  .connect('mongodb+srv://00011415:westminster@cluster0.y0b7c.mongodb.net/western-hotel')
  .then(result => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
});

