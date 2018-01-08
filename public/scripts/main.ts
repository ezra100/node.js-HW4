// tslint:disable: typedef interface-name




var clientUserName: string;
var clientUserType: string;


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
                clientUserType = data.userType;
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
                $("#employees-grid").jsGrid("loadData");
                $("#customers-grid").jsGrid("loadData");
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
            initCustomersGrid();
        }
    });
}

function logout(): void {
    $("#nav-login").show();
    $("#nav-logout").hide();
    $("#nav-tabs").html("");
    var save = $("#nav-about").detach();
    save.addClass("active show");
    $("#nav-tabContent").empty().append(save);
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

function initCustomersGrid() {

    var genders: any[] = [
        { "Name": "", Id: "" },
        { "Name": "Male", Id: 1 },
        { "Name": "Female", Id: 2 }];
    var fields: Partial<jsGrid.JsGridField>[] = [
        { name: "firstName", title: "First Name", type: "text", width: 150 },
        { name: "lastName", title: "Last Name", type: "text", width: 150 },
        // user name can't be changed
        { name: "userName", editing: false, title: "User Name", type: "text", width: 150 },
        { name: "email", title: "Email", type: "text", width: 150 },
        { name: "gender", title: "Gender", type: "select", items: genders, valueField: "Id", textField: "Name", width: 150 },
        { name: "address", title: "Address", type: "text", width: 200 },
        { type: "control" }
    ];
    if (clientUserType === "Manager") {
        fields.splice(3, 0,
            { name: "password", title: "Password", type: "text", width: 150 }
        );
    }
    $("#customers-grid").jsGrid({
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
        // tslint:disable-next-line:no-empty
        rowClick: () => { },
        rowClass: "",
        rowDoubleClick: (args: jsGrid.JsGridArgs) => { $("#customers-grid").jsGrid("editItem", args.item); },
        deleteConfirm: "Do you really want to delete user?",
        controller: {
            loadData: function (filter: any) {
                var data = { filter: filter, clientUserName };
                return $.ajax({
                    type: "GET",
                    url: "/users",
                    data: data,
                    async: true
                });
            },
            insertItem: function (item: any) {
                return $.ajax({
                    type: "POST",
                    url: "/users",
                    data: { item }
                });
            },
            updateItem: function (item: any) {
                return $.ajax({
                    type: "PUT",
                    url: "/users",
                    data: { item }
                });
            },
            deleteItem: function (item: any) {
                return $.ajax({
                    type: "DELETE",
                    url: "/users",
                    data: { item }
                });
            }
        },
        fields: fields
    });

}

function initEmployeesGrid
    () {
    var genders: any[] = [
        { "Name": "", Id: "" },
        { "Name": "Male", Id: 1 },
        { "Name": "Female", Id: 2 }];
    var fields: Partial<jsGrid.JsGridField>[] = [
        { name: "firstName", title: "First Name", type: "text", width: 150 },
        { name: "lastName", title: "Last Name", type: "text", width: 150 },
        // user name can't be changed
        { name: "userName", editing: false, title: "User Name", type: "text", width: 150 },
        { name: "password", title: "Password", type: "text", width: 150 },

        { name: "email", title: "Email", type: "text", width: 150 },
        { name: "gender", title: "Gender", type: "select", items: genders, valueField: "Id", textField: "Name", width: 150 },
        { name: "address", title: "Address", type: "text", width: 200 },
        { type: "control" }
    ];


    $("#employees-grid").jsGrid({
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
        // tslint:disable-next-line:no-empty
        rowClick: () => { },
        rowClass: "",
        rowDoubleClick: (args: jsGrid.JsGridArgs) => { $("#employees-grid").jsGrid("editItem", args.item); },
        deleteConfirm: "Do you really want to delete user?",
        controller: {
            loadData: function (filter: any) {
                var data = { filter: filter, clientUserName };
                return $.ajax({
                    type: "GET",
                    url: "/employees",
                    data: data,
                    async: true
                });
            },
            insertItem: function (item: any) {
                return $.ajax({
                    type: "POST",
                    url: "/employees",
                    data: { item }
                });
            },
            updateItem: function (item: any) {
                return $.ajax({
                    type: "PUT",
                    url: "/employees",
                    data: { item }
                });
            },
            deleteItem: function (item: any) {
                return $.ajax({
                    type: "DELETE",
                    url: "/employees",
                    data: { item }
                });
            }
        },
        fields: fields
    });


}