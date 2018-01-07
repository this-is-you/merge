const request = require('request');

exports.handleSubmit = function(req, res) {
  console.log(req.body);
 res.json({message: "Awesome"});
}
