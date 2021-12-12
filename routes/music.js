const router = require("express").Router();
const fs = require("fs");
//var json = require("../public/userdata/json/usermusiclist.json");

var platform = ["YouTube", "niconico"];
var mp3joinimg = new Object();

router.get("/", (req, res) => {
    fs.readdir('./public/userdata/mp3', (err, files) => {
        fs.readdir('./public/userdata/musicimg', (e, msfiles) => {
            /*
            var json = fs.readFileSync("./public/userdata/json/usermusiclist.json", "utf-8")
            var obj = JSON.parse(json)
            var musiclist = obj.music;

            var title = [];
            var list = [];

            for (i in musiclist) {
                var DeleteExpandMusicFileName = files[i].split('.').slice(0, -1).join('.');

                title = musiclist[i];
                list[i] = title.title;
                console.log(list[i])
            }

            */

            //やること
            //画像とmp3ファイルの関連付け
            for (i in files) {
                var DeleteExpandMusicFileName = files[i].split('.').slice(0, -1).join('.');
            }

            const data = {
                music: files,
                plat: platform,
                msimg: msfiles,
                music_name: DeleteExpandMusicFileName
            }
            res.render("music.ejs", data);
        })
    })
})
module.exports = router;