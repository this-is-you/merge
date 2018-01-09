const request = require('request');

exports.handleSubmit = function(req, res) {
  const pullRequest = req.body.pull_request;
  if(req.body.action === 'opened' && (isSingleAddition(pullRequest) || isTwoAdditionsAndSingleDeletion(pullRequest))) {
    request(pullRequest.diff_url, (error, response, body) => {

      if(isChangeInContributorsFile(body)) {
        const options = {
          url: `${pullRequest.url}/merge`,
          json: { body: `Hi  @${pullRequest.user.login}, I'm quite elated about your pull request. I wanna evolve this project to addresses various problems faced by first-time contributors. I'd love to learn about your journey in open source community, the problems, pain points you had etc.
Could you explain how you felt when you went through the tutorial, made a pull request and learned that I merged it?

 We’ve recently added social share  to our web app. Could you please go to https://roshanjossey.github.io/first-contributions/#social-share and share your first contribution to open source?  Also, check out projects with easy issues while you’re there.` },
          headers: {
            Authorization: process.env.GITHUB_SECRET,
            'User-Agent': 'request',
          },
        };
        request.put(options, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('options:', options); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          options.url = `${pullRequest.issue_url}/comments`
          if(response.statusCode === 200) {
            request.post(options, function (error, response, body) {
              console.log('error:', error); // Print the error if one occurred
              console.log('options:', options); // Print the error if one occurred
              console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            });
          }
        });
      }
    })
  }
  res.json({message: "Awesome"});
}

const isChangeInContributorsFile = function(diff) {
  return (diff.match(/Contributors\.md/g) || [] ).length === 4;
};

const isSingleAddition = function(pullRequest) {
  return(pullRequest.additions === 1 && pullRequest.deletions === 0 && pullRequest.changed_files === 1);
}

const isTwoAdditionsAndSingleDeletion = function(pullRequest) {
  return(pullRequest.additions === 2 && pullRequest.deletions === 1 && pullRequest.changed_files === 1);
}
