const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    title:{
        type:String,
        required:true
    }
},{timestamps:true});

const dataModel = mongoose.model("tododata",dataSchema);

module.exports = dataModel;