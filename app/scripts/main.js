'use strict';
/* Main script file */

$(document).ready(function() {

  var data = [];

  //Load JSON data from Google Spreadsheet
  $.getJSON('/scripts/opp.json', function(json) {
    data = json;
  }).done( function() {
    build(data);
  });

  function build(data) {

    for (var i = 0; i < data.records.length; i++) {
      var record = data.records[i];
      console.log(data.records[i]);
      $('<p>' + record.Account_Informal_Greeting__c + '</p>'
        ).appendTo('.test');
    }
  }

});
