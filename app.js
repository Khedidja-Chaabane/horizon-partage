var express = require('express');  //appel de la dépendance express   // de préférence mettre le nom de la variable le meme nom de la dépendance 

var app = express();  // app comme le nom du fichier // on met la dépendance express dans la variable app
var bodyParser = require('body-parser');  // on appelle la dépendance body parser

app.use(bodyParser.urlencoded({ extended: false })); // on utilise la dépendance body-parser avec l'option extended: false pour que le serveur puisse traiter les informations qui sont encodées en format urlencoded

require('dotenv').config(); // on appelle la dépendance dotenv pour charger les variables d'environnement

var cors = require('cors'); // on appelle la dépendance cors pour autoriser la récupération des donées 
app.use(cors()); // on utilise la dépendance cors pour autoriser la récupération des donées // les parentheses vides sont obligatoires pour utiliser les middleware sinon on doit spécifier les autorisations dedans

var mongoose = require('mongoose'); // on appelle la dépendance mongoose
const url = process.env.DATABASE_URL; // on récupère la variable d'environnement DATABASE_URL qui se trouve dans le fichier .env
mongoose.connect(url) // on appelle la fonction connect de mongoose avec l'url de connexion
    .then(console.log("Mongodb connectée !")) // on affiche la connexion à la base de données réussie
    .catch(error => console.log(error)); // on affiche l'erreur si la connexion à la base de données échoue
const bcrypt = require('bcrypt'); // Appel de la dépendance bcrypt
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const {createToken , validateToken} = require('./JWT');     

const methodOverride = require('method-override'); // on appelle la dépendance method-override apres son installation
app.use(methodOverride('_method')); // on utilise la dépendance method-override ; des qu'on voit un _method dans l'URL, c'est qu'on utilise la methode override
var Forum = require('./models/Forum');
var User = require('./models/User');
//PARTIE FORUM

// Création d'un nouveu post
app.post('/newPost', function (req, res) {
    const NewPost = new Forum({
        titre: req.body.titre,
        auteur: req.body.auteur,
        texte: req.body.texte,
        images: req.body.images,
    })
    NewPost.save()  // on enregistre les données dans la bdd 
        .then(() => {
            console.log("Post saved !");
            res.redirect('/forum');          // on rederige vers la page blog
        })
        .catch(error => console.log(error)); // on affiche l'erreur 
});

// récupération de tous les posts
app.get('/forum', function (req, res) {
    Forum.find()
        .then(allposts => {
            res.json(allposts);
            console.log("Récupération des données réussie !");
        })
        .catch(error => console.log(error));
});

//INSCRIPTION

//NEW USER
app.post('/api/newUser', function (req, res) {
    var Data = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        admin: false
    })
    Data.save().then(()=>{
        console.log('User saved successfully');
        res.redirect('http://localhost:3000/')
    })
    .catch((error) => console.log(error));
});

//CONNEXION

app.post('/api/connexion', function (req, res) {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found : Invalid email');
            }
 
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(404).send('Password is incorrect : Invalid password');
            }

            const accessToken = createToken(user);  // on crée le token aprés avoir verifier si l'utilisateur existe ou pas
            res.cookie("access-token", accessToken, {   // 
                maxAge: 1000 *60* 60* 24 * 30  ,  // 30 jours en millisecondes
                httpOnly: true,          // les cookies seront accessibles uniquement via une requete http 
            });

            if (user.admin == true) {
                return res.redirect('http://localhost:3000/admin');
            }

            else {
                return res.redirect('http://localhost:3000/profile/:id');
            }

        })
        .catch(error => console.log(error));
});


var server = app.listen(5000, function () {   // on lance le serveur sur le port 5000
    console.log('server running on port 5000');    //mettre un message dans la console quand le serveur est lancé

});