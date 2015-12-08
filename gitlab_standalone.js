// https://www.npmjs.com/package/youtrack-rest-node-library
// https://github.com/node-gitlab/node-gitlab
var target_saas_id =  parseInt(process.argv[2]);
var utrack_user =     parseInt(process.argv[3]);
var utrack_pass =     parseInt(process.argv[4]);

var utrack_project_url  = http://your-youtrack-instance:8080
var utrack_project_id   = "??????"

var projectId = 19;

// Connection
var gitlab = require('gitlab')({
  url:   'http://nest.klipfolio.com',
  token: '2TmUNFCVV71ERP-d87bE'
});

var Connection = require('youtrack-rest-node-library');
var youtrack = new Connection(utrack_url);


process.stdout.write('\u001B[2J\u001B[0;0f');


youtrack.login(''+utrack_user+','+utrack_pass+'', function(err){
    youtrack.getProject(utrack_project_id, function(err, project){
        console.log("=== PROJECT ===");
        console.log(project);
    })
})

// gitlab.projects.repository.showFile({
//  projectId: projectId,
//  ref: 'master',
//  file_path: 'README.md'
// }, function(file) {
//  console.log;
//  console.log("=== File ===");
//  console.log(file);
//  if (file) {
//    console.log;
//    console.log("=== Content ===");
//    return console.log((new Buffer(file.content, 'base64')).toString());
//  }
// });

var webui_branch_names = [];
var webui_branch_messages = [];
gitlab.projects.repository.listBranches( projectId, function(branches) {
  for (var i = 0; i < branches.length; i++) {
    var branch_name = branches[i].name
    var branch_message = branches[i].commit.message

    if (branch_message.indexOf(target_saas_id) > -1) {
      webui_branch_names.push("http://nest.klipfolio.com/saas/saas-webui/commits/" + branches[i].name);
      webui_branch_messages.push(branches[i].commit.message);
    }
  }
  console.log("=== BRANCHES ===");

  for (var i = 0; i < webui_branch_names.length; i++) {

    console.log("::nest url::");
    console.log("http://nest.klipfolio.com/saas/saas-webui/commits/" + webui_branch_names[i]);
    console.log(webui_branch_messages);
  }

});

function collectBranches(projectId, target_saas_id) {

  var webui_branch_names = [];
  var webui_branch_messages = [];
  gitlab.projects.repository.listBranches( projectId, function(branches) {
    for (var i = 0; i < branches.length; i++) {
      var branch_name = branches[i].name
      var branch_message = branches[i].commit.message

      if (branch_message.indexOf(target_saas_id) > -1) {
        webui_branch_names.push("http://nest.klipfolio.com/saas/saas-webui/commits/" + branches[i].name);
        webui_branch_messages.push(branches[i].commit.message);
      }
    }
    console.log("=== BRANCHES ===");

    for (var i = 0; i < webui_branch_names.length; i++) {

      console.log("::nest url::");
      console.log("http://nest.klipfolio.com/saas/saas-webui/commits/" + webui_branch_names[i]);
      console.log(webui_branch_messages);
    }

  });
}

// Listing users
// gitlab.users.all(function(users) {
//   for (var i = 0; i < users.length; i++) {
//     console.log("#" + users[i].id + ": " + users[i].email + ", " + users[i].name + ", " + users[i].created_at);
//   }
// });

// Listing projects
// gitlab.projects.all(function(projects) {
//   for (var i = 0; i < projects.length; i++) {
//
//     projects[i].id
//     projects[i].name
//
//
//
//     console.log("#" + projects[i].id + ": " + projects[i].name + ", path: "
//       + projects[i].path + ", default_branch: " + projects[i].default_branch + ", private: "
//       + projects[i]["private"] + " date: "
//       + projects[i].created_at);
//   }
// });
