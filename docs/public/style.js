 (function () {
    if (location.origin.includes('plus-pro-components.com')) {
      var style = document.createElement('style')
      style.type = 'text/css'
      style.innerText = `.miit-link{display:inline-block!important;}`
      var s = document.head
      s.appendChild(style)
    }
  })()