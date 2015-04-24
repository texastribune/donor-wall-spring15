

(function() {
  'use strict';

  var pymChild;

  function render() {

    var data = [];
    var amounts = [];
    //Load JSON data from Google Spreadsheet
    $.getJSON('http://graphics.texastribune.org/graphics/donor-wall/account.json', function(json) {
    // $.getJSON('/scripts/account.json', function(json) {
      data = json;
    }).done( function() {
      getAmounts(data);
      build(data);
    });

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getAmounts(data) {
      for (var i = 0; i < data.records.length; i++) {
        var amount = data.records[i].Total_Donor_Wall_This_Year__c;
        amounts.push(amount);
      }

      // var maxDonation = Math.max.apply(null, amounts);
      // console.log(maxDonation);
      amounts = $.unique(amounts);

      $.each(amounts, function( index, value ) {

        if ( value >= 1000 ) {
          $('<div class="' + value + '"><header><h3>$' + numberWithCommas(value) + '</h3></header></div>').appendTo('.large-donors');
        }
      });
    }

    function build(data) {
      for (var i = 0; i < data.records.length; i++) {
        var record = data.records[i];
        var name = '<span>' + record.Name + '</span>';
        var amount = record.Total_Donor_Wall_This_Year__c;

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
          var className = amount.toString();
          console.log(className);
          $('.' + className).append(name);
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
