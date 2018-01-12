var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/chatApp', function (err) {
  if (err) {
    throw  err;
    console.log("Connect Success!!!!");
  }
});
