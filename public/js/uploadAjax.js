var basicTimeline = anime.timeline({
    autoplay: false
});

var pathEls = $(".check");
for (var i = 0; i < pathEls.length; i++) {
    var pathEl = pathEls[i];
    var offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline
    .add({
        targets: ".text",
        duration: 1,
        opacity: "0"
    })
    .add({
        targets: ".button",
        duration: 1300,
        height: 10,
        width: 300,
        backgroundColor: "#2B2D2F",
        border: "0",
        borderRadius: 100
    })
    .add({
        targets: ".progress-bar",
        duration: 2000,
        width: 300,
        easing: "linear"
    })
    .add({
        targets: ".button",
        width: 0,
        duration: 1
    })
    .add({
        targets: ".progress-bar",
        width: 80,
        height: 80,
        delay: 500,
        duration: 750,
        borderRadius: 80,
        backgroundColor: "#71DFBE"
    })
    .add({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: 200,
        easing: "easeInOutSine",
        complete: () => {
            window.setTimeout(function () {
                GSAPAnimation("end");
            }, 1000);
        }
    });

$(".button").click(function () {
    basicTimeline.play();
});

$(".text").click(function () {
    basicTimeline.play();
});


/**
 * Ajaxによるファイルアップロード
 */

$(function () {
    var file;
    $(".input-file").on("change", function (e) {
        file = $(this)[0].files[0];
        console.log(file)
    });

    $(".button-effect").click(function () {
        /*const userfile = $(".input-file")[0].files[0];
        const formData = new FormData(document.getElementById("upload_form"));
        formData.append("file", userfile);
        */
        var form = $("#upload_form")[0];
        var data = new FormData(form);

        $.ajax({
            url: "/upfile",
            type: "post",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("成功なり")
                GSAPAnimation("suc");
            }
        });
    });

    $("#dummybutton").click(function () {

    })
});

var prowin = $("#progressWindow");//プログレスのウィンドウ

function GSAPAnimation(flag) {
    if (flag == "suc") {
        $("#progressWindow").show();
        gsap.from(
            "#progressWindow",
            {
                y: 2400,
                duration: 1.5
            },
            0
        )
        basicTimeline.play();
    }

    else if (flag == "end") {
        $("#progressWindow").fadeOut(1500, function () {
            location.reload();
        });
    }
}