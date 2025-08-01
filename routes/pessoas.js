const express = require('express');
const router = express.Router();
const Pessoa = require('../models/Pessoa');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


//Teste
router.get('/test', (req, res) => {
    res.send('Deu certo');
})

router.get('/view/:id', (req, res) => {
    // Retrieve the id parameter from the URL
    const pessoaId = req.params.id;

    // Find the Pessoa record by id
    Pessoa.findOne({
        where: { id: pessoaId }
    })
    .then(pessoa => {
        if (!pessoa) {
            // Handle case when no Pessoa is found with the given id
            return res.status(404).send('Pessoa not found');
        }

        // Log the pessoa object to verify the retrieved data
        console.log('Retrieved Pessoa:', pessoa);

        // Render the 'view' template with the retrieved pessoa object
        res.render('view', { pessoa });
    })
    .catch(err => {
        // Handle any errors that occur during the database query
        console.error('Error finding Pessoa:', err);
        res.status(500).send('Error finding Pessoa');
    });
});

router.get('/add', (req, res) => {
    res.render('add');
})

//Post
router.post('/add', (req, res) => {
    let {Nome, DataNasc, Endereco, Telefone, Email} = req.body;

    Pessoa.create({
        Nome,
        DataNasc,
        Endereco,
        Telefone,
        Email
    })
    .then(() => res.redirect('/pessoas/get'))
    .catch(err => console.log(err));
});

//Get
router.get('/get', (req, res) => {
    let search = req.query.pessoa;
    let query = '%'+search+'%';

    if(!search){
        Pessoa.findAll({order: [
            ['id', 'DESC']
        ]})
        .then(pessoas => {
            res.render('get', {
                pessoas
            });
        })
    } else{
        Pessoa.findAll({
            where: {Nome: {[Op.like]: query}},
            order: [
            ['id', 'DESC']
        ]})
        .then(pessoas => {
            res.render('get', {
                pessoas, search
            });
        })
        .catch(err => console.log(err));
    }
})

//Tabela
router.get('/surprise', async (req, res) => {
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yayy</title>
    <link href="/css/styles.css" rel="stylesheet" />
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <img src="/YiB0qoj.jpg" alt="yay">
    <a class="btn btn-primary btn-xl" href="/">Voltar</a>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
</body>
</html>`;

    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
});


module.exports = router;
