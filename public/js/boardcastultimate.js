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