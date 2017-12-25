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
        url: '/login',
        data: data,
        type: 'POST',
        error: (xhr, status, err) => {
            console.error(err);
        },
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                postLogin();
            }
            else {
                ;
            }
        }
    });
}
function postLogin() {
    $("#loginModal").modal("hide");
    $("#nav-login").hide();
    $("#nav-logout").show();
    $.ajax({
        url: 'ajax/navbar-tabs',
        data: { userName },
        type: 'GET',
        success: function (data) {
            $('#nav-tabs').html(data);
        }
    });
}
function logout() {
    $("#nav-login").show();
    $("#nav-logout").hide();
    $("#nav-tabs").html("");
    //TODO remove the rest of the page content
}
//# sourceMappingURL=main.js.map