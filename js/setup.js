function onUpdateReady() {  
  alert('found new version!');  
}  
window.applicationCache.addEventListener('updateready', onUpdateReady);  
if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {  
  onUpdateReady();  
}  

var data = {};

var global = {};

jQuery(function($){


  data = Drupal.settings.ding_wayfinder.data;

  if(window.location.hash.substring(1) == 'clear') {
    localStorage.clear();
    alert('localStorage cleared');
    $('link[rel=apple-touch-icon-precomposed]').attr('href','theme/admin_icon.png');
    return;

  }
  if(window.location.hash.substring(1) == 'admin') {
    $('link[rel=apple-touch-icon-precomposed]').attr('href','theme/admin_icon.png');
  }

  isiPad = navigator.userAgent.match(/iPad/i) != null;
  webApp = window.navigator.standalone;
  isAdminApp = window.location.hash.substring(1) == 'admin';

  $('li').live('click',function(){
    //removePoint();
  });
  

  //var activeFloor = 0;
  //var activeKeyword = 0;
  var initialFloor = 0;
  //var activeDataId = 0;



  //var itemClicked = 0;

  //var clickedId = 0;
  //var aggregate = false;


  // get floor from storage
  if(localStorage.getItem("floor")){
    initialFloor = localStorage.getItem("floor");
    global.activeFloor = initialFloor;
  }
  else{
    initialFloor = 0;
  }


  if (isiPad && !webApp) {
    // prevent application to be run as a webpage
    $('body').prepend('<div class="error overlay"><h1 class="webapp">Please add to homescreen<br>inorder to use<br>this app</h1><br><a href="http://reload.dk" target="_blank"><img src="theme/reload.svg"></a></div>');
    return false;
  }

  window.addEventListener("orientationchange", function() {
    landscapeOrient();
  }, false);


  // build floors list
  $(data).each(function(floorid){

    // prepare each floor for keywords and build floor pagination
    $('.floornav').append('<li>'+this.name+'</li>');
    $('.floornav > li:last-child').click(function(){
      changeFloorPlan(floorid,false);
    });
    $('.keywords').append('<li><ul></ul></li>');
    if (!isAdminApp) {
      $(this.keywords).each(function(i){
        // Create a list item in the last created Unordered List and bind a clickevent
        $('.keywords > li:last-child > ul').append('<li data-id="'+this.id+'" data-floor-id="'+floorid+'">'+this.name+'</li>');
        $('.keywords > li:last-child > ul > li:last-child').click(function(){
          global.activeKeywordId = $(this).attr('data-id');
      //    if(floorid != global.activeFloor) {
            changeFloor(floorid);
		ll.d(global.activeFloor,'floor');
		$('.keywords > li > ul').hide().removeClass('activeFloor');
		$('.keywords > li:eq('+global.activeFloor+') > ul').show().addClass('activeFloor');
      //    }

          changeOverlay(floorid,i);
          // Set the active state on keywords
          $('.keywords > li > ul > li').removeAttr('class');
          $('.keywords > li > ul > li[data-id="'+global.activeKeywordId+'"]').addClass('act');
        });
      });
    }
  });
  // aggregate keyword list
  $('.keywords').append('<li class="aggregated"><ul></ul></li>');
  $('.keywords > li > ul > li').clone(true).sort(ll.sort).appendTo($('.keywords > li.aggregated > ul'));

  var prev = null;
  $('.keywords > li.aggregated > ul > li').each(function(){
    id = $(this).attr('data-id');
    if(id == prev){
      $(this).remove();
     // ll.d(id,'same found');
    }

    prev = id;
  });


  function onFloorChange(floorIndex){
    ll.d('floor changed');
    $('.topbar .aggregate').removeClass('act');
    // if floor is not initial floor
    if (floorIndex != initialFloor) {
      $('.location').hide();
    }
    else {
      $('.location').show();
    }
  }

  $('.topbar .aggregate').click(function(e){
    e.preventDefault();
if($(this).hasClass('act')){
  $(this).removeClass('act');
  global.aggregate = false;
   $('.keywords > li.aggregated > ul').hide(); 
    $('.keywords > li:eq('+global.activeFloor+') > ul').show().addClass('activeFloor');
}
else{
    $(this).addClass('act');
    global.aggregate = true;
   $('.keywords > li > ul').hide(); 
    $('.keywords > li.aggregated > ul').show().addClass('activeFloor');


}
   /* if(global.aggregate == true){
     // global.aggregate = false;
      changeFloorPlan(global.activeFloor,false);
      $(this).removeClass('act');
      return;
    }*/
  //  changeFloorPlan(global.activeFloor,true);
// if(floorid != global.activeFloor) {
   //         changeFloor(global.activeFloor);
  //        }

//          changeOverlay(floorid,i);

    global.aggregate = false;
  });

  function changeFloorPlan(index,reset){
    onFloorChange(index);
    $('.keywords > li > ul').hide().removeClass('activeFloor');

      // if target layer contains same id, select that id
      elementid = null;
      if(!reset) {
       $(data[index].keywords).each(function(i){
         //console.log(this);
         if(this.id == global.activeKeywordId) {
           elementid = i;
         }
       });
      }
      if(elementid == null) {
        activeDataId = 0;
      }
      global.activeFloor = index;
      changeOverlay(index,elementid);
      if(!global.aggregate) {
        $('.keywords > li > ul:eq('+index+')').show().addClass('activeFloor');
      }
      else{
        $('.keywords > li.aggregated > ul').show().addClass('activeFloor');
      }

//ll.d(dataindex);

      $('.floorplan-image').attr('src', '/' + data[index].filename);



    $('.floornav li:eq('+index+')').siblings().removeClass('red-gradient');
    $('.floornav li:eq('+index+')').addClass('red-gradient');
  }

  function changeOverlay(floorIndex,elementIndex) {

    itemClicked = $('.keywords > li:eq('+floorIndex+') > ul > li:eq('+elementIndex+')');

    clickedId = $(itemClicked).attr('data-id');


      $('.keywords li ul li ul').remove();
      $(data).each(function(i){

        var floor = this;
        floor.id = i;

        if(i != global.activeFloor){
         $(this.keywords).each(function(){
           if(this.id == clickedId){

             if($('ul',itemClicked)[0] == undefined){
               $(itemClicked).append('<ul class="floor-list"></ul>');
             }
             $('ul',itemClicked).append('<li>' + floor.name+'</li>');
             $('ul > li:last-child',itemClicked).click(function(e){
               e.stopPropagation();
               global.activeFloor = floor.id;
               changeFloorPlan(floor.id ,false);
             });
            }
         });
        }
      });

    //$('.keywords > li > ul > li').removeAttr('class');
    if(elementIndex == null) {
      $('.element-image').hide();
    }
    else{
      $('.element-image').show();
      //$('.keywords > li > ul:eq('+floorIndex+') > li:eq('+elementIndex+')').addClass('act');
      $('.element-image').attr('src', '/' + data[floorIndex].keywords[elementIndex].filename);
    }
  }

  function landscapeOrient(){
    if(window.orientation == 0 || window.orientation == 180) {
      $('body').prepend('<div class="error overlay"><h1 class="webapp">This app was only designed<br>for landscape orientation. Please rotate your device</h1><br><a href="http://reload.dk" target="_blank"><img src="theme/reload.svg"></a></div>');
    }
    else {
      $('body > .error').remove();
    }
  }

  changeFloorPlan(initialFloor,true);
  landscapeOrient();
  drawPoint();

  $('body').live('touchmove',function(e){
    e.preventDefault();
  });

  $('.location, .keywords > li > ul').live('touchmove',function(e){
    e.stopPropagation();
  });

/*  // make keywords scroll back when touch scroll is released
  $('.keywords > li > ul').live('touchstart',function(){
    if($('.keywords > li > ul.activeFloor').scrollTop() == 0){
      $('.keywords > li > ul.activeFloor > li:first-child').css('margin-top','1');
      $('.keywords > li > ul.activeFloor > li:last-child').css('margin-bottom','1000px');
      $('.keywords > li > ul.activeFloor').scrollTop(1);
    }
    //scrollBack();
  });
  $('.keywords > li > ul').live('touchend',function(){
    $('.keywords > li > ul.activeFloor > li:first-child').css('margin-top','0px');
    $('.keywords > li > ul.activeFloor > li:last-child').css('margin-bottom','0');

    //scrollBack();
  });*/
function changeFloor(FloorIndex) {
  onFloorChange(FloorIndex);
  $('.floorplan-image').attr('src', '/' + data[FloorIndex].filename);
  $('.floornav li:eq('+FloorIndex+')').siblings().removeClass('red-gradient');
  $('.floornav li:eq('+FloorIndex+')').addClass('red-gradient');
  global.activeFloor = FloorIndex;
}


  function scrollBack(){
   /*scroll = $('.keywords > li > ul.activeFloor').scrollTop();
   ll.d(scroll,'dis');
   if (scroll < 300 || scroll == null) {
     $('.keywords > li > ul.activeFloor').scrollTop(300);
   }*/
//alert('scroll');
  }


  if(isAdminApp){
    // show a diffrent app icon
    $('link[rel=apple-touch-icon-precomposed]').attr('href','theme/admin_icon.png');

    $('head').append('<link rel="stylesheet" type="text/css" href="theme/admin.css">');
    $('.floorplan-image').bind("touchstart touchmove", touchStart);
    function touchStart(e) {
      /*e.preventDefault();*/
      localStorage.setItem("x", e.originalEvent.touches[0].pageX);
      localStorage.setItem("y", e.originalEvent.touches[0].pageY);
      localStorage.setItem("floor", global.activeFloor);
      drawPoint();
    }

    $('body').append('<form action="" method="post" class="settings"><label><p>Devicename:</p><input placeholder="give the device a name" type="text" name="devicename" /></label><input type="submit"value="set"></form>');
    $('input[name=devicename]').val(localStorage.getItem('devicename'));
    $('form').submit(function(e){
     // e.preventDefault();
//ll.d($('input[name=devicename]',this).val());
      localStorage.setItem('devicename',$('input[name=devicename]',this).val());
      
//      ll.d($('button:clicked'));

 //     ll.d(e);
      return false;
    //ll.d('submit');  
    });
    $('.settings').append('<div><label><p>Rotate map:</p><button class="rotate">Rotate</button></label></div>');
    $('.rotate').click(function(e){
      e.preventDefault();
	ll.d(localStorage.getItem('rotated'));
      if(localStorage.getItem('rotated') == '0'){
        localStorage.setItem('rotated','180');
      }
      else{
        localStorage.setItem('rotated','0');    
      }
      rotateMap();
    });

  }
  else{
    // when the document is clicked terminate countdown to reset
    appReset.init(function(){changeFloorPlan(initialFloor,true)});
  }

});

