var fs=require('fs');
var RedisEvent=require('redis-event');

var orderid=0;
console.log('starting redis SubScribe!');
var event=new RedisEvent('localhost',['forex_buy_and_sell']);
var coin_to_reqid_map={"1": "GBP", "2":"EUR", "3":"CAD","4":"JPY","5":"AUD","6":"CHF","7":"NZD","8":"KRW"};
var print_msg=0;   // avoid printing repeatdly "there is BUY/SELL on some coin". print only once
var collection='';
var trail_orderid=1;  // will hold last trail orderid, so we can cancel it.


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


    event.on('ready',function(){
    event.on('forex_buy_and_sell:app',function(data){
        ib.once('nextValidId', function (orderId) {
        console.log('Placing orders...'.yellow);
        orderid=orderId;
        });
      //  console.log(data);
      console.log('signal is: ' + data.signal + ' and coin is ' + data.name);
      if(check_if_buy_or_sell_in_place==data.signal && coin==data.name ){
         if (print_msg==0){
            console.log('there is already a' + data.signal + ' order on ' + data.name + ' coin');
            print_msg=1;
         }
      }
      else {
         console.log('placing a ' +  data.signal + ' order on ' + data.name + 'coin');
   //          console.log('file with coin' + data.name + ' exists!');
		ib.placeOrder(orderid++,ib.contract.forex(data.name),ib.order.market(data.signal,50000));
                fs.appendFileSync('/IB_API/node-ib/examples/signals.txt','take profit in ' + data.name + '-' + data.signal + ' bought 50000' + ' '+ new Date()  + '\n');
              /*  fs.exists('/IB_TI/node-talib-0.4.0/examples/' + data.name + '.first' ,function(exists){
                  if(exists){
                     fs.unlinkSync('/IB_TI/node-talib-0.4.0/examples/' + data.name + '.first');
                  }
                });
             */
         check_if_buy_or_sell_in_place=data.signal;
         coin=data.name;
      }
   });
});



var ib = new (require('..'))({
  // clientId: 14,
  //  host: '10.0.0.4',
  // port: 7496 
}).on('error', function (err) {
  console.error(err.message.red);
}).on('result', function (event, args) {
  if (!_.includes(['realtimeBar','nextValidId', 'openOrder', 'openOrderEnd', 'orderStatus'], event)) {
    console.log('%s %s', (event + ':').yellow, JSON.stringify(args));
  }
}).on('realtimeBar', function (reqId, time, open, high, low, close, volume, wap, count) {
 /* console.log(
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
*/
var str="'open':" + open + ",'close':" + close + ",'low':" + low + ",'high':" + high;
//console.log("string str is" + str);

collection.update({forex:{'reqid':reqId,'name':coin_to_reqid_map[reqId]}},{$push: { close: close,open:open,low:low,high:high,volume:volume}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
  //    console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

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
   if (status=='Filled' && whyHeld=='locate, trigger'){
     console.log('one of the stoploss activated. please exit!!!!!!!!!!!!!!!!!!!!!!');
     process.exit(50);
  }
});

ib.once('nextValidId', function (orderId) {
  console.log('Placing orders...'.yellow);
  orderid=orderId;
});


//   ib.placeOrder(36,ib.contract.forex(jsonContent.name),ib.order.market(jsonContent.signal,10000));
  // ib.placeOrder(36,ib.contract.forex(jsonContent.name),ib.order.market(jsonContent.signal,10000));
//},5000);

ib.connect();
 //setInterval(function(){var now=new Date();console.log(dateformat(now,"yyyymmdd H:MM:ss"));
var now=new Date();console.log(dateformat(now,"yyyymmdd H:MM:ss"));
 ib.reqRealTimeBars(1, ib.contract.forex('GBP'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(2, ib.contract.forex('EUR'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(3, ib.contract.forex('CAD'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(4, ib.contract.forex('JPY'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(5, ib.contract.forex('AUD'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(6, ib.contract.forex('CHF'), 5, 'MIDPOINT', true);
 ib.reqRealTimeBars(7, ib.contract.forex('NZD'), 5, 'MIDPOINT', true);

//},5000);

//});
