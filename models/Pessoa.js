const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize ('sqlite::memory:'); 
const db = require('../db/connection');

const Pessoa = db.define('Pessoa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [0, 40], 
                msg: 'Nome não pode passar de 40 caracteres'
            }
        }
    },
    DataNasc: {
        type: DataTypes.STRING
    },
    Endereco: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [0, 50], 
                msg: 'Endereço não pode passar de 50 caracteres'
            }
        }
    },
    Telefone: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: {
                msg: 'Email tem que ser um endereço de e-mail válido'
            }
        }
    },
}, {
        timestamps: false
});

module.exports = Pessoa;