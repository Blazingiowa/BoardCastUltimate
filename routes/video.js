const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {
    fs.readdir('./public/userdata/video', (err, videos) => {

        for (i in videos) {
            var DeleteExpandMusicFileName = videos[i].split('.').slice(0, -1).join('.');
        }

        const data = {
            videos: videos,
            videoname: DeleteExpandMusicFileName
        }
        res.render("video.ejs", data)
    })

})
module.exports = router;