var res;
var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

   client.hget("keep_stops","GBP",function(error,reply){
      console.log('GBP IS:' + reply);
   });


client.hset("keep_stops","GBP",3435);
client.hset("keep_stops","CAD",1.54);
if ( res=client.hget("keep_stops","GBP")){
   console.log('GBP IS:' + res);
}

client.quit();
