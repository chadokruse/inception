// Madewith acts as a namespace for helper functions
if (typeof Madewith === 'undefined')
  Madewith = {};

Madewith.commentsForApp = function(app) {
  return Comments.find({app_id: app._id}, {sort: {when: -1}});
};

// canonicalize a URL or bare hostname into a FQDN
Madewith.normalizeAppName = function (name) {
  // Guts have been stripped out
    return name;
};

// No longer using this (as we don't ask for any urls)
//
// Madewith.removeUrlProtocol('http://foo.com') === 'foo.com'
// Madewith.removeUrlProtocol('bar.com') === 'bar.com'
Madewith.removeUrlProtocol = function(url) {
  var match = url.match('https?://(.*)$');
  if (match)
    return match[1];
  else
    return url;
};

// Returns the name to be used in the URL for this app (see client/router.js)
//
// This code is duplicated in the madewith smartpackage (see #DisplayAppName)
// XXX - Can this code somehow be shared reasonably?
Madewith.displayAppName = function (name) {
  // Guts have been stripped out
    return name;
};
