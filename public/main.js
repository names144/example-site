/***
* 
* Main JS file for example-site 
*
***/
var URL = "/validate";
var KEYS = ["team", "partners", "management", "people"];

$(document).ready(function() {

  // Update the status' to default state
  $("#httpStatus").html("<span class='mdi-action-help mdi-material-grey'>Not yet checked</span>");
  $("#keywordStatus").html("<span class='mdi-action-help mdi-material-grey'>Not yet checked</span>");

  // Setup the validation
  $("#validateBtn").click(function() {
    var toTest = $("#urlInput").val();
    var keywords = [];
    $.post(URL, {url: toTest})
      .done(function(data) {
        // If 200 OK
        if (data.status === 200) {
          $("#httpStatus").html("<span class='mdi-navigation-check mdi-material-green'>200 OK!</span>");
        } else if (data.status === 400) {
          $("#httpStatus").html("<span class='mdi-navigation-cancel mdi-material-red'>Website not working!</span>");
        } else {
          $("#httpStatus").html("<span class='mdi-navigation-cancel mdi-material-yellow'>" + data.status + "</span>");
        }
      })
      .fail(function(data) {
        console.log("Unable to reach server!");
        $("#httpStatus").html("<span class='mdi-navigation-cancel mdi-material-yellow'>No response!</span>");
      })
      .always(function() {
        // Find keywords in link
        KEYS.forEach(function(val) {
          var re = new RegExp("(^|[/\.])" + val +"([/\.]|$)");
          if (toTest.search(re) >= 0) {
            keywords.push(val);
          }
        });
        // put the keywords in
        if (keywords.length > 0) {
          // build the words
          var words = "";
          keywords.forEach(function(word) {
            words += word + ",";
          });
          words = words.substring(0, words.length-1);
          $("#keywordStatus").html("<span class='mdi-navigation-check mdi-material-green'>" + words + "</span>");
        } else {
          $("#keywordStatus").html("<span class='mdi-navigation-cancel mdi-material-red'>No keywords found</span>");
        }
      });
  });
});

