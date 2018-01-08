// tslint:disable: typedef interface-name
var clientUserName;
var clientUserType;
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
                clientUserType = data.userType;
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
                $("#employees-grid").jsGrid("loadData");
                $("#users-grid").jsGrid("loadData");
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
            initUsersGrid();
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
function initUsersGrid() {
    var genders = [
        { "Name": "", Id: "" },
        { "Name": "Male", Id: 1 },
        { "Name": "Female", Id: 2 }
    ];
    var fields = [
        { name: "firstName", title: "First Name", type: "text", width: 90 },
        { name: "lastName", title: "Last Name", type: "text", width: 90 },
        // user name can't be changed
        { name: "userName", editing: false, title: "User Name", type: "text", width: 150 },
        { name: "email", title: "Email", type: "text", width: 200 },
        { name: "gender", title: "Gender", type: "select", items: genders, valueField: "Id", textField: "Name", width: 70 },
        { name: "address", title: "Address", type: "text", width: 150 },
        { type: "control" }
    ];
    if (clientUserType === "Manager") {
        fields.splice(3, 0, { name: "password", title: "Password", type: "text", width: 150 });
        fields.splice(fields.length - 1, 0, {
            name: "className", title: "User Type", width: 100, type: "select", editing: clientUserType === "Manager",
            // customer cannot be edited
            items: [{ Name: null }, { Name: "Manager" }, { Name: "Customer" }, { Name: "Employee" }],
            autosearch: true,
            valueField: "Name",
            textField: "Name",
            editTemplate: function (value, item) {
                if (value === "Customer") {
                    return "Customer";
                }
                var select = $("<select/>");
                select.append($("<option/>").attr("value", "Manager").text("Manager"));
                select.append($("<option/>").attr("value", "Employee").text("Employee"));
                select.val(value);
                this.editControl = select;
                return select;
            }
        });
    }
    $("#users-grid").jsGrid({
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
        rowDoubleClick: (args) => { $("#users-grid").jsGrid("editItem", args.item); },
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
        fields: fields
    });
}
//# sourceMappingURL=main.js.map