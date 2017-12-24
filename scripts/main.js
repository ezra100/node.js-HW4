var userName;
$(document).ready(function () {
    $("#nav-login").click(function () {
        //todo show modal etc.
        userName = "Rolland";
        postLogin();
    });
});
function postLogin() {
    $("#nav-login").hide();
    $("#nav-logout").removeClass("hidden");
    $.ajax({
        url: 'ajax/navbar',
        data: { userName },
        type: 'GET',
        success: function (data) {
            $('#nav-placeholder').replaceWith(data);
        }
    });
}
//# sourceMappingURL=main.js.map