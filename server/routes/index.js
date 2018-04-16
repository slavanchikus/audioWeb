const audioRoutes = require('./audioRoutes');
const userRoutes = require('./userRoutes');

module.exports = function(app) {
  audioRoutes(app);
  userRoutes(app);
};
