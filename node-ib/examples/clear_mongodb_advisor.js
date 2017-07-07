
var mongodb=require('mongodb');

var mongo_client=mongodb.MongoClient;

var db_url='mongodb://localhost:27017/forexdb';

mongo_client.connect(db_url,function(err,db){
if(err){
  console.log('unable to connect to mongodb', err);
} else {
  console.log('connection to mongodb established.',db_url);
}



var redis=require('redis');
var client=redis.createClient();
client.del("updown_gbp");
client.del("updown_cad");
client.del("updown_eur");
client.del("updown_jpy");
client.del("updown_aud");
client.del("updown_chf");
client.del("updown_nzd");
client.quit();

var collection=db.collection('reqHistoryDataAdvisor');
collection.drop('reqHistoryDataAdvisor');
collection.insert({forex:{reqid:3, name:'CAD'}});
collection.update({forex:{reqid:3, name:'CAD'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

collection.insert({forex:{reqid:2, name:'EUR'}});
collection.update({forex:{reqid:2, name:'EUR'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

collection.insert({forex:{reqid:1, name:'GBP'}});
collection.update({forex:{reqid:1, name:'GBP'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});



collection.insert({forex:{reqid:4, name:'JPY'}});

collection.update({forex:{reqid:4,name:'JPY'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

collection.insert({forex:{reqid:5, name:'AUD'}});

collection.update({forex:{reqid:5,name:'AUD'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

collection.insert({forex:{reqid:6, name:'CHF'}});

collection.update({forex:{reqid:6,name:'CHF'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});


collection.insert({forex:{reqid:7, name:'NZD'}});

collection.update({forex:{reqid:7,name:'NZD'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});

db.close();
});