appReset = {
  'callback' : function(){ },
  'countdown' : 0,
  'initialCountdown' : 15,
  'init' : function(callback){
    // start countdown and bind handlers
    this.callback = callback;
    this.start();
    this.handlers();
  },
  'start' : function(){
    // countdown
    setInterval(function(){
      appReset.countdown--;
      if(appReset.countdown == 0) {
        appReset.reset();
      }
    },1000);
  },
  'handlers' : function(){
    // the event should trigger on touchstart and touchmove instead
    $('body').bind('touchstart touchmove click',function(){
      appReset.countdown = appReset.initialCountdown;
    });
  },
  'reset' : function(){
    this.callback();
    global.aggregate = false;
    drawPoint();
    ll.d('app resetting!');
  }
}


function drawPoint(){
  if(localStorage.getItem("x") == null) {
    return;
  }
  if($('div.location')[0] === undefined) {
    $('body').append('<div class="location"></div>');
  }
  $('.location').css({
    'top' : (localStorage.getItem("y")-20)+'px',
    'left' : localStorage.getItem("x")+'px'
  }).show();
}
function removePoint(){
  $('div.location').hide();
}


var rotateMap = function(){
  ll.d(localStorage.getItem('rotated'));
  if(localStorage.getItem('rotated') == '180') {
    $('body').addClass('rotated');
  }
  else {
    $('body').removeClass('rotated');
  }
}

var dwf = {
	'init' : function(){
		rotateMap();
},
	'buildKeywords' : function(){},

};


// bootstap in jQuery scope?
jQuery(function(){
  dwf.init();
});





