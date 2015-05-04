(function() {
  'use strict';

  var pymChild;

  function render() {

  }

  function load() {
    pymChild = new pym.Child({
      renderCallback: render
    });
  }

  $(document).ready(function(){
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

        if ( value > 10 ) {
          $('<div class="' + value + '"><header><h3>$' + numberWithCommas(value) + '</h3></header></div>').appendTo('.donors');
        }
      });
    }

    function build(data) {
      for (var i = 0; i < data.length; i++) {
        var name = '<span>' + data[i].attribution + '</span>';
        var amount = data[i].amount;

        if (amount <= 10) {
          $(name).appendTo('.student');
        } else {
          var className = amount.toString();
          $('.' + className).append(name);
        }
      }
    }
  });

  window.onload = load;
})();
