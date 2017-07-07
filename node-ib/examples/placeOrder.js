require('colors');
var _ = require('lodash');
var orderid=0;



console.log("orderid of market is" + orderid);
ib.placeOrder(++orderid,ib.contract.forex('CHF'),ib.order.stop('BUY',50000,1.0054000));
console.log("orderid of stop is" + orderid);




var ib = new (require('..'))({
   //clientId: 16,
   // host: '10.8.0.4',
   // port: 7496
}).on('error', function (err) {
  console.error(err.message.red);
}).on('result', function (event, args) {
  if (!_.includes(['nextValidId', 'openOrder', 'openOrderEnd', 'orderStatus','execDetails'], event)) {
    console.log('%s %s', (event + ':').yellow, JSON.stringify(args));
  }
}).on('nextValidId', function (orderId) {
  console.log(
    '%s %s%d',
    '[nextValidId]'.cyan,
    'orderId='.bold, orderId
  );

   orderid=orderId;
}).on('execDetails', function (id,contract,exec) {
  console.log(
    '%s %s%d',
    '[reqId]'.cyan, id,
    'contract='.bold, JSON.stringify(contract),
    'exec='.bold, JSON.stringify(exec) 
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
  if (status=='Filled'){
     console.log('clear the order stuff!!!!!!!!!!!!!!!!!!!!!!!!!!!!111');
  }
});

ib.once('nextValidId', function (orderId) {
  console.log('Placing orders...'.yellow);
  orderid=orderId;
});






  // Place orders
//  ib.placeOrder(orderId, ib.contract.stock('AAPL'), ib.order.limit('BUY', 1, 0.01));
//  ib.placeOrder(orderId + 1, ib.contract.stock('GOOG'), ib.order.limit('SELL', 1, 9999));
 // ib.placeOrder(orderId + 2, ib.contract.stock('FB'), ib.order.limit('BUY', 1, 0.01));

//ib.placeOrder(++orderid,ib.contract.forex('GBP'),ib.order.market('SELL',10000));

ib.connect();
//ib.placeOrder(orderId+1,ib.contract.forex('CAD'),ib.order.trailingStop('SELL',100,0.00020));
 //   ib.reqAllOpenOrders();

//ib.placeOrder(orderId,ib.contract.forex('CAD'),ib.order.trailingStop('BUY',10000,0.00020));

//ib.placeOrder(orderId,ib.contract.forex('CAD'),ib.order.stopLimit('BUY',10000,1.31860,1.31840));

  // Check open orders
//  ib.reqOpenOrders();

  // Check next orderId
//  ib.reqIds(1000);
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
  }, 5000);
*/

//ib.connect();

