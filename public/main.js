/***
* 
* Main JS file for example-site 
*
***/
var URL = '/validate';

$(document).ready(function() {

  // Update the status' to default state
  $("#httpStatus").html("<span class='mdi-action-help mdi-material-grey'>Not yet checked</span>");
  $("#keywordStatus").html("<span class='mdi-action-help mdi-material-grey'>Not yet checked</span>");

  // The success callback
  var success = function(data) {
    console.log(data);
  };

  // The error callback
  var error = function(data) {
    console.log(data);
  };

  // Setup the validation
  $("#validateBtn").click(function() {
    var toTest = $("#urlInput").val();
    $.post(URL, {url: toTest})
      .done(function(data) {
        console.log('Success ' + data);
      })
      .fail(function(data) {
        console.log('Fail ' + data);
      });
  });
});

