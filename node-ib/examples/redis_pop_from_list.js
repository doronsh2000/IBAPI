var redis=require('redis');
var client=redis.createClient();

client.on('connect',function(){
  console.log('connected');
});

client.set('account-c','1000',function(err,reply){
  console.log(reply);
});

client.rpop('forex1',function(err,reply){
   console.log(reply);
});
