// import './vendor/smoothscroll-polyfill-0.4.4.min.js' // Polyfill for browsers that don't support smooth scroll behavior
import './vendor/modernizr-3.11.2.min.js'
import './vendor/jquery-3.6.0.min.js'
import './vendor/jquery.visible.min.js'

// Avoid `console` errors in browsers that lack a console.
(() => {
  let method
  const noop = function () {}
  const methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ]
  let length = methods.length
  const console = (window.console = window.console || {})

  while (length--) {
    method = methods[length]

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop
    }
  }
})()

// Place any jQuery/helper plugins in here.
const win = $(window)
const allMods = $('.module')

allMods.each(function (i, el) {
  var el = $(el)
  if (el.visible(true)) {
    el.addClass('already-visible')
  }
})

win.scroll(function (event) {
  allMods.each(function (i, el) {
    var el = $(el)
    if (el.visible(true)) {
      el.addClass('come-in')
    }
  })
})
