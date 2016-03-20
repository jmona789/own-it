var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comment: String
});

module.exports = mongoose.model("Review", reviewSchema);