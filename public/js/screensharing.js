var localvideo = null;
function gotLocalMediaStream(mediaStream) {
    localvideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
    console.log("画面共有機能:", error);
}

$(function () {
    //画面サイズ取得
    var sw = window.parent.screen.width;
    var sh = window.parent.screen.height;
    //sw : sh=x :480;=>x=480*sw/sh;
    var x = Math.floor(480 * sw / sh);
    $("#vsharing").css({ width: x });


    var mediaStreamConstrains = { video: true };
    localvideo = document.getElementById("vsharing");

    navigator.mediaDevices.getDisplayMedia(mediaStreamConstrains).then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
})