"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  // router.post("/insertTopping", (req, res) => {
  //   console.log("req.body", req.body)
  //   console.log(req.body.toppingName)
  //   console.log(req.body.VorN)
  //   knex
  //       .insert([{
  //         topping_name: req.body.toppingName,
  //         v_or_n: VorN
  //       }])
  //       .into('toppings')
  //       .then(function(response){
  //         console.log("YAY THIS WORKED.")
  //         //console.log("response", response)
  //       })
  // })

  // router.post("/getTopping", (req, res) => {

  // })

  return router;
}
