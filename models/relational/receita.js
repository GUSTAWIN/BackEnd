module.exports = (sequelize, Sequelize) => {
    const Receita = sequelize.define('receita', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
        nome: { type: Sequelize.STRING, allowNull: false },
        ingredientes: { type: Sequelize.STRING, allowNull: false },
        preparo: { type: Sequelize.STRING, allowNull: false },
        imagem: { type: Sequelize.STRING, allowNull: false },
        //categoriaId: { type: Sequelize.INTEGER, allowNull: false },
        categoriaNome: { type: Sequelize.STRING, allowNull: false }
    });
    return Receita;
}