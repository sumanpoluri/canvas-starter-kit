(function(window) {
  'use strict';

  var newId = '';
  var success = 'false';
  var sfEditResultDivContentsTemplate = '<span class="success">Success!</span>&nbsp;&nbsp;<span>Task Id: <a href="javascript:void(null)" onclick="navigate(\'<%= newId %>\')"><%= newId %></a></span>&nbsp;&nbsp;<button class="delete" onclick="deleteTask(\'<%= newId %>\')">delete task</button>';

  window.sizeSfCanvasContent();

  function newTask(){
    document.getElementById('newTask').blur();
    var due = new Date();
    due.setDate(due.getDate()+1);
    due = due.toISOString();
    var request = {
      'ActivityDate':due.substring(0,10),
      'Subject':'Test Task From the canvas-starter-kit',
    };
    cnvService.editSalesforce('Task',request,process);
    function process(result) {
      var sfEditResultDiv = document.getElementById('sfEditResult');
      if (sfEditResultDiv.style.display === 'none') {
        sfEditResultDiv.style.display = 'block';
      }
      var html = ejs.render(sfEditResultDivContentsTemplate, { newId: result });
      document.getElementById('sfEditResult').innerHTML = html;
    }
  }

  function deleteTask(id) {
    cnvService.deleteSalesforce('Task',id,process);
    function process(result) {
      if(result) {
        var sfEditResultDiv = document.getElementById('sfEditResult');
        if (sfEditResultDiv.style.display === 'block') {
          sfEditResultDiv.style.display = 'none';
        }
        var html = ejs.render(sfEditResultDivContentsTemplate, { newId: '' });
        document.getElementById('sfEditResult').innerHTML = html;
      }
    }
  }

  function navigate(id) {
    cnv.navigate(id,null,true);
  }

  window.newTask = newTask;
  window.deleteTask = deleteTask;
  window.navigate = navigate;

}(window));
