var config = require('../../nightwatch.conf.js');

module.exports = { 
  'Toasts': function(browser) {
    browser
      	.url('http://localhost:3000/toasts')
      	.waitForElementVisible('body')
      	.verify.elementPresent('#toast-container')
      	.saveScreenshot('./test/e2e/toasts/toasts.png')
      	.end();
  }
};