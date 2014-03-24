var expect = require('chai').expect;
var ua = require('../lib/ua-semver');

describe('UA semver', function () {
  describe('#satisfies', function () {
    var userAgent;

    beforeEach(function () {
      userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36';
    });

    it('should support array of capabilities', function () {
      var result = ua.satisfies(userAgent, [
        {
          family: 'firefox',
          version: '>30'
        },
        {
          family: 'chrome',
          version: '>30'
        }
      ]);

      expect(result).to.be.true;
    });

    it('should support single capability', function () {
      var result = ua.satisfies(userAgent, {
        family: 'chrome',
        version: '>30'
      });

      expect(result).to.be.true;
    });

    it('should test family', function () {
      var result = ua.satisfies(userAgent, {
        family: 'ChRome',
        version: '>30'
      });

      expect(result).to.be.true;
    });

    it('should test version', function () {
      var result = ua.satisfies(userAgent, {
        family: 'chrome',
        version: '>59'
      });

      expect(result).to.be.false;
    });
  });
});