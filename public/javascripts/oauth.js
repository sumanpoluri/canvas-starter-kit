(function(window) {
  'use strict';

  window.sizeSfCanvasContent();
  
  function logout(){
    document.getElementById('logout').blur();
    cnvService.logout(true);
  }

  window.logout = logout;

}(window));
