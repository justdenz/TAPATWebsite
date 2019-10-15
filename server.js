const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
//DB
const db = require("./database/db");
//Test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));


// url encoder
const urlencoder = bodyparser.urlencoded({
    extended: false
});

const app = express()
const PORT = 3000

app.use(cors()) //this is to allow vue to get data from localhost:3000
app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs")

app.use('/admin', require('./routes/admin.js'));

//////// GUEST STATIC ROUTES ///////////

app.get("/", (req, res) => {
    res.render("home.hbs")
})

app.use("/initiatives", require("./routes/initiatives"))
app.use("/announcements", require("./routes/announcements"))

app.listen(PORT, function () {
    console.log('port ' + PORT + ' is live');
})