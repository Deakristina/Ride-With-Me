const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProfileSchema = new Schema({
  path: String,
  originalName: String,
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  birthdate: String,
  gender: String,
  driving_license: String,
  car_type: String,
  car_color: String
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile;