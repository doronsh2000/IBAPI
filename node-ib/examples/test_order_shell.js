// http://nodejs.org/api.html#_child_processes
var sys = require('util')
var exec = require('child_process').exec;
var child;
// executes `pwd`
child = exec("./test_order.sh 0.768300", function (error, stdout, stderr) {
  console.log('output is: ' + stdout);
  if (stdout == 0) {
     console.log('it"s zero!');
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

