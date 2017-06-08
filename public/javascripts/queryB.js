(function(window) {
  'use strict';

  window.sizeSfCanvasContent();

  var queryEdit='SELECT Id,Name,LastViewedDate\nFROM Account\nORDER BY LastViewedDate DESC NULLS LAST\nLIMIT 6';

  function runQuery() {
    var queryResult = '';
    var template = '<%= sfQueryResult %>';
    document.getElementById('runQuery').blur();
    var query = document.getElementById('query').value;
    function display(result) {
      queryResult += JSON.stringify(result,null,2);
      var html = ejs.render(template, { sfQueryResult: queryResult });
      document.getElementsByClassName('sfQueryResult')[0].innerHTML = html;
    }
    cnvService.querySalesforce(query,display,false);
  }

  window.runQuery = runQuery;

  function clearResult() {
    document.getElementById('clearResult').blur();
    document.getElementsByClassName('sfQueryResult')[0].innerHTML = '';
  }

  window.clearResult = clearResult;

}(window));
