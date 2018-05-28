// tslint:disable: typedef interface-name

import { Flower } from "./types";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";


var clientUserName: string;
var clientUserType: string;



$(function () {
    $("#login-button").click(doLogin);
    $("#nav-logout").click(logout).hide();
     $("#nav-update-details").hide();
    if (this.location.pathname.toLowerCase() === "/index") {
        postLogin();
    }
});

function sha512(password: string, salt: string): string {
    var shaObj = new jsSHA("SHA-512", "TEXT");
    shaObj.setHMACKey(salt, "TEXT");
    shaObj.update(password);
    return shaObj.getHMAC("HEX");
}
async function doLogin() {

    let form = $("#login-form");
    clientUserName = <string>form.find("[name='username']").val();
    let password: string = <string>form.find("[name='password']").val();

    let salts: {
        tempSalt: string
        permSalt: string
    } = await $.ajax({
        url: "/salts",
        data: { user: { username: clientUserName } },
        method: "POST",
        error: (xhr, status, err) => console.log(err)
    });

    let hashedPassword = sha512(sha512(password, salts.permSalt), salts.tempSalt);

    var data = {
        "username": form.find("[name='username']").val(),
        "password": hashedPassword
    };
    $.ajax({
        url: "/login",
        data: data,
        async: true,
        method: "POST",
        error: (xhr, status, err) => {

            printLoginError(err);

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

// after login is confirmed, change the page programically
function postLogin(): void {
    history.replaceState("index", "Main Index", "/index");
    $("#modal-error-msg").html("");
    $("#loginModal").modal("hide");
    $("#nav-login").hide();
    $("#nav-signup").hide();

    $("#nav-logout").show();
    $("#nav-update-details").show();

    refreshProfileImage();
    $("#nav-profile-img").show();
    $("#nav-tabs").load("ajax/navbar-tabs", { clientUserName: clientUserName }, function (): void {
        // load the grid when the tab is shown
        $("a[data-toggle=\"tab\"][href=\"#nav-users\"]").on("shown.bs.tab", function (e) {
            $("#users-grid").jsGrid("loadData");
        });
        $("a[data-toggle=\"tab\"][href=\"#nav-branches\"]").on("shown.bs.tab", function (e) {
            $("#branches-grid").jsGrid("loadData");
        });
    });

    $.ajax({
        url: "ajax/tab-panes",
        data: { clientUserName: clientUserName },
        method: "POST",
        async: true,
        success: function (data: string): void {
            $("#nav-tabContent").append(data);
            initUsersGrid();
            initBranchesGrid();
        }
    });
}

// logut
function logout(): void {
    $.ajax({
        url: "/logout",
        method: "POST",
        success: function () {
            $(window).attr("location", "/login");
        }
    });

}

// show the login error to the user
function printLoginError(msg: string) {
    var alert = createAlert(msg, "danger");
    $("#modal-error-msg").html("");
    $("#modal-error-msg").append(alert);
    alert.effect("bounce");
}

function createAlert(msg: string, type: string) {
    var alert = $("<div/>");
    alert.addClass("alert alert-" + type + " alert-dismissable");
    alert.text(msg);
    return alert;
}

// initialize users' grid
function initUsersGrid() {
    var genders: any[] = [
        { "Name": "", Id: "" },
        { "Name": "Male", Id: 1 },
        { "Name": "Female", Id: 2 }];
    var fields: (Partial<JsGrid.JsGridField> | any)[] = [
        { name: "firstName", title: "First Name", type: "text", width: 90 },
        { name: "lastName", title: "Last Name", type: "text", width: 90 },
        // user name can't be changed
        { name: "username", editing: false, title: "User Name", type: "text", width: 120 },
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
                        this.editControl = $("<span/>").text(value).val(value);
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
        deleteConfirm: (item: any) => "Do you really want to delete " + item.username + "?",
        controller: {
            loadData: function (filter: any) {
                indicate("users-indicator", "loading");
                var data = { filter: filter, clientUserName };
                return $.ajax({
                    method: "GET",
                    url: "/users",
                    data: data,
                    async: true,
                    timeout: 5000,
                    success: () => {
                        indicate("users-indicator", "success");
                    },
                    error: () => {
                        indicate("users-indicator", "error");
                    }
                });
            },
            insertItem: function (item: any) {
                indicate("users-indicator", "loading");
                let password = item.password;
                delete item.password;
                return $.ajax({
                    type: "POST",
                    url: "/users",
                    data: { item, password },
                    timeout: 5000,
                    success: () => {
                        indicate("users-indicator", "success");
                    },
                    error: () => {
                        indicate("users-indicator", "error");
                    }
                });
            },
            updateItem: function (item: any) {
                indicate("users-indicator", "loading");

                return $.ajax({
                    type: "PUT",
                    url: "/users",
                    data: { item },
                    timeout: 5000,
                    success: () => {
                        indicate("users-indicator", "success");
                    },
                    error: () => {
                        indicate("users-indicator", "error");
                    }
                });
            },
            deleteItem: function (item: any) {
                indicate("users-indicator", "loading");

                return $.ajax({
                    type: "DELETE",
                    url: "/users",
                    data: { item },
                    timeout: 5000,
                    success: () => {
                        indicate("users-indicator", "success");
                    },
                    error: () => {
                        indicate("users-indicator", "error");
                    }
                });
            }
        },
        fields: fields
    });

}

// initialize branches' grid
function initBranchesGrid() {

    var fields: (Partial<JsGrid.JsGridField> | any)[] = [
        { name: "id", title: "ID", editing: false, type: "number", align: "center" },
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
            // todo - same as above
            loadData: function (filter: any) {
                indicate("branches-indicator", "loading");
                var data = { filter: filter, clientUserName };
                return $.ajax({
                    type: "GET",
                    url: "/branches",
                    data: data,
                    async: true,
                    timeout: 5000,
                    success: () => {
                        indicate("branches-indicator", "success");
                    },
                    error: () => {
                        indicate("branches-indicator", "error");
                    }

                });
            },
            insertItem: function (item: any) {
                indicate("branches-indicator", "loading");

                return $.ajax({
                    type: "POST",
                    url: "/branches",
                    data: { item },
                    timeout: 5000,
                    success: () => {
                        indicate("branches-indicator", "success");
                    },
                    error: () => {
                        indicate("branches-indicator", "error");
                    }
                });
            },
            updateItem: function (item: any) {
                indicate("branches-indicator", "loading");

                return $.ajax({
                    type: "PUT",
                    url: "/branches",
                    data: { item },
                    timeout: 5000,
                    success: () => {
                        indicate("branches-indicator", "success");
                    },
                    error: () => {
                        indicate("branches-indicator", "error");
                    }
                });
            },
            deleteItem: function (item: any) {
                indicate("branches-indicator", "loading");

                return $.ajax({
                    type: "DELETE",
                    url: "/branches",
                    data: { item },
                    timeout: 5000,
                    success: () => {
                        indicate("branches-indicator", "success");
                    },
                    error: () => {
                        indicate("branches-indicator", "error");
                    }
                });
            }
        },
        fields: fields
    });

}

// show indication (success, loading, error) regarding operations done on the grids
function indicate(id: string, command: "hide" | "success" | "loading" | "error"): void {
    var alert: JQuery<HTMLElement> = $("<div/>").addClass("py-1 my-1 text-center");
    switch (command) {
        case "hide":
            $("#" + id).hide("fade");
            break;
        case "success":
            alert.addClass("alert alert-success alert-dismissable fade show")
                .html(
                    `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>`
                )
                .prepend("Success!");
            $("#" + id).html("").append(alert);
            break;
        case "loading":
            var loadingAnimation = $("<span/>").addClass("glyphicon glyphicon-refresh glyphicon-refresh-animate");
            alert.addClass("alert alert-info").prepend("Loading...").prepend(loadingAnimation);
            $("#" + id).html("").append(alert);
            break;
        case "error":
            alert.addClass("alert alert-danger alert-dismissable fade show").html(
                `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>`
            ).prepend("Error!");
            $("#" + id).html("").append(alert);
            break;
    }
}

// submit the 'contact us' form
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
// load the branches' grid with data
function loadBranches() {
    $("#branches-grid").jsGrid("loadData");
}
// load the users' grid with data
function loadUsers() {
    $("#users-grid").jsGrid("loadData");
}

// post a file to some url via form-data
function postFile(file: File, url: string, cb: Function) {
    var formData = new FormData();
    formData.append("image", file);
    $.ajax({
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            cb();
        }
    });
}

