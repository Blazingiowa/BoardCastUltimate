const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("video.ejs")
})
module.exports = router;