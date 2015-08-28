(function(global, $){

    var socket;


    var viewModel = function() {
       var that = this;
       this.firstName = ko.observable('hello');
       this.lastName = ko.observable('world');
       this.fullName = ko.observable('hello world');
       this.connectClick = function(data, event) {
           socket = io.connect('http://localhost:2121');
           socket.on('chatMessage', function(msg){
               that.fullName(msg);
           });
           that.lastName.subscribe(function(newValue){
               socket.emit('chatMessage', newValue);
           });
       };
   };

    var vm = new viewModel();

    ko.applyBindings(vm, $('#root')[0]);

})(window, window.$);