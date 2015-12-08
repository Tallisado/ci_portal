// can start slack notification
// can message 2 channels for build/releases
// custom message and links to the build
// API can create a harness on ratchet
// // API gives build ID to the API, which then will do the work
var SlackBot = require('slackbots');
var Client =  require('node-rest-client').Client;
var argv = require('yargs')
    .boolean('force')
    .default('channel','ratchet-tallis')
    .default('server_name','')
    .argv;

// console.log(argv.channel);      // general
// console.log(argv.server_name);      // NOTE: will be removing for mongo holdee
// console.log(argv.tc_build_id);  //tvanek
// console.log(argv.saas_id);  //tvanek


var slack = new SlackBot({
    token: 'xoxb-11660487557-claMDxXFYT94TEMSpxQH8lsI', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Ratchet'
});

function slackAPI(){
  // console.log("start slack")

  var bot_params = { icon_emoji: ':space_invader:'};
  var custom_words = "Deployment on: " + (argv.server_name ? argv.server_name : "") + ".klipfolio.com"

  // docker build
  if (argv.tc_build_id)  {
    custom_words += " More details here: http://teamcity.klipfolio.com/" + argv.tc_build_id
  }

  full_words = '*[' + argv.server_name +  ']* ' + custom_words
  console.log(argv.channel + ' ' + full_words)
  //bot.postMessageToChannel(slack_channel, full_words)
}

slackAPI()
process.exit(0);
