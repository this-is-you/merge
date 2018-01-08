const request = require('request');

exports.handleSubmit = function(req, res) {
  console.log(req.body.action);
  const pull_request = req.body.pull_request;
  if(req.body.action === 'opened' && pull_request.mergeable === 'true') {
    console.log(req.body.pull_request.diff_url);
    console.log(pull_request.diff_url);
    request(pull_request.diff_url, (error, response, body) => {

      if(isSingleFileChangeAndNoDeletions(body) && isChangeInContributorsFile(body)) {
        const options = {
          url: pull_request.issue_url,
          json: { body: `Hi  @${pull_request.user.login}, I'm working on a similar project to help beginners to get started with contributing to open source projects.

Do check it out https://github.com/Roshanjossey/first-contributions` },
          headers: {
            Authorization: process.env.GITHUB_SECRET,
            'User-Agent': 'request',
          },
        };

        request.post(options, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('options:', options); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });
        options.url = `${pull_request.url}/merge`
        request.put(options, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('options:', options); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        });
      }
    })
  }
  res.json({message: "Awesome"});
}

const isSingleFileChangeAndNoDeletions = function(diff) {
  return diff.match(/[^-]--[^-]/g).length === 1;
};

const isChangeInContributorsFile = function(diff) {
  return diff.match(/Contributors\.md/g).length === 4;
};
