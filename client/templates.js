Template.app_list.apps = function() {
  var order = MadewithSession.getOrder();
  switch (order) {
  case 'popular':
  case undefined: // XXX not quite sure when this happens, but it did.
    return Apps.find({}, {sort: {vote_count: -1, name: 1}});
    break;

  case 'recent':
    return Apps.find({}, {sort: {when: -1, name: 1}});
    break;

  default:
    throw new Error("Unexpected order: " + order);
  }
};

Template.add_or_draft_app.draft = function() {
  return MadewithSession.get('draft');
};

Template.draft_app.rendered = function() {
   $('.tooltips').tooltip(); //initialize all tooltips in this template
};

Template.draft_app.events({
  'keyup #draft_description, keyup #draft_name, keyup #draft_github_url': function() {
    $('.draft_app_submit').attr('disabled',
                                $('#draft_description').val() === '' ||
                                $('#draft_name').val() === '' ||
                                $('#draft_github_url').val() === '');
  },
  'click .draft_app_cancel': function() {
    MadewithSession.set('draft', false);
  },
  'click .draft_app_submit': function() {
    var name = Madewith.normalizeAppName($('#draft_name').val());
    var salt = Meteor.uuid();
    var password = $('#draft_password').val();

    var app = {
      name: name,
      description: $('#draft_description').val(),
      github_url: Madewith.removeUrlProtocol($('#draft_github_url').val()),
      pw_salt: salt,
      pw_sha: Crypto.SHA256(salt + '-' + password)
    };

    Meteor.call('createApp', app, function (err, id) {
      if (!err) {
        Router.setSelectedAppName(name);
        MadewithSession.set('draft', false);
        Madewith.animateToSelectedApp();        
        MadewithSession.set('lastAddedAppName', name); // No longer using lastAddedAppName
      }
    });

    //Sprintly API Call
    
    var sprintlyWho = $('#draft_description').val();
    var sprintlyWhat = name.replace(/-/g, ' ');
    var sprintlyWhy = $('#draft_github_url').val(); 

    var params = { 
        "type": "story",
        "who": sprintlyWho,
        "what": sprintlyWhat,
        "why": sprintlyWhy
      };

    Meteor.call('postToSprintly', params, function (err, respJson) {
      if(err) {
        window.alert("Error: " + err.reason);
        console.log("error occured on receiving data on server. ", err);
        //Session.set("showBadEmail", true); // From sample project - not used yet
      } else {
        console.log("respJson: ", respJson);
        Session.set("sprintlyResponse", respJson)
      }
      
    }); 
      
  }
});

Template.draft_app.sprintlyResponse = function() {
    return Session.get("sprintlyResponse") || [];
  }

Template.app_list.events({
  'click .add_app': function() {
    MadewithSession.set('draft', true);
  }
});

Template.app.events({
  'click .new_comment': function(event) {
    event.stopPropagation(); // so that we don't collapse the app
  },
  'click .new_comment_submit': function() {
    Meteor.call('comment',
                this._id,
                $('#new_comment_author').val(),
                $('#new_comment_comment').val(),
                function(err, result) {
                  if (!err) {
                    $('#new_comment_author').val('');
                    $('#new_comment_comment').val('');
                  }
                });

    event.stopPropagation(); // so that we don't collapse the app
  },
  'click .vote': function(event) {
    Router.setSelectedAppName(null);
    Meteor.call('vote', this.name);
    //Router.setSelectedAppName(this.name);
    event.stopPropagation();
  },
  
  'click #comments': function(event) {
    if (MadewithSession.getSelectedNormalizedAppName() === this.name) {
      Router.setSelectedAppName(null);
      }
    else
      Router.setSelectedAppName(this.name);
      event.stopPropagation();
    
  }
});

Template.app.name_css_id = function () {
  return this.name.replace(/\./g, '_'); // replace any decimal points with an underline so css ID works properly
};

Template.app.nameHumanReadable = function () {
  return this.name.replace(/-/g, ' '); // replace any decimal points with an underline so css ID works properly
};

Template.app.app_additional_class = function() {
  if (MadewithSession.equals('selectedAppName', this.name))
    return 'app_selected';
  else
    return '';
};

Template.app.comments_expanded = function() {
  return MadewithSession.equals('selectedAppName', this.name);
};

Template.app_comments.events({
  'keyup #new_comment_comment': function() {
    $('.new_comment_submit').attr('disabled',
                                  $('#new_comment_comment').val().length < 3);
  }
});

Template.app_comments.comments = function() {
  return Madewith.commentsForApp(this);
};

Template.app_comments.comment_html = function() {
  return Handlebars._escape(this.comment).replace(/\n/g, '<br>');
};

Template.app_comments.comment_author = function() {
  return this.author || 'Anonymous';
};

Template.action_bar.events({
  'click #sort_toggle_popular': function() {
    MadewithSession.setOrder('popular');
  },
  'click #sort_toggle_recent': function() {
    MadewithSession.setOrder('recent');
  }
});

Template.action_bar.additional_class = function(order) {
  return MadewithSession.equals('order', order) ? 'sort_toggle_selected' : '';
};

//Template.install_badge_instructions.just_added_app = function() {
 // return MadewithSession.equals('lastAddedAppName', this.name);
//};

Template.app.just_added_app = function() {
  return MadewithSession.equals('lastAddedAppName', this.name);
}

// Google Analytics
Template.googleAnalytics.rendered = function() {
    new GA('UA-37513215-1');
}
 
GA = function(code) {
    var _gaq = window._gaq || [];
    _gaq.push(['_setAccount', code]);
    _gaq.push(['_setDomainName', 'getkyn.com']);
    _gaq.push(['_trackPageview']);
    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
};
