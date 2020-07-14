#! /usr/bin/env node

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csurf = require('csurf');

const app = express();

const csrfProtection = csurf({ cookie : true });

//Are we using pug?
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/assets'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : false }));


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.get('/', asyncHandler(async (req, res) => {
  res.send('HOME');
}));

app.get('/login-page', asyncHandler(async (req, res) => {
  res.render('login-page', { title: 'Log in: Sherwood Wealth Services'});
}));

app.get('/landing-page', asyncHandler(async (req, res) => {
  res.render('landing-page');
}));



const port = Number.parseInt(process.env.PORT, 10) || 8081;;

app.listen(port, () => {
  console.log(`Listening on port:${port}...`);
});