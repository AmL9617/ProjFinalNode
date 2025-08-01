const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`)
});

app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
    helpers: {
        constructUrl: function(id) {
            return `/pessoas/view/${id}`;
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

db 
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco de dados.");
    })
    .catch(err => {
        console.log('Teve um erro ao conectar ao banco', err);
});


app.get('/', (req, res) => {
    res.render('index');
});

//app.use(bodyParser.json());
app.use('/pessoas', require('./routes/pessoas'));