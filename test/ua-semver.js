var expect = require('chai').expect;
var ua = require('../lib/ua-semver');

var agents = {
  chrome: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
  firefox: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:27.0) Gecko/20100101 Firefox/27.0',
  ipad: 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25'
};

describe('UA semver', function () {

  describe('#satisfies', function () {

    it('should support array of capabilities', function () {
      var result = ua.satisfies(agents.chrome, [
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
      var result = ua.satisfies(agents.chrome, {
        family: 'chrome',
        version: '>30'
      });

      expect(result).to.be.true;
    });

    it('should refuses missing family', function () {
      var result = ua.satisfies(agents.chrome, {
        version: '>30'
      });

      expect(result).to.be.false;
    });

    it('should accept missing version', function () {
      var result = ua.satisfies(agents.chrome, {
        family: 'chrome'
      });

      expect(result).to.be.true;
    });

    it('should test family', function () {
      var result = ua.satisfies(agents.chrome, {
        family: 'ChRome',
        version: '>30'
      });

      expect(result).to.be.true;
    });

    it('should test version', function () {
      var result = ua.satisfies(agents.chrome, {
        family: 'chrome',
        version: '>59'
      });

      expect(result).to.be.false;
    });

    it('should test device', function () {
      var result = ua.satisfies(agents.ipad, {
        family: 'mobile safari',
        version: '6',
        device: {
          family: 'ipad'
        }
      });

      expect(result).to.be.true;
    });

    it('should test os', function () {
      var result = ua.satisfies(agents.ipad, {
        family: 'mobile safari',
        version: '6',
        os: {
          family: 'ios',
          version: '6'
        }
      });

      expect(result).to.be.true;
    });

    it('should support user agent that are not respecting semver', function () {
      var result = ua.satisfies(agents.firefox, {
        family: 'chrome',
        version: '>59'
      });

      expect(result).to.be.false;
    });
  });
});
