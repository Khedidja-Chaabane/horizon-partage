const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    type: {type:String, required:true},
    titre: {type:String, required:true},
    description: {type:String, required:true},
    tarif: {type:Number, required:true},
    image: {type:String, required:true},
    date: {type:Date, required:true},
    lieu: {type:String, required:true},
    datePublication: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Action', ActionSchema);