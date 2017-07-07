exports.test_order_func=function ( major_signal, item,callback){
/*
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
   if (index == 2) {
     item=val;
   }
   if (index == 3) {
     major_signal = val;
   }
});

*/
 if (  ( item*10000000) % (0.000050*10000000) == 0){
     console.log("no need to fix:" + item);
     callback(null,item);
  }
  else {
     console.log("needs to fix:" + item);
     fix_order(item);

  }

//var $arr=[1.250005,1.249855,1.24987,1.006775,1.006800,0.720005,0.720295,0.72002,1.005545,1.0059,1.309915,1.30996,0.720155,0.72046,0.768295,0.768445,0.769095,1.00575,1.006105,1.00679,1.31074,1.310255];
//var $arr=[1.250005];
function fix_order(item){
// http://nodejs.org/api.html#_child_processes
var sys = require('util')
var exec = require('child_process').exec;
var child;
// executes `pwd`
if (major_signal == 'BUY'){
   $str =  "source /IB_API/node-ib/examples/utils/fix_order_major_buy_stop_sell.sh" + " " + item;
}
if (major_signal == 'SELL'){
   $str = "source /IB_API/node-ib/examples/utils/fix_order_major_sell_stop_buy.sh" + " " + item;
}
child = exec($str , function (error, stdout, stderr) {
  console.log('output is: ' + stdout);
  if (stdout == 0) {
     console.log('it"s zero!');
  }
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
callback( null,stdout);
});

}

}
//console.log("val is" + val);
//console.log("val is" + val * 10000000);
// console.log( ( val*10000000) % (0.000050*10000000) );

