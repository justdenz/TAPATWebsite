const Sequelize = require("sequelize");

const db = require("../database/db.js")

const Initiative = db.define('initiatives', {
    initiative_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.TEXT('tiny'),
        allowNull: false
    },
    brief_info: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pic_url: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true
    },
    announcement_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Initiative.addInitiative = async function (title, brief_info, pic_url, announcement_id) {
    await Initiative.create({
            title: title,
            brief_info: brief_info,
            pic_url: pic_url,
            announcement_id: announcement_id
        }).then(() => console.log("Succes!"))
        .catch(err => {
            console.log(err)
        })
}

Initiative.getInitiative = async function () {
    return await Initiative.findAll({
        raw: true
    })
}

Initiative.getInitiativeById = async function (id) {
    return await Initiative.findOne({
        where: {
            initiative_id: id
        }
    })
}

Initiative.updateInitiative = async function (id, title, brief_info, pic_url, announcement_id) {

    console.log("updating " + id)
    await Initiative.update({
        title: title,
        brief_info: brief_info,
        pic_url: pic_url,
        announcement_id: announcement_id
    }, {
        where: {
            initiative_id: id
        }
    })
}

Initiative.deleteInitiative = async function (id) {
    await Initiative.destroy({
        where: {
            initiniative_id: id
        }
    })
}
module.exports = Initiative;