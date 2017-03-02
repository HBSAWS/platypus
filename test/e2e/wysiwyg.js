var config = require('../../nightwatch.conf.js');

module.exports = { 
  'WYSIWYG': function(browser) {
    browser
      	.url('http://localhost:3000/wysiwyg')
      	.waitForElementVisible('body')
      	.verify.elementPresent('.note-editor')
      	.saveScreenshot('./test/e2e/wysiwyg/wysiwyg.png')
      	.end();
  }
};