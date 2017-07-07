var mongodb=require('mongodb');

var mongo_client=mongodb.MongoClient;

var db_url='mongodb://localhost:27017/forexdb';

mongo_client.connect(db_url,function(err,db){
if(err){
  console.log('unable to connect to mongodb', err);
} else {
  console.log('connection to mongodb established.',db_url);
}

var collection=db.collection('forex_history');

function forex_setup(){
  var CAD={_id:3,name:'CAD',reqid:3};
  collection.insert(CAD,function(err,result){
  if(err){
    console.log(err);
  }else {
    console.log('Inserted %d documents into the forex collection.the documents inserted with "_id" are:',result.length,result);
  }
});

}

//forex_setup();
//var US={reqid:3,open:['1.333','1.4444','1.2333'],close:['1.2454','1.6563','1.444'],low:['1.1212','1.4443','1.2323'],high:['1.454','1.343','1.3777']};
/*
collection.update({reqid:3},{$push: {close:'1.5555'}},function(err,numUpdated){
   if(err){
      console.log(err);
   }else if(numUpdated){
      console.log('Updated Successfully %d documents.',numUpdated);
   } else {
      console.log('No document found with defined "find" critria!');
   }
});
*/

collection.update({reqid:3},{$pop:{close:1}},function(err,numUpdated){
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
