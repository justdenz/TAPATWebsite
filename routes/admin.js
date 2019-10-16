const express = require('express')
const session = require("express-session")
const router = express.Router()
const multer = require('multer')

const bodyparser = require("body-parser")

const urlencoder = bodyparser.urlencoded({
    extended: false
});

const Admin = require("../models/AdminModel")
const Initiative = require("../models/InitiativeModel")
const Announcement = require("../models/AnnouncementModel")

router.use(express.static(__dirname + '/public'));


router.use(session({
    resave: true,
    name: "tapatadmin",
    saveUninitialized: true,
    secret: "secretpass",
    cookie: {
        maxAge: 60 * 60 * 1000 * 24
    }
}))

/* MUTER STUFFS */

var announcement_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/announcements')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop())
    }
});

var initiatiative_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/initiatives')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.' + file.originalname.split('.').pop())
    }
});

const upload_announcement = multer({
    storage: announcement_storage
});
const upload_initiative = multer({
    storage: initiatiative_storage
});

function hasSession(req, res, next) {
    if (req.session.username == null) {
        // if user is not logged-in redirect back to login page //
        res.redirect('/admin/logout');
    } else {
        next();
    }
}


router.get("/", hasSession, (req, res) => {
    res.render("admin_home.hbs")
})

router.get("/announcements", hasSession, (req, res) => {

    Announcement.getAnnouncements().then(function (announcement) {
        res.render("admin_announce.hbs", {
            announcement: announcement
        })
    })
})

router.get("/initiatives", hasSession, (req, res) => {

    Initiative.getInitiative().then(function (initiatives) {
        res.render("admin_init.hbs", {
            init: initiatives
        })

    })

})

router.get("/new_initiative", hasSession, (req, res) => {
    res.render("admin_new_init.hbs")
})

router.get("/new_announcement", hasSession, (req, res) => {
    res.render("admin_new_announce.hbs")
})

router.post('/add_announce', upload_announcement.single('pic'), function (req, res) {

    let file_path = req.file.path;
    file_path = file_path.slice(7)

    Announcement.addAnnouncement(req.body.title, req.body.briefInfo, file_path, req.body.content).then(function () {
        res.send('1')
    }).catch(function () {
        res.send('Unable to add announcement')
    })
})

router.post("/add_init", upload_initiative.single('pic'), (req, res) => {

    let title = req.body.title
    let briefInfo = req.body.briefInfo
    let pic_url = req.file.path
    pic_url = pic_url.splice(7)

    Initiative.addInitiative(title, briefInfo, pic_url, null).then(function () {
        res.send('1')
    }).catch(function () {
        res.send('Unable to add initiative')
    })
})

router.get("/edit_init", hasSession, (req, res) => {


    let result
    Announcement.getAnnouncements().then(function (announcements) {
        result = announcements
    })


    Initiative.getInitiativeById(req.query.id).then(function (init) {
        res.render("admin_edit_init.hbs", {
            init: init,
            announcements: result
        })
    })

})

router.get("/edit_announce", hasSession, (req, res) => {

    Announcement.getAnnouncementById(req.query.id).then(function (announcement) {
        res.render("admin_edit_announce.hbs", {
            announcement: announcement
        })
    })
})

router.get("/edit_announce_submit", hasSession, (req, res) => {
    let title = req.query.title
    let briefInfo = req.query.briefInfo
    let id = req.query.id

    Announcement.updateAnnouncement(id, title, briefInfo, null, content).then(function () {
        res.send('1')
    }).catch(function () {
        res.send('Unable to update announcement')
    })
})


router.get("/delete_announce_submit", hasSession, (req, res) => {

    console.log(req.query.id)
    Announcement.deleteAnnouncement(req.query.id).then(function () {
        res.send('1')
    }).catch(function () {
        res.send('Unable to delete announcement')
    })
})


router.get("/edit_init_submit", hasSession, (req, res) => {
    let title = req.query.title
    let briefInfo = req.query.briefInfo
    let id = req.query.id


    Initiative.updateInitiative(id, title, briefInfo, null, null).then(function () {
        res.send('1')
    }).catch(function () {
        res.send('Unable to update initiative')
    })
})


router.get("/login", (req, res) => {

    if (req.session.username != null) {
        req.session.destroy((err) => {

        })
    }

    res.render("admin_login.hbs")
})

router.get("/settings", hasSession, (req, res) => {
    res.render("admin_settings.hbs")
})

router.post("/verify_user", urlencoder, (req, res) => {

    let username = req.body.username
    let password = req.body.password

    if (username.length == 0) {
        res.send("0")
    }

    Admin.getAdminByUsername(username).then(function (doc) {
        if (Admin.validPassword(password, doc.password, doc.salt)) {
            req.session.username = doc.username
            res.send("1")
        } else {
            res.send('0')
        }
    })

})

router.post("/change_password_submit", hasSession, urlencoder, (req, res) => {
    let current_password = req.body.current_password
    let new_password = req.body.new_password
    let confirm_new_password = req.body.confirm_new_pass


    if (current_password.length + new_password.length + confirm_new_password.length > 0) {
        if (new_password == confirm_new_password) {


            Admin.getAdminByUsername(req.session.username).then(function (doc) {
                if (Admin.validPassword(current_password, doc.password, doc.salt)) {

                    Admin.updateAdmin(doc.admin_id, new_password)
                        .then(res.send("1"))
                        .catch(err => res.send("error"))

                } else {
                    res.send('0')
                }
            })
        } else {
            res.send("unmatch_password")
        }
    } else {
        res.send("incomplete_requirements")
    }

})

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {

    })
    res.redirect("/admin/login")
})


module.exports = router;