const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_id: {
    type: String,
    required: true,
    unique: true
  },
  designation: {
    type: String,
    required: true
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
