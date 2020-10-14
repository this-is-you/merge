'use strict';
module.exports = function(app) {
  var bot = require('../controllers/botController');

  app.route('/pull-request/submit')
    .post(bot.handleSubmit);
};
