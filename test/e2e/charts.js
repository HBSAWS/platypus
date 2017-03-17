var config = require('../../nightwatch.conf.js');

module.exports = { 
  'Charts': function(browser) {
    browser
      	.url('http://localhost:3000/charts')
      	.waitForElementVisible('body')
      	.verify.elementPresent('.hbs-charts')
      	.expect.element('.hbs-charts').to.have.attribute('data-type')
      	.verify.elementPresent('.c3-chart-arcs')
      	.saveScreenshot('./test/e2e/charts/charts.png')
      	.end();
  }
};