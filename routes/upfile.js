const router = require("express").Router();
const fs = require("fs");
const moment = require("moment");

router.get("/", (req, res) => {
    fs.readdir('./public/userdata/img', (err, files) => {

        //日付
        var now = moment();
        var date = now.format('YYYY年MM月DD日');

        const data = {
            title: "ミヤ",
            files: files,
            date: date
        }
        res.render("upload.ejs", data)
    })
});
module.exports = router;