const Sequelize = require("sequelize");

const db = require("../database/db.js")

const Announcement = db.define('announcements', {
    announcement_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    main_header: {
        type: Sequelize.TEXT('tiny'),
        allowNull: false
    },
    brief_info: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    full_info: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    pic_url: {
        type: Sequelize.TEXT('tiny'),
        allowNull: true
    },
    date_posted: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false,
    freezeTableName: true
})

Announcement.addAnnouncement = async function (main_header, brief_info, pic_url, content) {
    await Announcement.create({
            main_header: main_header,
            brief_info: brief_info,
            full_info: content,
            pic_url: pic_url
        })
        .then(() => console.log("Succes!"))
        .catch(err => {
            console.log(err)
        })
}

Announcement.getAnnouncements = async function () {
    return await Announcement.findAll({
        raw: true
    })
}

Announcement.getAnnouncementById = async function (id) {
    return await Announcement.findOne({
        where: {
            announcement_id: id
        }
    })
}

Announcement.updateAnnouncement = async function (id, main_header, brief_info, pic_url, content) {
    await Announcement.update({
        main_header: main_header,
        brief_info: brief_info,
        full_info: content,
        pic_url: pic_url
    }, {
        where: {
            announcement_id: id
        }
    })
}

Announcement.deleteAnnouncement = async function (id) {
    await Announcement.destroy({
        where: {
            announcement_id: id
        }
    })
}
module.exports = Announcement;

/*
 // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: true,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  tableName: 'my_very_custom_table_name'
*/