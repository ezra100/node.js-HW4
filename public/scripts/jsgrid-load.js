
$(function () {

    var genders = [{ "Name": "Male", Id: 0 },
    { "Name": "Female", Id: 1 }];
    $("#jsGrid").jsGrid({
        height: "70%",
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
        rowClick: () => { },
        rowDoubleClick: (args) => { $("#jsGrid").jsGrid("editItem", args.item); },
        deleteConfirm: "Do you really want to delete user?",
        controller: {
            loadData: function (filter) {
                return $.ajax({
                    type: "GET",
                    url: "/users",
                    data: Object.assign({}, filter, {clientUserName : userName})
                });
            },
            insertItem: function (item) {
                return $.ajax({
                    type: "POST",
                    url: "/users",
                    data: item
                });
            },
            updateItem: function (item) {
                return $.ajax({
                    type: "PUT",
                    url: "/users",
                    data: item
                });
            },
            deleteItem: function (item) {
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

            { name: "Address", type: "text", width: 200 },
            { type: "control" }
        ]
    });
    //load the grid when the tab is shown
    $('a[data-toggle="tab"][href="#nav-users]').on('shown.bs.tab', function (e) {
        $("#jsGrid").jsGrid("loadData");
    })
});