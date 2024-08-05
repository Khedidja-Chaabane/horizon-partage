const mongoose = require('mongoose'); // On appelle la dépendance mongoose

const ForumSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    texte: { type: String, required: true },
    images: [{ type: String }], // Tableau de chaînes pour les URLs des images
    datePublication: { type: Date, default: Date.now },
  });


module.exports = mongoose.model('Forum', ForumSchema); // Exportation du modèle Blog
