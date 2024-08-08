const mongoose = require ('mongoose');
const DonSchema = new mongoose.Schema({
    montant: {type:Number, required: true},
    dateDon: { type: Date, default: Date.now },
   
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true} // Référence au modèle User
});

module.exports = mongoose.model('Don', DonSchema); 
