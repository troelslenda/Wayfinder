
var websocket = {

  'server' : '',
  'init' : function (){
    server = new WebPush(Drupal.settings.ding_wayfinder.settings.server);
    this.handlers();
  },
  'handlers' : function(){
    server.bind('open',function(){
      websocket.connectionstatus('on');
    });
    server.bind('connection_disconnected', function() {
      websocket.connectionstatus('off');
    });
    server.bind('close', function() {
      websocket.connectionstatus('off');
    });
    server.bind('connection_failed', function() {
      websocket.connectionstatus('off');
    });

    server.bind('message',function(data){
      message = eval("("+data+")");
      if((message.recipient == localStorage.getItem('devicename') || message.recipient == 'all')  && message.action == 'hello') {
        server.send(JSON.stringify(websocket.updatemessage()));
      }
      if((message.recipient == localStorage.getItem('devicename') || message.recipient == 'all')  && message.action == 'restart') {
        window.location.reload();
      }
    });
  },
  'connectionstatus': function(sta){

  },
  'updatemessage' : function(){
    return {
      'name' : localStorage.getItem('devicename'),
      'recipient' : 'server',
      'action' : 'lastupdate',
      'data' : Drupal.settings.ding_wayfinder.settings.launched,
    };
},

};

jQuery(function(){
  websocket.init();
});
