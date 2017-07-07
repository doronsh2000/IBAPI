var fs=require('fs');
var RedisEvent=require('redis-event');

var orderid;
console.log('starting redis SubScribe!');
var event=new RedisEvent('localhost',['forex_buy_and_sell']);
var coin_to_reqid_map={"1": "GBP", "2":"EUR", "3":"CAD","4":"JPY","5":"AUD","6":"CHF","7":"NZD","8":"KRW"};
var print_msg=0;   // avoid printing repeatdly "there is BUY/SELL on some coin". print only once
var collection='';
var trail_orderid=1;  // will hold last trail orderid, so we can cancel it.
var gbp_stop_signal, cad_stop_signal;
var gbp_last_close,cad_last_close;
var ib;



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

collection=db.collection('reqHistoryData');

});


  //  process.exit(1);
  //   fs.appendFileSync('/IB_TI/node-talib-0.4.0/examples/signals.txt',data.name + '-' + data.signal + ' bought 50000' + ' '+ new Date()  + '\n');
  //   fs.appendFileSync('/IB_TI/node-talib-0.4.0/examples/signals.txt',data.name + 'close price BAR is: ' + data.close + ' '+ new Date()  + '\n');

     // });




 ib = new (require('..'))({
//   clientId: 14,
//   host: '10.0.0.4',
//   port: 7496 
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
var now=new Date();
var minutes=now.getMinutes();
if (minutes == '00' || minutes == '30') {
console.log("minutes are: " + minutes);

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
}
}).on('nextValidId', function (orderId) {
  console.log(
    '%s %s%d',
    '[nextValidId]'.cyan,
    'orderId='.bold, orderId
  );
        orderid=orderId;

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
   if (status=='Filled' && whyHeld=='locate, trigger'){
     console.log('one of the stoploss activated. please exit!!!!!!!!!!!!!!!!!!!!!!');
     process.exit(50);
  }
});



//   ib.placeOrder(36,ib.contract.forex(jsonContent.name),ib.order.market(jsonContent.signal,50000));
  // ib.placeOrder(36,ib.contract.forex(jsonContent.name),ib.order.market(jsonContent.signal,50000));
//},5000);

ib.connect();
var now=new Date();

//var now =now.getTime() - (1000*60*60);
console.log(dateformat(now,"yyyymmdd H:MM:ss"));

   ib.once('nextValidId', function (orderId) {
        console.log('Placing orders...'.yellow);
        orderid=orderId;
    });

setTimeout(function(){
console.log("orderid of market is" + orderid);
//ib.placeOrder(++orderid,ib.contract.forex('CHF'),ib.order.market('BUY',50000));
ib.placeOrder(++orderid,ib.contract.forex('GBP'),ib.order.stop('SELL',50000,1.244970));

console.log("orderid of stop is" + orderid);
},100);




