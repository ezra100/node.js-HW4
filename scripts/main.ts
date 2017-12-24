var userName: string;

$(document).ready(function () {

    $("#login-button").click(doLogin);

});
function doLogin() {
    userName = <string>$("user-name").val();
    var data = {
        "userName": $("#user-name").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: '/login',
        data: data,

        type: 'POST',
        error:(xhr, status, err) =>{
            console.error(err);
        }
        ,
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                postLogin();
            } else {
                ;
            }
        }
    });
}

function postLogin(): void {
    $("#loginModal").modal("hide");
    $("#nav-login").hide();
    $("#nav-logout").removeClass("hidden");
    $.ajax({
        url: 'ajax/navbar-tabs',
        data: { userName },
        type: 'GET',

        success: function (data) {
            $('#nav-placeholder').replaceWith(data);
        }
    });
}