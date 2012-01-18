/**
 * *file
 * Lenda Library v0.0.2
 *
 * Contains various helper function, mostly meant for development
 */
ll = {
  'd': function (msg, name) {
    if (name !== undefined) {
      console.log(name + ': ' + msg);
      return;
    }
    console.log(msg);
  },
  'sort' : function(a,b){
    if (a.innerHTML.toLowerCase() == b.innerHTML.toLowerCase()) {
     return a.getAttribute('data-floor-id') > b.getAttribute('data-floor-id')  ? 1 : -1;
    }
    return a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ? 1 : -1;
  }
};
