var config = require('../../nightwatch.conf.js');

module.exports = { 
  'Alert': function(browser) {
    browser
      	.url('http://localhost:3000/alerts')
      	.waitForElementVisible('body')
      	.verify.elementPresent('.swal2-container')
      	.saveScreenshot('./test/e2e/alerts/alerts.png')
      	.end();
  }
};