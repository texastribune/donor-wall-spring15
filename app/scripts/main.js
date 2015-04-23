'use strict';
/* Main script file */

<<<<<<< HEAD
(function() {
  'use strict';

  var pymChild;

  function render() {

    var data = [];

    //Load JSON data from Google Spreadsheet
    $.getJSON('/scripts/account.json', function(json) {
      data = json;
    }).done( function() {
      build(data);
    });

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function build(data) {
      for (var i = 0; i < data.records.length; i++) {
        var record = data.records[i];
        var name = '<span>' + record.Name + '</span>';
        var amount = 1;
        // var amount = record.Total_Donor_Wall_This_Year__c;

        if (amount <= 10) {
          $(name).appendTo('.student');
        } else if (amount <= 35) {
          $(name).appendTo('.enthusiast');
        } else if (amount <= 60 ) {
          $(name).appendTo('.activist');
        } else if (amount <= 150 ) {
          $(name).appendTo('.advocate');
        } else if (amount <= 250 ) {
          $(name).appendTo('.diplomat');
        } else if (amount <= 500 ) {
          $(name).appendTo('.benefactor');
        } else {
          $('<li>$' + numberWithCommas(amount) + ' &mdash; ' + name + '</li>').appendTo('.large-donors');
        }
      }
    }

    if (pymChild) {
      pymChild.sendHeight();
    }
  }

  function load() {
    pymChild = new pym.Child({
      renderCallback: render
    });
  }

  window.onload = load;
})();
=======
$(document).ready(function() {

  var data = [];

  //Load JSON data from Google Spreadsheet
  $.getJSON('/scripts/account.json', function(json) {
    data = json;
  }).done( function() {
    build(data);
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function build(data) {
    for (var i = 0; i < data.records.length; i++) {
      var record = data.records[i];
      var name = '<span>' + record.Name + '</span>';
      var amount = record.Total_Donor_Wall_This_Year__c;
      // var span = '<span>' + name + ' $' + numberWithCommas(amount) + '</span>';
      // console.log(span);

      if (amount <= 10) {
        $(name).appendTo('.student');
      } else if (amount <= 35) {
        $(name).appendTo('.enthusiast');
      } else if (amount <= 60 ) {
        $(name).appendTo('.activist');
      } else if (amount <= 150 ) {
        $(name).appendTo('.advocate');
      } else if (amount <= 250 ) {
        $(name).appendTo('.diplomat');
      } else if (amount <= 500 ) {
        $(name).appendTo('.benefactor');
      } else {
        $('<li>$' + numberWithCommas(amount) + ' &mdash; ' + name + '</li>').appendTo('.large-donors')
      }

      //
      // at 1000, show individuals + amounts

    }
  }

});
>>>>>>> bf1234caeeb0737cf265018907c657849d37df11
