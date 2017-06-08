(function(window) {
  'use strict';

  window.sizeSfCanvasContent();

  /**
    * This retrieves the accounts data from salesforce
    */
  function recentSfAccounts() {
    var template = `
      <% accounts.forEach(function(account) { %>
        <li>
          <span class="column1">
            <a href="javascript:void(null)" onclick="sfNavigate(\'<%= account.Id %>\')"><%= account.Name %></a>
          </span>
          <span class="column1">
            <%= account.date %>&nbsp;<%= account.time %>
          </span>
        </li>
      <% }); %>
    `;
    document.getElementById('recentSfAccounts').blur();
    var query = 'SELECT Id,Name,LastViewedDate FROM Account ORDER BY LastViewedDate DESC NULLS LAST LIMIT 6';
    function process(result) {
      var date;
      //clean dates
      for (var i in result) {
        if(!result[i].LastViewedDate){
          result[i].date='not viewed';
        }
        else{
          date = new Date(result[i].LastViewedDate);
          result[i].date=date.toLocaleDateString();
          result[i].time=date.toLocaleTimeString();
        }
      }
      var listHtml = ejs.render(template, { accounts: result });
      document.getElementsByClassName('sfQueryResults')[0].innerHTML = listHtml;
    }
    cnvService.querySalesforce(query,process);
  }

  window.recentSfAccounts = recentSfAccounts;

  function sfNavigate(id) {
    cnv.navigate(id,null,true);
  }

  window.sfNavigate = sfNavigate;

}(window));
