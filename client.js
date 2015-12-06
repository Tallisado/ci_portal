// can start slack notification
// can message 2 channels for build/releases
// custom message and links to the build
// API can create a harness on ratchet
// // API gives build ID to the API, which then will do the work


var SlackBot = require('slackbots');
var Client =  require('node-rest-client').Client;
// var net = require('net');

API_SERVER    = "192.168.122.92"  // NOTE: Need DNS or this to work, docker.klipfolio.com
API_PORT      = 3030



var args = {};
args.rest_url =     process.argv[2]  //slack // api
args.topology =     process.argv[3]  // docker1
args.tc_build_id =  process.argv[4]  // tc-build-id-l337
args.saas_id =      process.argv[5]  // saas-1111



// function
// function
function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}

var bot = null
var client = null

// support multi arg : slack/details
var env = null
var action = null
if(args.rest_url.indexOf('/') > -1) {
  action = args.rest_url.split('/')[0];
  env = args.rest_url.split('/')[1];
  console.log(action)
  console.log(env)
} else {
  action = args.rest_url
}

console.log(action)
switch(action) {
  case "api":
  {
    console.log("start api")
    client = new Client();
    // registering remote methods
    client.registerMethod("create", "http://localhost:3000/api/harnesses", "POST");
    client.registerMethod("signin", "http://localhost:3000/api/auth/signin", "POST");
    client.registerMethod("list", "http://localhost:3000/api/harnesses", "GET");
    client.methods.signin({
        data: { username: "asd", password: "asdasd" },
        headers:{"Content-Type": "application/json"}
      }, function(data,response){

      // parsed response body as js object
      console.log(data.toString('utf8'));
      client.methods.create({
          data: { vm_name: args.topology, tc_build_id: args.tc_build_id },
          headers:{"Content-Type": "application/json"}
      }, function(data,response){
          console.log(data.toString('utf8'));
          process.exit()
      })
    })
    break;
  }
  case "slack":
  {
    console.log("start slack")
    var slack = new SlackBot({
        token: 'xoxb-11660487557-claMDxXFYT94TEMSpxQH8lsI', // Add a bot https://my.slack.com/services/new/bot and put the token
        name: 'Ratchet'
    });
    var bot_params = { icon_emoji: ':space_invader:'};

    var slack_channel = 'unknown_env'
    var tc_url_build = " See http://teamcity.klipfolio.com:/" + args.tc_build_id
    var custom_words = ""
    if (env == "docker") {
      slack_channel = "build"
      custom_words = "Deployment on: " + args.topology + ".klipfolio.com  More details here: " + tc_url_build;
    }
    else if (env == "app" || env == "test-app" ) {
      slack_channel = "release"
      custom_words = "Release on: " + env + ".klipfolio.com - More details here: " + tc_url_build;
    }
    full_words = '*[' + env +  ']* ' + custom_words
    console.log("[sending] " + slack_channel + " > " + full_words)
    //bot.postMessageToChannel(slack_channel, full_words)

    // SLACK event handlers
    // bot.on('start', function() {
    //     bot.postMessageToGroup('tallis-ratchet', 'Ratchet Online!', bot_params);
    // });
    break;
  }
  default: console.log("WHAT?")
}
