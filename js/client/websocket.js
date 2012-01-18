
var server = '';
var devicename = localStorage.getItem('devicename');

jQuery(function(){

  server = new WebPush(Drupal.settings.ding_wayfinder.settings.server);

  server.bind('open', function() {
  });
  server.bind('connection_disconnected', function() {
    ll.d('disconnected :/');
  });
  server.bind('close', function() {
  });
  server.bind('connection_failed', function() {
  });
  server.bind('message', function(data) {
    message = eval("("+data+")");
    if((message.recipient == devicename || message.recipient == 'all')  && message.action == 'hello') {
      msg = {};
      msg.name = devicename;
      msg.recipient = 'server';
      msg.action = 'lastupdate';
      msg.data = Drupal.settings.ding_wayfinder.settings.launched;
    
      server.send(JSON.stringify(msg));
    }
    if((message.recipient == devicename || message.recipient == 'all')  && message.action == 'restart') {
      window.location.reload();
    }
  });
});
