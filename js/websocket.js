
var server = '';

jQuery(function(){

 server = new WebPush('ws://localhost:8000/dwf');
 ll.d(server);

  server.bind('open', function() {
ll.d('connected');    
});

    server.bind('connection_disconnected', function() {
//        $('#status').removeClass().addClass('offline').html('offline');

ll.d('disconnected :/');
    });

    server.bind('close', function() {
        $('#status').removeClass().addClass('offline').html('offline');
    });

    server.bind('connection_failed', function() {
        $('#status').removeClass().addClass('error').html('error');
    });

    server.bind('message', function(data) {
//        alert	('Received: ' + data);

        if(data == 'restart') {
          window.location.reload();
        }
    });
//alert('fdæfsdk');


});
