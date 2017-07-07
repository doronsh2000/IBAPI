var mongodb=require('mongodb');

var mongo_client=mongodb.MongoClient;

var db_url='mongodb://localhost:27017/forexdb';

mongo_client.connect(db_url,function(err,db){
if(err){
  console.log('unable to connect to mongodb', err);
} else {
  console.log('connection to mongodb established.',db_url);
}

var collection=db.collection('realTimeBars');
collection.drop('realTimeBars');
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

var collection=db.collection('reqHistoryData');
collection.drop('reqHistoryData');
collection.insert({forex:{reqid:3, name:'CAD'}});

collection.update({forex:{reqid:3,name:'CAD'}},{$set: { close:[] ,open:[],low:[],high:[],volume:[]}},function(err,numUpdated){
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


db.close();
});
