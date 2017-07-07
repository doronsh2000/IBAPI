var res;
var test_order= require('./test_order.js');
test_order.test_order_func("SELL", 0.767675,function(error,result){
   //console.log("result is bb:" + result);
   res= result;
});

console.log("res is" + res);
