/**
 * Created by vtkhoi on 1/11/2018.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: [String], index: true},
  password: String
});
//http://mongoosejs.com/docs/guide.html
//To use our schema definition,
// we need to convert our blogSchema into a Model we can work with.
module.exports = mongoose.model('User', UserSchema);
