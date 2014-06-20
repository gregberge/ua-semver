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

  r = prepare(r);
  r.ua = prepare(r.ua);
  r.os = prepare(r.os);
  r.device = prepare(r.device);

  return capabilities.some(function (capability) {
    return compare(capability, r.ua)
      && (capability.os ? compare(capability.os, r.os) : true)
      && (capability.device ? compare(capability.device, r.device) : true);
  });
}

/**
 * Prepare a part of userAgent before comparaison
 *
 * @param {Object} part
 * @returns {Object}
 */

function prepare(part) {
  // change string case for easier comparaison
  part.family = (part.family || "").toLowerCase();

  // build version string
  if (part.major || part.minor || part.patch) {
    part.version = (part.major || '0') + '.' + (part.minor || '0') + '.' + (part.patch || '0');
  }

  return part;
}

/**
 * Compare family & version of a given object with needed informations
 *
 * @param {Object} given
 * @param {Object} needed
 * @returns {Boolean}
 */

function compare(given, needed) {

  given.family = (given.family || "").toLowerCase();

  return given.family === needed.family && (given.version ? semver.satisfies(needed.version, given.version) : true);
}
