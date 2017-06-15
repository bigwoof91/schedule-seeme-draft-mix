var Users = require('../models/users.js');

module.exports = function (app) {
  app.get("/signup", function (req, res) {

    if (req.role === "consumer") {
      Users.create({
        first_name: req.first_name,
        last_name: req.last_name,
        email: req.email,
        phone: req.phone,
        password: req.password,
        
      }).exec(function (err, data) {
        if (err) {
          res.sendFile(__dirname + "../public/index.html");
        }
        if (data === null) {
          Users.create({
            first_name: req.body.location,
            date: Date.now()
          }, function (err) {
            if (err) {
              console.log(err);
            }
            else {
              res.sendFile(__dirname + "../public/index.html");
            }
          });

        } else {
          var thisUser = {
            first_name: data.first_name,
            last_inital: data.last_inital,
            email: data.email,
            location: data.location,
            looks: data.looks
          };
          res.sendFile(__dirname + "../public/index.html", thisUser);
        }
      });
    }

    if (req.role === "requester") {
      Users.create({
        first_name: req.first_name,
        last_name: req.last_name,
        email: req.email,
        phone: req.phone,
        password: req.password,

      }).exec(function (err, data) {
        if (err) {
          res.sendFile(__dirname + "../public/index.html");
        }
        if (data === null) {
          Users.create({
            first_name: req.body.location,
            date: Date.now()
          }, function (err) {
            if (err) {
              console.log(err);
            }
            else {
              res.sendFile(__dirname + "../public/index.html");
            }
          });

        } else {
          var thisUser = {
            first_name: data.first_name,
            last_inital: data.last_inital,
            email: data.email,
            location: data.location,
            looks: data.looks
          };
          res.sendFile(__dirname + "../public/index.html", thisUser);
        }
      });
    }

    if (req.role === "account_owner") {
      Users.create({
        first_name: req.first_name,
        last_name: req.last_name,
        email: req.email,
        phone: req.phone,
        password: req.password,

      }).exec(function (err, data) {
        if (err) {
          res.sendFile(__dirname + "../public/index.html");
        }
        if (data === null) {
          Users.create({
            first_name: req.body.location,
            date: Date.now()
          }, function (err) {
            if (err) {
              console.log(err);
            }
            else {
              res.sendFile(__dirname + "../public/index.html");
            }
          });

        } else {
          var thisUser = {
            first_name: data.first_name,
            last_inital: data.last_inital,
            email: data.email,
            location: data.location,
            looks: data.looks
          };
          res.sendFile(__dirname + "../public/index.html", thisUser);
        }
      });
    }

    if (req.role === "contractor") {
      Users.create({
        first_name: req.first_name,
        last_name: req.last_name,
        email: req.email,
        phone: req.phone,
        password: req.password,

      }).exec(function (err, data) {
        if (err) {
          res.sendFile(__dirname + "../public/index.html");
        }
        if (data === null) {
          Users.create({
            first_name: req.body.location,
            date: Date.now()
          }, function (err) {
            if (err) {
              console.log(err);
            }
            else {
              res.sendFile(__dirname + "../public/index.html");
            }
          });

        } else {
          var thisUser = {
            first_name: data.first_name,
            last_inital: data.last_inital,
            email: data.email,
            location: data.location,
            looks: data.looks
          };
          res.sendFile(__dirname + "../public/index.html", thisUser);
        }
      });
    }
  });
};