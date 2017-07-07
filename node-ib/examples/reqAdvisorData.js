var fs=require('fs');
var RedisEvent=require('redis-event');
var orderId=0;
console.log('starting redis SubScribe!');
var event=new RedisEvent('localhost',['forex_buy_and_sell']);
var coin_to_reqid_map={"1": "GBP", "2":"EUR", "3":"CAD","4":"JPY","5":"AUD","6":"CHF","7":"NZD"};
var print_msg=0;   // avoid printing repeatdly "there is BUY/SELL on some coin". print only once

var dateformat=require('dateformat');
var file_not_exists;
//var now=new Date();
//bellow workaround to display the time in the future to get current last hisotrical data. we are adding 10H just in case to get current historical everytime
//var now_in_the_future=new Date(now);
//now_in_the_future.setHours(now.getHours()+3);
//bellow var is for not placing order twice when an order is in place
var check_if_buy_or_sell_in_place='';
var coin='';



require('colors');
var _ = require('lodash');


var mongodb=require('mongodb');

var mongo_client=mongodb.MongoClient;

var db_url='mongodb://localhost:27017/forexdb';

mongo_client.connect(db_url,function(err,db){
if(err){
  console.log('unable to connect to mongodb', err);
} else {
  console.log('connection to mongodb established.',db_url);
}

var collection=db.collection('reqHistoryDataAdvisor');

var ib = new (require('..'))({
   clientId: 11,
  // host: '127.0.0.1',
  // port: 7496
}).on('error', function (err) {
  console.error(err.message.red);
}).on('result', function (event, args) {
  if (!_.includes(['nextValidId', 'openOrder', 'openOrderEnd', 'orderStatus'], event)) {
    console.log('%s %s', (event + ':').yellow, JSON.stringify(args));
  }
}).on('historicalData', function (reqId, date, open, high, low, close, volume, barCount, WAP, hasGaps) {
  if (_.includes([-1], open)) {
    console.log('endhistoricalData');
  } else {
    console.log(
    '%s %s%d %s%s %s%d %s%d %s%d %s%d %s%d %s%d %s%d %s%d',
    '[historicalData]'.cyan,
    'reqId='.bold, reqId,
    'date='.bold, date,
    'open='.bold, open,
    'high='.bold, high,
    'low='.bold, low,
    'close='.bold, close,
    'volume='.bold, volume,
    'barCount='.bold, barCount,
    'WAP='.bold, WAP,
    'hasGaps='.bold, hasGaps
    );
var str="'open':" + open + ",'close':" + close + ",'low':" + low + ",'high':" + high;
console.log("string str is" + str);


collection.update({forex:{'reqid':reqId,'name':coin_to_reqid_map[reqId]}},{$push: { close: close,open:open,low:low,high:high,volume:volume}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

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
  //ib.disconnect();
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
var str="'open':" + open + ",'close':" + close + ",'low':" + low + ",'high':" + high;
console.log("string str is" + str);


});

ib.once('nextValidId', function (orderId) {
  console.log('Placing orders...'.yellow);
});
  // Place orders
//  ib.placeOrder(orderId, ib.contract.stock('AAPL'), ib.order.limit('BUY', 1, 0.01));
//  ib.placeOrder(orderId + 1, ib.contract.stock('GOOG'), ib.order.limit('SELL', 1, 9999));
 // ib.placeOrder(orderId + 2, ib.contract.stock('FB'), ib.order.limit('BUY', 1, 0.01));
//ib.placeOrder(orderId,ib.contract.forex('CAD'),ib.order.market('BUY',25000));
//ib.placeOrder(orderId,ib.contract.forex('CAD'),ib.order.trailingStop('SELL',25000,0.00020));
//ib.placeOrder(orderId,ib.contract.forex('CAD'),ib.order.trailingStop('BUY',10000,0.00020));

ib.connect();



var now=new Date();console.log(dateformat(now,"yyyymmdd H:MM:ss"));
ib.reqHistoricalData(3,  ib.contract.forex('CAD'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);
ib.reqHistoricalData(4,  ib.contract.forex('JPY'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);
ib.reqHistoricalData(1,  ib.contract.forex('GBP'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);
ib.reqHistoricalData(2,  ib.contract.forex('EUR'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);
ib.reqHistoricalData(5,  ib.contract.forex('AUD'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);
ib.reqHistoricalData(6,  ib.contract.forex('CHF'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);
ib.reqHistoricalData(7,  ib.contract.forex('NZD'),dateformat(now,"yyyymmdd H:MM"),durationStr='1 D',barSizeSetting='5 mins',whatToShow='MIDPOINT',useRTH=1,formatDate=1);


});


