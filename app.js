/**
 * function
 */

function ExpressRouting(url){
    var exp=express.static(path.join(__dirname,url));
    return exp;
}

/**
 * app.js
 */

//express モジュールインスタンス生成
const crypto=require('crypto');
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

app.use('/chat', ExpressRouting('public/chatroom.html'));

app.use('/deb',ExpressRouting('public/titlewindow.html'));
//その他リクエストに対するエラー
app.use((req, res) => {
    res.sendStatus(404);
});

/**
 * Socket処理
 */
io.on('connection', function (socket) {
    //ユーザが接続
    console.log('Socketが使用されました');

    /**
     * ログイン
     */
    (()=>{
        //トークン作成
        const token=makeToken(socket.id);

        //ご本人にトークンを送る
        io.to(socket.id).emit("token",{token:token});
    })();

    /*socket.on('message', function (msg) {
        console.log(msg);
    });*/

    socket.on("post",(msg)=>{
        io.emit("member-post",msg)
        console.log("うわああああああ");
    })
});

/**
 * トークン生成
 * 
 * @param {string} id - socket.id
 * @return {string}
 */
function makeToken(id){
    const str="ouijaboarddemon"+id;
    return(crypto.createHash("sha1").update(str).digest('hex'));
}


//3000番で待受
http.listen(port, () => {
    console.log('3000番ポートで待受中です');
});