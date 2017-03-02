var config = require('../../nightwatch.conf.js');

module.exports = { 
  'Breadcrumb': function(browser) {
    browser
      	.url('http://localhost:3000/Breadcrumb')
      	.waitForElementVisible('body')
      	.verify.elementPresent('ol.breadcrumb')
      	.resizeWindow(300, 800)
      	.verify.elementPresent('ol.breadcrumb li:nth-child(1).dropdown')
      	.saveScreenshot('./test/e2e/breadcrumb/breadcrumb.png')
      	.end();
  }
};