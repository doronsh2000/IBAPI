var fs = require("fs");
require('colors');
var RedisEvent=require('redis-event');
var redis=require('redis');
var client=redis.createClient();
var _ = require('lodash');
var coin_to_reqid_map={"1": "GBP", "2":"EUR", "3":"CAD","4":"JPY","5":"AUD","6":"CHF","7":"NZD","8":"KRW"};
var data_entry={};
var array_data_entry=[];
var orderid=0;


var mongodb=require('mongodb');

var mongo_client=mongodb.MongoClient;

var db_url='mongodb://localhost:27017/forexdb';

mongo_client.connect(db_url,function(err,db){
if(err){
  console.log('unable to connect to mongodb', err);
} else {
  console.log('connection to mongodb established.',db_url);
}

var collection=db.collection('forex_1s');

function forex_setup(){
  var GBP={_id:1,name:'GBP',reqid:1,close:[],open:[],low:[],high:[],volume:[]};
  collection.insert(GBP,function(err,result){
  if(err){
    console.log(err);
  }else {
    console.log('Inserted %d documents into the forex collection.the documents inserted with "_id" are:',result.length,result);
  }
});

}

//forex_setup();

var event=new RedisEvent('localhost',['forex_buy_and_sell']);
event.on('ready',function(){
    event.on('forex_buy_and_sell:app',function(data){
        ib.once('nextValidId', function (orderId) {
        console.log('Placing orders...'.yellow);
        orderid=orderId;
    });
    console.log(data);
    console.log('signal is: ' + data.signal + ' and coin is ' + data.name);
});
});

var ib = new (require('..'))({
   clientId: 15,
  // host: '127.0.0.1',
  // port: 7496
}).on('error', function (err) {
  console.error(err.message.red);
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
}).on('result', function (event, args) {
  if (!_.includes(['realtimeBar','nextValidId', 'openOrder', 'openOrderEnd', 'orderStatus'], event)) {
    console.log('%s %s', (event + ':').yellow, JSON.stringify(args));
  }
}).on('nextValidId', function (orderId) {
  console.log(
    '%s %s%d',
    '[nextValidId]'.cyan,
    'orderId='.bold, orderId
  );
}).on('realtimeBar', function (reqId, time, open, high, low, close, volume, wap, count) {
  console.log(
    '%s %s%d %s%d %s%d %s%d %s%d %s%d %s%d %s%d %s%d',
    '[realtimeBar]'.cyan,
    'reqId='.bold, reqId,
    'time='.bold, time,
    'open='.bold, open,
    'high='.bold, high,
    'low='.bold, low,
    'close='.bold, close,
    'volume='.bold, volume,
    'wap='.bold, wap,
    'count='.bold, count
  );

var str="'reqid:'" + reqId + "'open':" + open + ",'close':" + close + ",'low':" + low + ",'high':" + high;
console.log("string str is" + str);
// var event=new RedisEvent('localhost',['forex_buy_and_sell']);
collection.update({forex:{'reqid':reqId,'name':coin_to_reqid_map[reqId]}},{$push: { close: close,open:open,low:low,high:high,volume:volume}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});


});  


ib.once('nextValidId', function (orderId) {
  console.log('Placing orders...'.yellow);
  orderid=orderId;
});

ib.connect();

// Forex
// ib.reqRealTimeBars(1, ib.contract.forex('EUR'), 5, 'TRADES', true);
// ib.reqRealTimeBars(2, ib.contract.forex('GBP'), 5, 'BID', true);
// ib.reqRealTimeBars(4, ib.contract.forex('HKD'), 5, 'MIDPOINT', true);
// ib.reqRealTimeBars(5, ib.contract.forex('JPY'), 5, 'TRADES', true);
 //ib.reqRealTimeBars(6, ib.contract.forex('KRW'), 5, 'BID', true);
 ib.reqRealTimeBars(1, ib.contract.forex('GBP'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(2, ib.contract.forex('EUR'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(3, ib.contract.forex('CAD'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(4, ib.contract.forex('JPY'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(5, ib.contract.forex('AUD'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(6, ib.contract.forex('CHF'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(7, ib.contract.forex('NZD'), 5, 'MIDPOINT', true);


//  ib.disconnect();
});
