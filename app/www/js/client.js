define(['jQuery', 'Q', 'ko', 'io'], function($, Q, ko, io){
    var socket;

    var contactsVM = function(status, name) {
        var that = this;
        this.status = ko.observable(status);
        this.name = ko.observable(name);
    };

    var userVM = function() {
        var that = this;
        this.userName = ko.observable('');
        this.userConnected = ko.observable(false);
        this.connectClick = function(data, event) {
            socket = io.connect('http://localhost:2121', {query: "userName="+ that.userName()});
            socket.on('connect', function(msg){
                that.userConnected(true);
            });
            socket.on('disconnect', function(msg){
                that.userConnected(false);
            });
            socket.on('contacts', function(contacts){
                var result = [];
                var names = Object.keys(contacts);
                names.forEach(function(name){
                    if(name !== that.userName()) {
                        result.push(new contactsVM(contacts[name], name))
                    }
                });

                that.contacts(result);
            });
        };
        this.disconnectClick = function(data, event) {
            socket.disconnect();
        };

        this.contacts = ko.observableArray([])
    };

    ko.applyBindings(new userVM(), $('#user')[0]);

});