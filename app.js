/**
 * function
 */

function ExpressRouting(url) {
    var exp = express.static(path.join(__dirname, url));
    return exp;
}

function Routing(url) {
    switch (url) {
        case "/upload":
            app.use(url, require("./routes/upfile.js"));
            break;
        case "/video":
            app.use(url, require("./routes/video.js"));
            break;
        case "/music":
            app.use(url, require("./routes/music.js"));
            break;
        case "/vscreen":
            app.use(url, require("./routes/screen.js"));
            break;
    }
}

/**
 * app.js
 */

//express モジュールインスタンス生成
const crypto = require('crypto');
const express = require('express');
const app = express();
const port = process.env.port || 3000;
const multer = require("multer");
const { type } = require("os");

//socketモジュール
var http = require('http').Server(app);
const io = require('socket.io')(http);
const https = require('https');

//https
const sslServerkey = "server-key.pem";
const sslServerCrt = "server-crt.pem";
const fs = require('fs');

var options = {
    key: fs.readFileSync(sslServerkey),
    cert: fs.readFileSync(sslServerCrt)
};

//path指定モジュール
const path = require('path');
const { fstat } = require("fs");
const { request } = require("http");
const { response } = require("express");

//ejs設定
app.set("view engine", "ejs");

//静的ファイルのルーティング

//ejsファイルのルーティング
Routing("/upload");
Routing("/video");
Routing("/music");
Routing("/vscreen");


app.use("/", express.static(path.join(__dirname, 'public')))
app.use('/chat', ExpressRouting('public/chatroom.html'));
app.use('/deb', ExpressRouting('public/titlewindow.html'));
//app.use('/upload', ExpressRouting('public/upload.html'));
//その他リクエストに対するエラー
//主な拡張子
const Expand = [".png", ".jpg", ".jpeg", ".mp3", ".wav", ".wave", ".aac", ".flac"];

function CheckExpand(originalname, fileExpandQue) {
    var name = path.extname(originalname);

    for (var i = 0; i < fileExpandQue.length; i++) {
        if (name == fileExpandQue[i]) {
            if (i <= 2) {
                return "img"
            }

            else if (i > 2) {
                return "music"
            }
        }
    }
    return "undifind"
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var fileExpand = CheckExpand(file.originalname, Expand);
        if (fileExpand == "img") {
            cb(null, './public/userdata/img/');
        }

        else if (fileExpand == "music") {
            cb(null, './public/userdata/mp3/');
        }

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
app.post('/upfile', upload.single('files'), function (req, res) {
    res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
})

/**
 * Socket処理
 */
io.on('connection', function (socket) {
    //ユーザが接続
    console.log('Socketが使用されました');

    /**
     * ログイン
     */
    (() => {
        //トークン作成
        const token = makeToken(socket.id);

        //ご本人にトークンを送る
        io.to(socket.id).emit("token", { token: token });
    })();

    /*socket.on('message', function (msg) {
        console.log(msg);
    });*/

    socket.on("post", (msg) => {
        io.emit("member-post", msg)
        console.log("うわああああああ");
    })
});

/**
 * トークン生成
 * 
 * @param {string} id - socket.id
 * @return {string}
 */
function makeToken(id) {
    const str = "ouijaboarddemon" + id;
    return (crypto.createHash("sha1").update(str).digest('hex'));
}

var server = https.createServer(options, app);
//3000番で待受
server.listen(port, () => {
    console.log('3000番ポートで待受中です');
});