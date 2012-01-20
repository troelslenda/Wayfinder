
var websocket = {

  'server' : '',
  'init' : function (){
    server = new WebPush(Drupal.settings.ding_wayfinder.settings.server);
    this.handlers();
  },
  'handlers' : function(){
    server.bind('open',function(){
      messages.websocketConnection(true);
      server.send(JSON.stringify(websocket.updatemessage()));
    });
    server.bind('connection_disconnected', function() {
      messages.websocketConnection(false);
    });
    server.bind('close', function() {
      messages.websocketConnection(false);
    });
    server.bind('connection_failed', function() {
      messages.websocketConnection(false);
    });

    server.bind('message',function(data){
      message = eval("("+data+")");
      if((message.recipient == dwf.deviceID || message.recipient == 'all')  && message.action == 'hello') {
        server.send(JSON.stringify(websocket.updatemessage()));
      }
      if((message.recipient == dwf.deviceID || message.recipient == 'all')  && message.action == 'restart') {
        window.location.reload();
      }
    });
  },
  'connectionstatus': function(sta){

  },
  'updatemessage' : function(){
    return {
      'name' : dwf.deviceID,
      'recipient' : 'server',
      'action' : 'lastupdate',
      'data' : Drupal.settings.ding_wayfinder.settings.launched,
    };
},

};

jQuery(function(){
  websocket.init();
});

var messages = {
  websocketConnection : function(on){
    $('.websocket_connection_status').remove();
    if(on){
      $('<span>',{class : 'connected websocket_connection_status'}).appendTo('body');
      setTimeout(function(){
        $('.websocket_connection_status.connected').remove();
      },15000);
    }
    if(on==false){ 
      $('<span>',{class : 'error websocket_connection_status'}).appendTo('body');
    }
  },
  internetConnection : function(on){
    $('.internet_connection_status').remove();
    if(on){
      $('<span>',{class : 'connected internet_connection_status'}).appendTo('body');
      setTimeout(function(){
        $('.internet_connection_status.connected').remove();
      },15000);
    }
    if(on==false){ 
      $('<span>',{class : 'error internet_connection_status'}).appendTo('body');
    }
  }
}
