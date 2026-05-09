const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getCreate(req, res) {
        var categorias = await db.Categoria.findAll();
        res.render('receita/receitaCreate',
            { categorias: categorias.map(catg => catg.toJSON()) });
    },
    async postCreate(req, res) {
        db.Receita.create({
            nome: req.body.nome,
            ingredientes: req.body.ingredientes,
            preparo: req.body.preparo,
            imagem: req.imageName,  // 👈 vem do Multer no route.js
            //categoriaId: req.body.categoriaId,
             categoriaNome: req.body.categoriaId  // 👈 agora recebe o nome
        }).then(() => { res.render('home') })
            .catch((err) => { console.log(err) });
    },
    async getList(req, res) {
        db.Receita.findAll()
            .then(receitas => {
                res.render('receita/receitaList',
                    { receitas: receitas.map(receita => receita.toJSON()) })
            }).catch((err) => { console.log(err) });
    },
    async getUpdate(req, res) {
        var categorias = await db.Categoria.findAll();
        await db.Receita.findByPk(req.params.id)
            .then(
                receita => res.render('receita/receitaUpdate', {
                    receita: receita.dataValues,
                    categorias: categorias.map(catg => catg.toJSON())
                })
            ).catch(function (err) { console.log(err) });
    },
    async postUpdate(req, res) {
        await db.Receita.update({
            nome: req.body.nome,
            ingredientes: req.body.ingredientes,
            preparo: req.body.preparo,
            imagem: req.imageName,  // 👈 vem do Multer
            //categoriaId: req.body.categoriaId
            categoriaNome: req.body.categoriaId  // 👈 agora recebe o nome
        }, { where: { id: req.body.id } })
            .then(res.render('home'))
            .catch(function (err) { console.log(err) });
    },
    async getDelete(req, res) {
        await db.Receita.destroy({ where: { id: req.params.id } })
            .then(res.render('home'))
            .catch(err => { console.log(err) });
    }
}