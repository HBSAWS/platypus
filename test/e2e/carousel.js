var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { 
  'Carousel': function(browser) {
    browser
      	.url('http://localhost:3000/carousel')
      	.waitForElementVisible('body')
      	.verify.elementPresent('.carousel')
      	.click('.slick-dots > li:nth-child(2) > button')
      	.saveScreenshot('./test/e2e/carousel/carousel.png')
      	.end();
  }
};