var config = require('../../nightwatch.conf.js');

module.exports = { 
  'Date Range Picker': function(browser) {
    browser
      	.url('http://localhost:3000/date-range-picker')
      	.waitForElementVisible('body')
      	.verify.elementPresent('input[name="daterange"]')
        .click('input[name="daterange"]')
        .assert.visible('.daterangepicker.dropdown-menu')
      	.saveScreenshot('./test/e2e/date-range-picker/date-range-picker.png')
      	.end();
  }
};