const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    async postLogin(req, res) {
        var user = {
            login: req.body.login
        }
        db.Usuario.findAll({ where: { login: req.body.login, senha: req.body.senha } }).then(usuarios => {
            //console.log('Usuarios encontrados:', usuarios.length); // 👈 temporário
            if (usuarios.length > 0) {
                req.session.login = req.body.login;
                res.locals.login = req.body.login;
                if (usuarios[0].dataValues.tipo == 1) {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.admin = true;
                }
                else {
                    req.session.tipo = usuarios[0].dataValues.tipo;
                    res.locals.admin = false;
                }
                req.session.save(() => {  // 👈 garante que a session foi salva antes de redirecionar
                    res.render('home')
                });
            } else
                res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    },
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },
    async postCreate(req, res) {
        db.Usuario.create({
            login: req.body.login,
            senha: req.body.senha,
            tipo: req.body.tipo
        }).then(() => {
            res.render('home')
        }).catch((err) => {
            console.log(err);
        });
    },
    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList',
                { usuarios: usuarios.map(user => user.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },
    async getUpdate(req, res) {
        await db.Usuario.findByPk(req.params.id).then(
            usuario => res.render('usuario/usuarioUpdate', { usuario: usuario.dataValues })
        ).catch(function (err) {
            console.log(err);
        });
    },
    async postUpdate(req, res) {
        await db.Usuario.update(req.body, { where: { id: req.body.id } })
            .then(res.render('home'))
            .catch(function (err) { console.log(err) });
    },
    async getDelete(req, res) {
        await db.Usuario.destroy({ where: { id: req.params.id } })
            .then(res.render('home'))
            .catch(err => { console.log(err) });
    },
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}