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
    //Load JSON data from Google Spreadsheet
    $.getJSON('//membership.texastribune.org.s3.amazonaws.com/donors-alltime.json', function(json) {
      data = json;
    }).done( function() {
      build(data);
      pymChild.sendHeight();
    });

    function numberWithoutCommas(x) {
      return x.toString().replace(/,/g , '');
    }

    function build(data) {
      for (var key in data) {
        var value = data[key];
        var className = '';

        if ( key == 'Less than $10') {
          className = 'less-than'
        } else {
          className = numberWithoutCommas(key).substring(1);
        }

        $('<div class="' + className + '"><header><h3>' + key + '</h3></header></div>').appendTo('.donors');
        for (var i = 0; i < value.length; i++) {
          var name = '<span>' + value[i].attribution + '</span>';
          $('.' + className).append(name);
        }
      }
    }
  });

  window.onload = load;
})();
