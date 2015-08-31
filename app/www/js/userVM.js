define(['ko', 'io', 'contactVM'], function(ko, io, contactVM){

    var userVM = function() {
        var that = this;
        var socket;

        this.userName = ko.observable('');
        this.userConnected = ko.observable(false);
        this.connectClick = function(data, event) {
            that.socket = io.connect('http://localhost:2121', {query: "userName="+ that.userName()});
            that.socket.on('connect', function(msg){
                that.userConnected(true);
            });
            that.socket.on('disconnect', function(msg){
                that.userConnected(false);
            });
            that.socket.on('contacts', function(contacts){
                var result = [];
                var names = Object.keys(contacts);
                names.forEach(function(name){
                    if(name !== that.userName()) {
                        result.push(new contactVM(contacts[name], name))
                    }
                });

                that.contacts(result);
            });
        };
        this.disconnectClick = function(data, event) {
            that.socket.disconnect();
        };

        this.contacts = ko.observableArray([])
    };

    return userVM;
});