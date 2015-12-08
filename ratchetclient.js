// can start slack notification
// can message 2 channels for build/releases
// custom message and links to the build
// API can create a harness on ratchet
// // API gives build ID to the API, which then will do the work

// node ratchetclient.js --operation vms --verb POST --vm_name dockerino --owner tvanek --channel "build" --tc_build_id tcbuild1000 --expire 6

var SlackBot = require('slackbots');
var Client =  require('node-rest-client').Client;
var argv = require('yargs')
    .boolean('force')
    .default('vm_name','')
    .argv;

console.log(argv.operation);    // harnesses / vms
console.log(argv.verb);         // POST/GET
console.log(argv.channel);      // general
console.log(argv.vm_name);      // NOTE: will be removing for mongo holder
console.log(argv.owner);        //tvanek
console.log(argv.tc_build_id);        //tvanek
console.log(argv.force);        //tvanek

client = new Client();
client.registerMethod("act", "http://localhost:3000/api/"+argv.operation, argv.verb);

function restData() {
  switch(argv.operation) {
    case "harnesses":
      return { vm_name: argv.vm_name, tc_build_id: argv.tc_build_id, saas_id: argv.saas_id, owner: argv.owner }
    case "vms":
      return { vm_name: argv.vm_name, expire: argv.expire, owner: argv.owner, force: argv.force }
    default:
      process.exit(1);
  }
}

client.methods.act({
    data: restData(),
    headers:{"Content-Type": "application/json"}
}, function(data,response){
    console.log(data.toString('utf8'));
    process.exit()
})
