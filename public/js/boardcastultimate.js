/**
 * socket.io宣言
 */
const WHOAMI={
    token:null,//トークン
    name:null //名前
}
$(function () {
    //送信ボタンが押されたら
    $(".btn-contain").click(function(){
        $("#message_form").submit();
        return false;
    })

    const socket=io();

    //正常に接続したら・・・
    socket.on("connect",()=>{
        console.log("接続されました");
    });

    //トークン発行されましたら・・・
    socket.on("token",(data)=>{
        WHOAMI.token=data.token;
    });

    /**
     * チャット処理
     */

    $("#message_form").submit(function(){

        //入力内容取得
        const msg=$("#artist").val();
        console.log(msg);
        if(msg===""){
            return (false);
        }

        //Socket.ioサーバへ送信
        socket.emit("post",{
            text:msg,
            token:WHOAMI.token
        });

        //発言フォームリセット
        $("#artist").val("");


    });

    /**
     * 誰かが発言
     */
    socket.on("member-post",(msg)=>{
        const is_me=(msg.token===WHOAMI.token);
        addMessage(msg,is_me);
    });

    /**
     * 発言を表示する
     * 
     * @param {object} msg
     * @param {boolean} [is_me=false]
     * @return {void}
     */

    function addMessage(msg,is_me=false){
        const list=$(".chat-thread");

        if(is_me){
            console.log("自分の発言です");
        }
        else{
            console.log("相手の発言です");
        }
    }
});

//日本地図生成
$(document).ready(function () {
    $('#jmap').jmap();
});

/**
 * Chatroom.htmlのときにのみ処理
 */

if (window.location.href.split('/').pop() == 'chat') {
    $(function () {
        $('.btn').css({
            'background-color': 'rgba(112,108,170,0.7)',
            'color': '#f3f3f2'
        });
    })
}