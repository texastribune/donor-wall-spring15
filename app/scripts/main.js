

(function() {
  'use strict';

  var pymChild;

  function render() {
    var data = [];
    var amounts = [];
    //Load JSON data from Google Spreadsheet
    $.getJSON('//membership.texastribune.org.s3.amazonaws.com/donors.json', function(json) {
      data = json;
    }).done( function() {
      sortData(data);
      getAmounts(data);
      build(data);
      pymChild.sendHeight();
    });

    function sortData(data) {
      data.sort(function (a, b) {
        if (a.amount > b.amount) {
          return 1;
        }
        if (a.amount < b.amount) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return data.reverse();
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function getAmounts(data) {
      for (var i = 0; i < data.length; i++) {
        var amount = data[i].amount;
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
      for (var i = 0; i < data.length; i++) {
        var name = '<span>' + data[i].attribution + '</span>';
        var amount = data[i].amount;

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
        } else if (amount < 1000 ) {
          $(name).appendTo('.large');
        } else {
          var className = amount.toString();
          $('.' + className).append(name);
        }
      }
    }
  }

  function load() {
    pymChild = new pym.Child({
      renderCallback: render
    });
  }

  $(document).ready(function(){
  });

  window.onload = load;
})();
