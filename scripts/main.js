// tslint:disable: typedef
var userName;
$(document).ready(function () {
    $("#login-button").click(doLogin);
    $("#nav-logout").click(logout).hide();
});
function doLogin() {
    userName = $("#user-name").val();
    var data = {
        "userName": $("#user-name").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "/login",
        data: data,
        type: "POST",
        error: (xhr, status, err) => {
            switch (xhr.status) {
                case 400:
                    printError("User with corresponding user-name not found");
                    break;
                case 401:
                    printError("Wrong Password");
            }
        },
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                postLogin();
            }
            else {
                console.log("status is " + xhr.status);
            }
        }
    });
}
function postLogin() {
    $("#loginModal").modal("hide");
    $("#nav-login").hide();
    $("#nav-logout").show();
    $.ajax({
        url: "ajax/navbar-tabs",
        data: { userName },
        type: "GET",
        success: function (data) {
            $("#nav-tabs").html(data);
        }
    });
}
function logout() {
    $("#nav-login").show();
    $("#nav-logout").hide();
    $("#nav-tabs").html("");
    // todo remove the rest of the page content
}
function printError(msg) {
    var alert = $("<div/>");
    alert.addClass("alert alert-danger alert-dismissable");
    alert.text(msg);
    alert.hide();
    $("#modal-error-msg").html("");
    $("#modal-error-msg").append(alert);
    alert.toggle("highlight");
}
//# sourceMappingURL=main.js.map