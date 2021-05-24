const {DataTypes} = require('sequelize')
const sequelize = require('../settings/sequelize')

const Cuenta = sequelize.define('Cuenta', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idClinica: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cedulaPaciente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
	    type: DataTypes.DATE,
 	    allowNull: true
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
    //Use createdAt field
})

module.exports = Cuenta