const router = require("express").Router();
const fs = require("fs");

router.get("/", (req, res) => {

    res.render("screensharing.ejs")

})
module.exports = router;