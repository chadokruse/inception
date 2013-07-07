// Madewith acts as a namespace for helper functions
if (typeof Madewith === 'undefined')
  Madewith = {};

Madewith.commentsForApp = function(app) {
  return Comments.find({app_id: app._id}, {sort: {when: -1}});
};

// canonicalize a URL or bare hostname into a FQDN
Madewith.normalizeAppName = function (name) {
  // No longer need to append meteor.com to inputted text
  
  var match = name.match('(.*://)?([a-zA-Z0-9\._\-]+)/?.*$');
  var host = match && match[2];

  if (!host)
    return null;
  else
    // append '.meteor.com' if it's a bare hostname
    return host.match(/\./) ? host : host + '';
  
  // Convert to SEO friendly URL
  /*
  var val = name;
  str = string_to_slug(val);
  function string_to_slug(str) {
  // Separate camel-cased words with a space for later processing. 
  str = str.replace(/[A-Z]/g, function(s){ 
      return " " + s; 
  }); 
    
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;",
      to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(from[i], to[i]);
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
    
  // Trim leading and trailing whitespace and dashes. 
  str = str.replace(/^[\s|-]+|[\s|-]+$/g, '');
}

    return str;
*/
  
    
    //return name;
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
  // No longer need to split
  /*
  var parts = name.split('.');
  if (parts.length === 3 && parts[1] === 'meteor' && parts[2] === 'com')
    return parts[0];
  else
    */
  // Replace dashes with spaces
  /*
  var str = name;
  str = str.replace(/-/g, ' ');
  //alert(str);
    return str;
  */
  // Replace spaces with dashes
  /*
  var str = name;
  str.replace(/\s+/g, '-');
  //alert(str);
    return str;
  */

  // Convert name input to SEO friendly URL
  /*
  var val = name;
  str = string_to_slug(val);
  function string_to_slug(str) {
  // Separate camel-cased words with a space for later processing. 
  str = str.replace(/[A-Z]/g, function(s){ 
      return " " + s; 
  }); 
    
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;",
      to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(from[i], to[i]);
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
    
  // Trim leading and trailing whitespace and dashes. 
  str = str.replace(/^[\s|-]+|[\s|-]+$/g, '');

  return str;
}

    return str;
*/
  return name;
};
