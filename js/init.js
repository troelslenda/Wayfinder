
var global = this;

dwf = {
  'init' : function(){
    // initial checks and event listeners
    global.isiPad = navigator.userAgent.match(/iPad/i) != null;
    global.webApp = window.navigator.standalone;
    global.isAdminApp = window.location.hash.substring(1) == 'admin';
    // set admin icon
    if(global.isAdminApp) {
      $('link[rel=apple-touch-icon-precomposed]').attr('href','theme/admin_icon.png');
    }
    if (isiPad && !webApp) {
      // prevent application to be run as a webpage
      $('body').prepend('<div class="error overlay"><h1 class="webapp">Please add to homescreen<br>inorder to use<br>this app</h1><br><a href="http://reload.dk" target="_blank"><img src="theme/reload.svg"></a></div>');
      // stop app
      return false;
    }
    window.addEventListener("orientationchange", function() {
      dwf.orientation();
    }, false);
    dwf.orientation();
  },
  'orientation' : function(){
    // if the device is not in landscape mode, exit app with an overlay prompting rotation
    if(window.orientation == 0 || window.orientation == 180) {
      $('body').prepend('<div class="error overlay"><h1 class="webapp">This app was only designed<br>for landscape orientation. Please rotate your device</h1><br><a href="http://reload.dk" target="_blank"><img src="theme/reload.svg"></a></div>');
    }
    else {
      $('body > .error').remove();
    }
  },
}
