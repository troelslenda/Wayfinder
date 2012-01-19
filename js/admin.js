var server = '';

jQuery(function(){

  server = new WebPush(Drupal.settings.ding_wayfinder.settings.server);

  server.bind('open', function() {
    // ask for all clients
    $(Drupal.settings.ding_wayfinder.clients).each(function(){
      data = {'name' : 'server', 'recipient' : this.toString(), 'action' : 'hello'};
      server.send(JSON.stringify(data));
    });
    $('.connection_status span').html(Drupal.t('Connected'));
    // if client didn't answer within 20 seconds, simulate broken connection
    setTimeout(function(){
      console.log('timeout');
      $('#page #content table tbody tr td:nth-child(2):not(.connected)').css('background','darkred').html('');
    },20000);
  });

  server.bind('connection_disconnected', function() {
    $('.connection_status span').html(Drupal.t('Connection Lost'));
  });
  server.bind('close', function() {
    $('.connection_status span').html(Drupal.t('Connection Lost'));
  });
  server.bind('connection_failed', function() {
    $('.connection_status span').html(Drupal.t('Unable to connect'));
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
	$('td:nth-child(2)',this).css('background','green').html('').addClass('connected');
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
  $('#page #content #reload_list').click(function(){
    window.location.reload();
});


});
