require('colors');
var _ = require('lodash');
var signal;

function opposite_signal(signal_in_func){
  //console.log('signal is ' + signal_in_func);
  if (signal_in_func == 'BUY') {
    //  console.log('opposite signal is' + 'SELL');
      return 'SELL';
  } else {
    // console.log('opposite signal is' + 'BUY');
      return 'BUY';
  }
}


process.argv.forEach(function(val,index,array){
   if(val>0) {
     //    console.log("signal is up! ");
         signal='BUY';
      } else {
      //    console.log("signal is down!");
          signal='SELL';
      }
});

var a=opposite_signal(signal);
console.log('a is:' + a);





var ib = new (require('..'))({
   clientId: 15,
  // host: '127.0.0.1',
  // port: 7496
}).on('error', function (err) {
  console.error(err.message.red);
}).on('result', function (event, args) {
  if (!_.includes(['nextValidId', 'openOrder', 'openOrderEnd', 'orderStatus'], event)) {
    console.log('%s %s', (event + ':').yellow, JSON.stringify(args));
  }
}).on('nextValidId', function (orderId) {
  console.log(
    '%s %s%d',
    '[nextValidId]'.cyan,
    'orderId='.bold, orderId
  );
}).on('openOrder', function (orderId, contract, order, orderState) {
  console.log(
    '%s %s%d %s%s %s%s %s%s',
    '[openOrder]'.cyan,
    'orderId='.bold, orderId,
    'contract='.bold, JSON.stringify(contract),
    'order='.bold, JSON.stringify(order),
    'orderState='.bold, JSON.stringify(orderState)
  );
}).on('openOrderEnd', function () {
  console.log('[openOrderEnd]'.cyan);
  ib.disconnect();
}).on('orderStatus', function (id, status, filled, remaining, avgFillPrice, permId,
                               parentId, lastFillPrice, clientId, whyHeld) {
  console.log(
    '%s %s%d %s%s %s%d %s%d %s%d %s%d %s%d %s%d %s%d %s%s',
    '[orderStatus]'.cyan,
    'id='.bold, id,
    'status='.bold, status,
    'filled='.bold, filled,
    'remaining='.bold, remaining,
    'avgFillPrice='.bold, avgFillPrice,
    'permId='.bold, permId,
    'parentId='.bold, parentId,
    'lastFillPrice='.bold, lastFillPrice,
    'clientId='.bold, clientId,
    'whyHeld='.bold, whyHeld
  );
});

ib.once('nextValidId', function (orderId) {
  console.log('Placing orders...'.yellow);

  // Place orders
//  ib.placeOrder(orderId, ib.contract.stock('AAPL'), ib.order.limit('BUY', 1, 0.01));
//  ib.placeOrder(orderId + 1, ib.contract.stock('GOOG'), ib.order.limit('SELL', 1, 9999));
 // ib.placeOrder(orderId + 2, ib.contract.stock('FB'), ib.order.limit('BUY', 1, 0.01));



ib.placeOrder(orderId++,ib.contract.forex('CAD'),ib.order.market('BUY',10000));
ib.placeOrder(orderId++,ib.contract.forex('CAD'),ib.order.trailingStop('SELL',10000,0.00030));
ib.placeOrder(orderId++,ib.contract.forex('CHF'),ib.order.market('BUY',10000));
ib.placeOrder(orderId++,ib.contract.forex('CHF'),ib.order.trailingStop('SELL',10000,0.00030));
ib.placeOrder(orderId++,ib.contract.forex('JPY'),ib.order.market('BUY',10000));
ib.placeOrder(orderId++,ib.contract.forex('JPY'),ib.order.trailingStop('SELL',10000,0.00030));


ib.placeOrder(orderId++,ib.contract.forex('EUR'),ib.order.market('SELL',10000));
ib.placeOrder(orderId++,ib.contract.forex('EUR'),ib.order.trailingStop('BUY',10000,0.00030));
ib.placeOrder(orderId++,ib.contract.forex('AUD'),ib.order.market('SELL',10000));
ib.placeOrder(orderId++,ib.contract.forex('AUD'),ib.order.trailingStop('BUY',10000,0.00030));
ib.placeOrder(orderId++,ib.contract.forex('NZD'),ib.order.market('SELL',10000));
ib.placeOrder(orderId++,ib.contract.forex('NZD'),ib.order.trailingStop('BUY',10000,0.00030));
//ib.placeOrder(orderId++,ib.contract.forex('GBP'),ib.order.market('SELL',10000));
//ib.placeOrder(orderId++,ib.contract.forex('GBP'),ib.order.trailingStop(signal,10000,0.00030));





//ib.placeOrder(orderId,ib.contract.forex('CAD'),ib.order.stopLimit('BUY',1000000,1.31860,1.31840));
  // Check open orders
  ib.reqOpenOrders();

  // Check next orderId
//  ib.reqIds(1);
/*
  // Cancel orders after 5 seconds.
  setTimeout(function () {
    console.log('Cancelling orders...'.yellow);
    ib.cancelOrder(orderId);
    ib.cancelOrder(orderId + 1);
    ib.cancelOrder(orderId + 2);
    ib.cancelOrder(orderId + 3);
    ib.once('openOrderEnd', function () {
      console.log('Disconnecting...'.yellow);
      ib.disconnect();
    });
    ib.reqAllOpenOrders();
  }, 10000);
*/
});

ib.connect()
  .reqIds(7);
module.exports=ib;

