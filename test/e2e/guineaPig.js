var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { 
  'Back to Top': function(browser) {
    browser
      	.url('http://localhost:3000/back-to-top')
      	.waitForElementVisible('body')
      	.execute('scrollTo(0,300)')
      	.verify.elementPresent('a[id="back-to-top"]')
      	.moveToElement('a[id="back-to-top"]', 0, 0)
		.mouseButtonClick(0)
		.assert.visible('h2')
      	.saveScreenshot('./test/e2e/back-to-top/back-to-top.png')
      	.end();
  }
};