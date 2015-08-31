define(['ko'], function(ko){

    var contactVM = function(status, name) {
        var that = this;
        this.status = ko.observable(status);
        this.name = ko.observable(name);
    };

    return contactVM;
});