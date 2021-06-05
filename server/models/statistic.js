const Joi = require('joi');
const mongoose = require('mongoose');

const Stat = mongoose.model('Stat', new mongoose.Schema({
    totalUsers: Number,

}))


// https://stackoverflow.com/questions/61051225/group-records-by-month-and-count-them-mongoose-nodejs-mongodb