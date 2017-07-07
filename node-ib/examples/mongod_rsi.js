var mongodb=require('mongodb');

var mongo_client=mongodb.MongoClient;

var db_url='mongodb://localhost:27017/forexdb';

mongo_client.connect(db_url,function(err,db){
if(err){
  console.log('unable to connect to mongodb', err);
} else {
  console.log('connection to mongodb established.',db_url);
}

var collection=db.collection('forex');

collection.find({}).toArray(function(err,result){
  if(err){
     console.log(err);
  }else if (result.length){
     console.log('Found Following documents:',result);
  }else {
     console.log('No Document(s) were found!');
  }
});


db.close();
});
