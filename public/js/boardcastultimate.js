/**
 * socket.io宣言
 */
$(function () {
    var socket = io();

    $('#message_form').submit(function () {
        socket.emit('message', $('#input_msg').val());
        $('#input_msg').val('');
        return false;
    })
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