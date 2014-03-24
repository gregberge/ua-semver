# ua-semver

Check user-agent with semver syntax.

## Install

```
npm install ua-semver
```

## Usage

```js
var ua = require('ua-semver');

var capabilities = [
  {
    family: 'chrome',
    version: '>=33'
  },
  {
    family: 'firefox',
    version: '>=23'
  }
];

ua.satisfies(navigator.userAgent, capabilities); // true or false
```

### ua.satisfies(userAgent, capabilities)

Check if the user agent satisfy some capability. You can pass a capability or an array of capabilities.
A capability is an object containing two attributes: "family" and "version", "version" must use the semver syntax.

```js
ua.satisfies(navigator.userAgent, {
  family: 'chrome',
  version: '>=33'
});
```

## License

MIT