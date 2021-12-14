/**
 * socket.io宣言
 */
const WHOAMI = {
    token: null,//トークン
    name: null //名前
}

if (window.location.href.split('/').pop() == 'chat') {
    $(function () {


        const socket = io();

        //正常に接続したら・・・
        socket.on("connect", () => {
            console.log("接続されました");
        });

        //トークン発行されましたら・・・
        socket.on("token", (data) => {
            WHOAMI.token = data.token;
        });

        /**
         * チャット処理
         */

        $("#message_form").submit(function () {
            //入力内容取得
            const msg = $("#artist").val();
            console.log(msg);
            if (msg === "") {
                return (false);
            }

            //Socket.ioサーバへ送信
            socket.emit("post", {
                text: msg,
                token: WHOAMI.token
            });

            //発言フォームリセット
            $("#artist").val("");

            return false;
        });

        /**
         * 誰かが発言
         */
        socket.on("member-post", (msg) => {
            const is_me = (msg.token === WHOAMI.token);
            addMessage(msg, is_me);
        });

        /**
         * 発言を表示する
         * 
         * @param {object} msg
         * @param {boolean} [is_me=false]
         * @return {void}
         */

        function addMessage(msg, is_me = false) {
            const list = document.getElementsByClassName("chat-thread")
            const li = document.createElement("li");

            if (is_me) {
                li.classList.add("partner-thread");
            }
            else {
                li.classList.add("my-thread");
            }

            li.textContent = msg.text;
            list[0].appendChild(li);
        }
    });



    /**
     * Chatroom.htmlのときにのみ処理
     */
    $(function () {
        $('.btn').css({
            'background-color': 'rgba(112,108,170,0.7)',
            'color': '#f3f3f2'
        });
    })
}

if (window.location.href.split('/').pop() == '') {
    //日本地図生成
    $(document).ready(function () {
        $('#jmap').jmap();
    });
}

/**
 * ファイルアップロード機能
 */
$(function () {
    $(".pointer-none").click(function () {
        $("input[type='file']").click();

    })

    /*$("input[type='file']").on('change', function () {
        $("#upload_form").submit();
    });
    */
})

$(function () {

    'use strict';

    $('.input-file').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();

        $input.on('change', function (element) {
            var fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
        });
    });

});
/*$(function () {
    $(".button-effect").click(function () {
        $("#upload_form").submit();
    })
})
*/