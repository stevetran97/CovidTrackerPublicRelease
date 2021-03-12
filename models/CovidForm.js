const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FormSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  feelsSick: {
    type: String,
    required: true
  },
  recentTravel: {
    type: String,
    required: true
  },
  covidContacted: {
    type: String,
    required: true
  },
});

module.exports = CovidForm = mongoose.model('item', FormSchema);