let profileImageLink: string = "/res/profile-image";
function refreshProfileImage() {
    let img: HTMLImageElement = <any>$("#profile-img")[0];
    img.src = profileImageLink + "?" + Date.now();
}
// add a new flower to the DB
function addFlower() {
    var form: HTMLFormElement = document.forms[<any>"add-flower-form"];
    // if the file input has not files then the URL is required
    (<HTMLInputElement>form.elements[<any>"image-url"]).required = !(<any>form.elements[<any>"image-file"]).files.length;
    if (!form || !form.reportValidity()) {
        return;
    }
    var fd: FormData = new FormData();
    for (let element of form.elements) {
        if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
            fd.append(element.name, element.type === "file" ? (<any>element).files[0] : (<any>element).value);
        }
    }
    $.ajax({
        url: "/flowers/",
        data: fd,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
            // wait a sec for the flower image to upload to the server
            setTimeout(() =>
                addFlowerToPage(data), 1000
            );
            form.reset();
            $("#flowerModal").modal("hide");
        },
        error: function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
            alert("Error:\n" + jqXHR.responseText);
        }
    });

}

// add to the page a flower (i.e. show it)
function addFlowerToPage(flower: Flower): null | JQuery<HTMLElement> {
    if ($(".card.productbox").length <= 0) {
        return null;
    }
    var flowerDiv = $(".card.productbox").clone();
    (<any>flowerDiv.find("img")[0]).src = flower.img;
    flowerDiv.find("th")[0].innerText = flower.name;
    flowerDiv.find("th")[1].innerText = flower.family;
    // flowerDiv.show();
    $(flowerDiv.find("th")[2]).text(flower.colorDesc).attr("background-color", flower.color)
        .attr("color", invertColor(flower.color));
    $("#catalog").append(flowerDiv);
    return flowerDiv;
}

