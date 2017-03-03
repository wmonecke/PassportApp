const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const roomSchema = Schema({
  name: { type: String, required: true },
  description: String,
  picture: String,
  // We are saving a string that refers to the image, thats why the type is string.
  owner: { type: Schema.Types.ObjectId, ref: 'User' } //ref: means the field 'owner' is referenced to a certain user, that we define when we save a new room.
  // Schema.Types.ObjectID is a type. if you go to mongo db and look up an _id it will give you ObjectId('blah').
});
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
