var userName: string;

$(document).ready(function () {
    $("#nav-login").click(function () {
        //todo show modal etc.
        userName = "Rolland";
        postLogin();
    }
    );
});
function postLogin(): void {
    $("#nav-login").hide();
    $("#nav-logout").removeClass("hidden");
    $.ajax({
        url : 'ajax/navbar-tabs',
        data:{userName},
        type: 'GET',

        success: function(data){
            $('#nav-placeholder').replaceWith(data);
        }
    });
}