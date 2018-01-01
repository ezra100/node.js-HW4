// tslint:disable: typedef interface-name
/**
 * todo:
 * some order in the code - add DB interface
 * Tabs - dark ui
 * implement Branches, About page
 * add responsiveness to page
 */
var clientUserName;
$(document).ready(function () {
    $("#login-button").click(doLogin);
    $("#nav-logout").click(logout).hide();
});
function doLogin() {
    clientUserName = $("#user-name").val();
    var data = {
        "clientUserName": $("#user-name").val(),
        "password": $("#password").val()
    };
    $.ajax({
        url: "/login",
        data: data,
        async: true,
        type: "POST",
        error: (xhr, status, err) => {
            switch (xhr.status) {
                case 400:
                    printLoginError("User with corresponding user-name not found");
                    break;
                case 401:
                    printLoginError("Wrong Password");
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
        data: { clientUserName: clientUserName },
        type: "GET",
        async: true,
        success: function (data) {
            $("#nav-tabs").html(data);
            // load the grid when the tab is shown
            $("a[data-toggle=\"tab\"][href=\"#nav-users\"]").on("shown.bs.tab", function (e) {
                $("#jsGrid").jsGrid("loadData");
            });
        }
    });
    $.ajax({
        url: "ajax/tab-panes",
        data: { clientUserName: clientUserName },
        type: "GET",
        async: true,
        success: function (data) {
            $("#nav-tabContent").append(data);
            initJsGrid();
        }
    });
}
function logout() {
    $("#nav-login").show();
    $("#nav-logout").hide();
    $("#nav-tabs").html("");
    var save = $("#nav-about").detach();
    save.addClass("active show");
    $("#nav-tabContent").empty().append(save);
}
function printLoginError(msg) {
    var alert = $("<div/>");
    alert.addClass("alert alert-danger alert-dismissable");
    alert.text(msg);
    alert.hide();
    $("#modal-error-msg").html("");
    $("#modal-error-msg").append(alert);
    alert.toggle("highlight");
}
function initJsGrid() {
    var genders = [
        { "Name": "", Id: "" },
        { "Name": "Male", Id: 0 },
        { "Name": "Female", Id: 1 }
    ];
    $("#jsGrid").jsGrid({
        width: "100%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: false,
        pageSize: 10,
        height: "auto",
        pageButtonCount: 5,
        rowClick: null,
        rowDoubleClick: (args) => { $("#jsGrid").jsGrid("editItem", args.item); },
        deleteConfirm: "Do you really want to delete user?",
        controller: {
            loadData: function (filter) {
                var data = { filter: filter, clientUserName };
                return $.ajax({
                    type: "GET",
                    url: "/users",
                    data: data,
                    async: true
                });
            },
            insertItem: function (item) {
                return $.ajax({
                    type: "POST",
                    url: "/users",
                    data: { item }
                });
            },
            updateItem: function (item) {
                return $.ajax({
                    type: "PUT",
                    url: "/users",
                    data: { item }
                });
            },
            deleteItem: function (item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/users",
                    data: { item }
                });
            }
        },
        fields: [
            { name: "firstName", title: "First Name", type: "text", width: 150 },
            { name: "lastName", title: "Last Name", type: "text", width: 150 },
            { name: "userName", editing: false, title: "User Name", type: "text", width: 150 },
            { name: "email", title: "Email", type: "text", width: 150 },
            { name: "gender", title: "Gender", type: "select", items: genders, valueField: "Id", textField: "Name", width: 150 },
            { name: "address", title: "Address", type: "text", width: 200 },
            { type: "control" }
        ]
    });
}
//# sourceMappingURL=main.js.map