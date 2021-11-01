/**
 * /app.js
 */

//express モジュールインスタンス生成
const express = require('express');
const app = express();
const port = process.env.port || 3000;

//socketモジュール
var http = require('http').Server(app);
const io = require('socket.io')(http);

//path指定モジュール
const path = require('path');

//静的ファイルのルーティング
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/chat', express.static(path.join(__dirname, 'public/chatroom.html')));
//その他リクエストに対するエラー
app.use((req, res) => {
    res.sendStatus(404);
});

//Socket処理
io.on('connection', function (socket) {
    console.log('接続されています！');

    socket.on('message', function (msg) {
        console.log(msg);
    });
});

//3000番で待受
http.listen(port, () => {
    console.log('3000番ポートで待受なう');
});