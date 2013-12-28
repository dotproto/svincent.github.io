(function(){
  // Polyfill Date.now just 'cause its good practice
  Date.now = Date.now || function(){ return (new Date()).getTime(); }

  // Element pointers
  var backgroundEl = document.getElementsByClassName('bg-color')[0];
  var headlineEl = document.getElementsByClassName('headline')[0];

  // Options
  var hueMultiplyer = 10;


  var getSeconds = function(dateObj) {
    var sec;
    if (dateObj) {
      sec = dateObj.getTime();
    } else {
      sec = Date.now();
    }

    return Math.floor(sec / 1000);
  }

  var startTime = getSeconds();

  var getCurrentHue = function() {
    var sinceStart = getSeconds() - startTime;
    return sinceStart * hueMultiplyer % 360 ;
  }

  setBackgroundColor = function(element, hue) {
    element.style.backgroundColor = 'hsla(' + hue + ',100%,50%,0.05)';
  }
  setFontColor = function(element, hue) {
    element.style.color = 'hsla(' + hue + ',100%,50%,0.05)';
  }

  var updateBackgroundColor = function (){
    setBackgroundColor(backgroundEl, getCurrentHue());
    setFontColor(headlineEl, getCurrentHue());
  }

  setInterval(updateBackgroundColor, 1000);
})()
