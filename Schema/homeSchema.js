const mongoose = require('mongoose');
const home = new mongoose.Schema({
    subTitle: String,
    title: String,
    offer: String,
    img: String
});
const homeSchema = mongoose.model('homeSchema', home);
module.exports = homeSchema;