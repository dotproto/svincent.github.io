/* svincent.me | MIT
 * Rotate the background color of the page and the headline text.
 *
 * - element - object containing 2 properties
 *   - background - DOM element on which BG color will be animated
 *   - text -DOM element on which text color will be animated
 */
(function(elements){
  if(Modernizr.cssanimations) {
    return false;
  }

  // Polyfills and utilities - because why not?
  Date.now = Date.now || function(){ return (new Date()).getTime(); }
  var getObjectType = function() {
    // NOTE: This function does not use a simple `X instanceof Date` check
    // because this will fail if an object is passed across frame boundaries.
    // - http://stackoverflow.com/questions/643782/how-to-know-if-an-object-is-a-date-or-not-with-javascript#643827
    return Object.prototype.toString.call(obj);
  }
  var isDateObject = function(obj) {
    return getObjectType(obj) === '[object Date]';
  }
  var getSeconds = function(dateObj) {
    var sec;

    if (dateObj) {
      if (!isDateObject(dateObj) && console && typeof console.error === 'function') {
        console.error("Invalid date object provided to `getSeconds`");
      }
      sec = dateObj.getTime();
    } else {
      sec = Date.now();
    }

    return Math.round(sec / 1000);
  }

  // Main FN body //////////////////////////////////////////////////////////////
  var hueMultiplyer = 10;   // # of hue degrees (in HSL) to rotate per tick
  var updateTickRate = 1000 // # of milliseconds between each color update
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

  var updateBackgroundColors = function (){
    setBackgroundColor(elements.background, getCurrentHue());
    setFontColor(elements.text, getCurrentHue());
  }

  setInterval(updateBackgroundColors, updateTickRate);
})({
  background: document.getElementById('main-bg'),
  text:       document.getElementById('headline')
})

/* Add focus support & click eventsto all supplied elements.
 *
 *  - elements - An array of DOM elements to wire up
 */
 var prox = document.getElementsByTagName('footer');
(function(elements){
  var setFocus = function(event){
    event.target.focus();
  };

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', setFocus);

    // NOTE: Divs and spans can only be focused if they have a tab index
    if (elements[i].hasAttribute('tabindex')) { continue; }; // early out
    elements[i].setAttribute('tabindex', -1); // -1 prevents users from tabbing
                                              // element while exposing it to JS
  }
})(prox)
