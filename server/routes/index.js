const audioRoutes = require('./audioRoutes');

module.exports = function(app) {
  audioRoutes(app);
};
