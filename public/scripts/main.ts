// tslint:disable: typedef interface-name




var clientUserName: string;
var clientUserType: string;


$(function () {
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
                $("#users-grid").jsGrid("loadData");
            });
            $("a[data-toggle=\"tab\"][href=\"#nav-branches\"]").on("shown.bs.tab", function (e) {
                $("#branches-grid").jsGrid("loadData");
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
            initUsersGrid();
            initBranchesGrid();
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



function initUsersGrid() {
    var genders: any[] = [
        { "Name": "", Id: "" },
        { "Name": "Male", Id: 1 },
        { "Name": "Female", Id: 2 }];
    var fields: (Partial<JsGrid.JsGridField> | any)[] = [
        { name: "firstName", title: "First Name", type: "text", width: 90 },
        { name: "lastName", title: "Last Name", type: "text", width: 90 },
        // user name can't be changed
        { name: "userName", editing: false, title: "User Name", type: "text", width: 120 },
        { name: "email", title: "Email", type: "text", width: 200 },
        {
            name: "gender", title: "Gender", type: "select", items: genders, valueField: "Id",
            textField: "Name", valueType: "number", width: 70
        },
        { name: "address", title: "Address", type: "text", width: 150 },
        { type: "control" }
    ];
    if (clientUserType === "Manager") {
        fields.splice(3, 0,
            { name: "password", title: "Password", type: "text", width: 100 }
        );
        fields.splice(fields.length - 1, 0,
            {
                name: "className", title: "User Type", width: 100, type: "select", editing: clientUserType === "Manager",
                // customer cannot be edited
                items: [{ Name: null }, { Name: "Manager" }, { Name: "Customer" }, { Name: "Employee" }, { Name: "Provider" }],
                autosearch: true,
                valueField: "Name",
                textField: "Name",
                editTemplate: function (value: string, item: any): JQuery<HTMLElement> | string {
                    if (value === "Customer" || value === "Provider") {
                        return value;
                    }
                    var select = $("<select/>");
                    select.append($("<option/>").attr("value", "Manager").text("Manager"));
                    select.append($("<option/>").attr("value", "Employee").text("Employee"));

                    select.val(value);
                    this.editControl = select;
                    return select;
                }

            },
        );
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
        rowDoubleClick: (args: JsGrid.JsGridArgs) => { $("#users-grid").jsGrid("editItem", args.item); },
        deleteConfirm: (item: any) => "Do you really want to delete " + item.userName + "?",
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

function initBranchesGrid() {

    var fields: (Partial<JsGrid.JsGridField> | any)[] = [
        { name: "id", title: "ID", editable: false, type: "number", align: "center" },
        { name: "name", title: "Branch Name", type: "text" },
        { name: "address", title: "Address", type: "text" },
        { name: "active", title: "Active", type: "checkbox" },

        { type: "control", deleteButton: false }
    ];

    $("#branches-grid").jsGrid({
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
        rowDoubleClick: (args: JsGrid.JsGridArgs) => { $("#branches-grid").jsGrid("editItem", args.item); },
        deleteConfirm: (item: any) => "Do you really want to delete " + item.name + "?",
        controller: {
            loadData: function (filter: any) {
                var data = { filter: filter, clientUserName };
                return $.ajax({
                    type: "GET",
                    url: "/branches",
                    data: data,
                    async: true
                });
            },
            insertItem: function (item: any) {
                return $.ajax({
                    type: "POST",
                    url: "/branches",
                    data: { item }
                });
            },
            updateItem: function (item: any) {
                return $.ajax({
                    type: "PUT",
                    url: "/branches",
                    data: { item }
                });
            },
            deleteItem: function (item: any) {
                return $.ajax({
                    type: "DELETE",
                    url: "/branches",
                    data: { item }
                });
            }
        },
        fields: fields
    });

}

function contactFormSubmit(e: Event): boolean {
    e.preventDefault();
    var firstName = $("#contact-form").find("#first-name").val();
    var div = $("<div/>");
    var thanksH = $("<h3/>");
    thanksH.text("thanks for contacting us, " + firstName + "!");

    var subThanks = $("<p/>");
    subThanks.text("We appreciate you contacting us. One of our colleagues will get back to you shortly.");
    var button = $("<button/>");
    button.text("Submit another form");
    button.click(() => {
        div.remove();
        $("#contact-form").show();
        // reset form:
        (<HTMLFormElement>$("#contact-form")[0]).reset();
    });
    div.append(thanksH, subThanks, button);
    $("#nav-contact-us").append(div);
    $("#contact-form").hide();
    return false;
}