// get the opposite color (white for drak colors, black for lighter colors)
function invertColor(hex: string) {
    if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? "#000000"
        : "#FFFFFF";

}


function addFlowerImageChanged(files: FileList) {
    if (files.length <= 0) {
        return;
    }
    $("#add-flower-image-button").hide();
    $("#add-flower-success").show("highlight")
        .contents().filter(function () { return this.nodeType === 3; }).first().replaceWith(files.item(0).name);

}

function addFlowerRemoveSelectedImage() {
    $("#add-flower-success").hide();
    $("#add-flower-image-button").show("fade");
    $("#add-flower-image").val("");
}

// on the sign-up form - if the user type has changed - change the fields avilable accordingly
function userTypeChanged() {
    let form = $("#signup-form");
    let userType = form.find("[name='className']").val();
    form.find("[name='branchID']").prop("disabled", userType !== "Provider");
}

// show a form that lets the user to send a reset request
function showResetEmail() {
    let div = $("#password-reset-div");
    div.find("[name='show-button']").hide();
    div.find("[name='email-input']").show();
    div.find("[name='send-button']").show();
}

// send the reset request to the server
async function sendResetRequest() {
    let div = $("#password-reset-div");
    let email = div.find("[name='email-input']").val();
    let ajaxResp = $.ajax({
        url: "/requestPasswordReset",
        method: "POST",
        data : {email},
        error: (jqxhr, status: string, error: string) => {
            printLoginError(error);
        },
    });
    let response = await ajaxResp;
    if (ajaxResp.status === 200) {
        div.find("[name='show-button']").show();
        div.find("[name='email-input']").hide();
        div.find("[name='send-button']").hide();
        div.find("[name='alert']").text(response);
        div.show("highlight");
    }
}