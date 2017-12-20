function postLogin(): void {
    $(".nav.navbar-nav").removeClass("hidden");
    $("#nav-login").addClass("hidden");
    $("#nav-logout").removeClass("hidden");
}