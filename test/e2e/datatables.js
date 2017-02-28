var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { 
  'Datatables': function(browser) {
    browser
      	.url('http://localhost:3000/datatables')
      	.waitForElementVisible('body')
      	.verify.elementPresent('.dataTables_wrapper')
      	.saveScreenshot('./test/e2e/datatables/datatables.png')
      	.end();
  }
};