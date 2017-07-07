var http=require('http');
var xml2js=require('xml2js');
var parser=xml2js.Parser({explicitArray: false});
var RedisEvent=require('redis-event');
var event=new RedisEvent('localhost',['forex_buy_and_sell']);

var now=new Date();
console.log(now.getMonth());
now.setMonth(now.getMonth()+1);
console.log(now);

var options={
  host:'www.forexfactory.com',
  path: '/ffcal_week_this.xml'
};


var callback=function(response){
    var str='';
    response.on('data',function(chunk){
        str+=chunk;
    });
    response.on('end',function(){
      //  console.log(str);
          parser.parseString(str,function(err,jsonResults){
               console.log(jsonResults.weeklyevents.event[1]);
               jsonResults.weeklyevents.event.forEach(function(element,index,array){
                   if(element.impact=='Medium' ||  element.impact=='High'){
                      console.log(element.country + ' ' + element.date + ' ' +  element.time + ' ' + element.forecast); 
                   }
              });
           });
          });
    
}
http.request(options,callback).end();

event.on('ready',function(){
                            event.pub('forex_buy_and_sell:app',{
                               "name":'CAD',
                               "reqid":3,
                               "signal":"BUY"
                         });
                      });

