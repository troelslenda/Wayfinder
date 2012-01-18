var server = '';

jQuery(function(){

  server = new WebPush(Drupal.settings.ding_wayfinder.settings.server);

  server.bind('open', function() {
    // ask for all clients
    $(Drupal.settings.ding_wayfinder.clients).each(function(){
data = {'name' : 'server', 'recipient' : this.toString(), 'action' : 'hello'};
//console.log(data);
      server.send(JSON.stringify(data));
    });


    console.log('open');
  });

  server.bind('connection_disconnected', function() {
  });
  server.bind('close', function() {
  });
  server.bind('connection_failed', function() {
  });
  server.bind('message', function(data) {
    var message = eval("("+data+")");
//console.log(message);
    if (message.recipient != 'server') {
      return;
    }
    if(message.action == 'lastupdate') {
    $('#page #content table tbody tr').each(function(){
if ($('td:first-child',this).html() == message.name) {
console.log(message);
	$('td:nth-child(2)',this).css('background','green').html('');
	$('td:nth-child(3)',this).html(message.data);
	$.post('/biblioteker/1/wayfinder/post_settings',{'clientname' : message.name},function(data){console.log(data)});
//	$.POST();
}
//      console.log();
    });
//    console.log($('#page #content table tbody tr td:first-child').html());
    }

  //   console.log(message);
  });

  $('#page #content #reload').click(function(){
    message = {
      'name' : 'server',
      'recipient' : 'all',
      'action' : 'restart'
    };
    server.send(JSON.stringify(message));
  });

});
