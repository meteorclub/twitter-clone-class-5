Template.tweets.created = function() {
  Session.set('lastSeenTweets', new Date());
};

Template.tweets.helpers({
  newTweets: function() {
    return Tweets.find({
      tweetedAt: {
        $gt: Session.get('lastSeenTweets')
      }
    });
  },
  profileTweets: function() {
    return Tweets.find({
      userId: this.user._id,
      tweetedAt: {
        $lt: Session.get('lastSeenTweets')
      }
    }, {
      sort: {tweetedAt: -1}
    });
  },
  tweets: function() {
    return Tweets.find({
      tweetedAt: {
        $lt: Session.get('lastSeenTweets')
      }
    }, {
      sort: {tweetedAt: -1}
    });
  }
});

Template.tweets.events({
  "click .show-new-tweets": function(event, template) {
    Session.set('lastSeenTweets', new Date());
  }
});
