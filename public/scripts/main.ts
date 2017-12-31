// tslint:disable: typedef interface-name

var clientUserName: string;
interface JQuery<TElement extends Node = HTMLElement> {
    jsGrid(arg1: any, arg2?: any): any;
}

interface JsGridArgs {
    item: any;
    event: JQueryEventObject;
    itemIndex: number;
}

$(document).ready(function () {

    $("#login-button").click(doLogin);
    $("#nav-logout").click(logout).hide();
});
function doLogin() {
    clientUserName = <string>$("#user-name").val();
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
        data: { clientUserName: clientUserName },
        type: "GET",
        async: true,
        success: function (data: string): void {
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
        success: function (data: string): void {
            $("#nav-tabContent").append(data);
            initJsGrid();
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

function initJsGrid() {

    var genders = [{ "Name": "Male", Id: 0 },
    { "Name": "Female", Id: 1 }];
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
        rowDoubleClick: (args: JsGridArgs) => { $("#jsGrid").jsGrid("editItem", args.item); },
        deleteConfirm: "Do you really want to delete user?",
        controller: {
            loadData: function (filter: any) {
                return $.ajax({
                    type: "GET",
                    url: "/users",
                    data: Object.assign({}, filter, { clientUserName: clientUserName }),
                    async: true
                });
            },
            insertItem: function (item: any) {
                return $.ajax({
                    type: "POST",
                    url: "/users",
                    data: item
                });
            },
            updateItem: function (item: any) {
                return $.ajax({
                    type: "PUT",
                    url: "/users",
                    data: item
                });
            },
            deleteItem: function (item: any) {
                return $.ajax({
                    type: "DELETE",
                    url: "/users",
                    data: item
                });
            }
        },
        fields: [
            { name: "firstName", title: "First Name", type: "text", width: 150 },
            { name: "lastName", title: "Last Name", type: "text", width: 150 },

            { name: "userName", title: "User Name", type: "text", width: 150 },

            { name: "email", title: "Email", type: "text", width: 150 },

            { name: "gender", title: "Gender", type: "select", items: genders, valueField: "Id", textField: "Name", width: 150 },

            { name: "address",title: "Address", type: "text", width: 200 },
            { type: "control" }
        ]
    });


}