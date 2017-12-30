// tslint:disable: typedef

var userName: string;

$(document).ready(function () {

    $("#login-button").click(doLogin);
    $("#nav-logout").click(logout).hide();
});
function doLogin() {
    userName = <string>$("#user-name").val();
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
                    printLoginError("User with corresponding user-name not found");
                    break;
                case 401:
                    printLoginError("Wrong Password");
            }
        }
        ,
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                postLogin();
            } else {
                console.log("status is " + xhr.status);
            }
        }
    });
}

function postLogin(): void {
    $("#loginModal").modal("hide");
    $("#nav-login").hide();
    $("#nav-logout").show();
    $.ajax({
        url: "ajax/navbar-tabs",
        data: {clientUserName: userName },
        type: "GET",

        success: function (data: string): void {
            $("#nav-tabs").html(data);
        }
    });
    $.ajax({
        url: "ajax/tab-panes",
        data: {clientUserName:  userName },
        type: "GET",

        success: function (data: string): void {
            $("#nav-tabContent").append(data);
        }
    });
}

function logout(): void {
    $("#nav-login").show();
    $("#nav-logout").hide();
    $("#nav-tabs").html("");
    // todo remove the rest of the page content
}

function printLoginError(msg: string) {
    var alert = $("<div/>");
    alert.addClass("alert alert-danger alert-dismissable");
    alert.text(msg);
    alert.hide();
    $("#modal-error-msg").html("");
    $("#modal-error-msg").append(alert);
    alert.toggle("highlight");
}

