const Sequelize = require('sequelize')
const db = require('../database/db.js')
const crypto = require("crypto")

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
    },
    salt: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Admin.validPassword = function (password, compare, salt) {
    var pass = crypto.pbkdf2Sync(password,
        salt, 1000, 64, `sha512`).toString(`hex`);
    return compare === pass;
};

Admin.setPassword = function (password) {
    // creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex')

    // hashing user's salt and password with 1000 iterations, 
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
}

Admin.getAdmin = async function (username, password) {

    //let salt = crypto.randomBytes(16).toString('hex')
    //let hash = crypto.pbkdf2Sync(password, salt,
    //1000, 64, `sha512`).toString(`hex`)




    return await Admin.findOne({
        where: {
            username: username,
            password: password
        }
    })
}

Admin.getAdminByUsername = async function (username) {
    return await Admin.findOne({
        where: {
            username: username,
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