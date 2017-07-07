var redis=require('redis');
var client=redis.createClient();

client.on('connect',function(){
  console.log('connected');
});

client.set('account-c','1000',function(err,reply){
  console.log(reply);
});

client.lpush(["forex1","'name':'USD','close':'1.3005','open':'1.3542','high':'1.3444','low':'1.2344'"],function(err,reply){
  console.log(reply);
});


client.lpush(["forex1","'name':'EUR','close':'1.3005','open':'1.3542','high':'1.3444','low':'1.2344'"],function(err,reply){
  console.log(reply);
});


client.lpush(["forex1","'name':'AUD','close':'1.3005','open':'1.3542','high':'1.3444','low':'1.2344'"],function(err,reply){
  console.log(reply);
});
