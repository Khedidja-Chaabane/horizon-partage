const mongoose = require('mongoose'); // On appelle la dépendance mongoose

const BlogSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    texte: { type: String, required: true },
    images: [{ type: String }], // Tableau de chaînes pour les URLs des images
    datePublication: { type: Date, default: Date.now },
    commentaires: [CommentSchema] // Tableau de sous-documents pour les commentaires
  });

const CommentSchema = new mongoose.Schema({
  auteur: { type: String, required: true },
  message: { type: String, required: true },  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema); // Exportation du modèle Blog
