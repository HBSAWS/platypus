var config = require('../../nightwatch.conf.js');

module.exports = { 
  'Forms': function(browser) {
    browser
      	.url('http://localhost:3000/forms')
      	.waitForElementVisible('body')
      	.verify.elementPresent('form')
      	// Try submitting form
      	.submitForm('form')
      	// Assert validation kicks in 
      	.assert.attributeContains('.form-group', 'class', 'has-danger')
      	.setValue('input[type=email]', 'test@domain.com')
        // should work
      	.assert.attributeContains('.form-group', 'class', 'has-success')
        // resize window and make sure hint text becomes tooltip on mobile
        .resizeWindow(500, 800)
        .assert.attributeContains('a[data-toggle="tooltip"] > i', 'class', 'fa-question-circle-o')
      	.saveScreenshot('./test/e2e/forms/form.png')
      	.end();
  }
};