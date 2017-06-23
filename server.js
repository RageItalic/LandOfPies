"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
 //app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


app.post("/insertTopping", (req, res) => {
  console.log("req.body", req.body)
  knex.select('topping_name')
      .from('toppings')
      .where({
        topping_name: req.body.topping_name
      }).then(function(response) {
        console.log("BUDDY, this exists already",response)
        if (!response[0]) {
          knex('toppings')
            .insert([{
              topping_name: req.body.topping_name,
              v_or_n: req.body.v_or_n
            }])
            .then(function(response){
              console.log("YAY THIS WORKED.")
              console.log("response", response)
              let templateVars = {thanks: 'Thank you for TOPPING me off.'}
              res.send(JSON.stringify(templateVars))
            })
        } else {
          let templateVariable = {thanks: 'I already know about this topping! Try Again!'}
          res.send(JSON.stringify(templateVariable))
        }
    })
})


app.post("/insertSauce", (req, res) => {
  console.log('req.body', req.body)
  knex.select('sauce_name').from('sauces').where({
    sauce_name: req.body.sauce_name
  }).then((response) =>{
    console.log('buddy this is the response', response)
    if(!response[0]){
      knex('sauces').insert([{
        sauce_name: req.body.sauce_name
      }]).then((response) => {
        console.log("Congratulations this works", response);
        let templateVars = {thanks: 'Thanks for letting me in on that SAUCY little secret!'};
        res.send(JSON.stringify(templateVars))
      })
    }else{
      let templateVariable = {thanks: 'Not saucy enough! Try again!'}
      res.send(JSON.stringify(templateVariable))
    }
  })
})

app.post('/insertCheese', (req, res) => {
  console.log('req.body', req.body);
  knex.select('cheese_name').from('cheeses').where({
    cheese_name: req.body.cheese_name
  }).then((response) => {
    console.log('buddy this is the response', response)
    if(!response[0]){
      knex('cheeses').insert([{
        cheese_name: req.body.cheese_name
      }]).then((response) => {
        console.log('buddy this works', response)
        let templateVars = {thanks: "Wow... you're so CHEESY!"}
        res.send(JSON.stringify(templateVars))
      })
    }else{
      let templateVariable = {thanks: 'CHEESY much?? Try again!'}
      res.send(JSON.stringify(templateVariable))
    }
  })
})

app.post("/getToppings", (req, res) => {
  console.log('req.body', req.body);
  knex.select('topping_name')
      .from('toppings')
      .where({
        v_or_n: req.body.v_or_n
      })
      .orderByRaw('random()')
      .limit(req.body.numberOfToppings)
      .then((response) => {
        console.log('check this response out', response)
          let templateVars = {toppings: response}
          res.send(templateVars)
      })
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
