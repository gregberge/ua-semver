/**
 * Module dependencies.
 */

var uaParser = require('ua-parser');
var semver = require('semver');

/**
 * Expose module.
 */

exports.satisfies = satisfies;

/**
 * Check if a user agent satisfy some capabilities.
 *
 * @param {String} userAgent
 * @param {Object|Object[]} capabilities
 * @returns {Boolean}
 */

function satisfies(userAgent, capabilities) {
  // Support object.
  if (! Array.isArray(capabilities)) capabilities = [capabilities];

  var r = uaParser.parse(userAgent);
  var family = r.ua.family ? r.ua.family.toLowerCase() : null;
  var version = (r.ua.major || '0') + '.' + (r.ua.minor || '0') + '.' + (r.ua.patch || '0');

  return capabilities.some(function (capability) {
    return capability.family.toLowerCase() === family && semver.satisfies(version, capability.version);
  });
}