const Sequelize = require('sequelize')
const db = require('../database/db.js')

const Admin = db.define('admin', {
    admin_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    username: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Admin.getAdmin = async function(username, password){
    return await Admin.findOne({
        where: {
            username: username,
            password: password
        }
    })

}

Admin.updateAdmin = async function(id, password){
    await Admin.update({
        password: password
    }, {
        where: {
            admin_id: id
        }
    })
}

module.exports = Admin