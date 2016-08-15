const { MongoClient } = require('mongodb');
const dbConnection = 'mongodb://localhost:27017/auth_practice';


function saveFeedBack(req,res,next) {
  console.log('Check Data:', req.body);

  let feedbackItem = req.body;


  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('feedbacks').insertOne(feedbackItem, function(err, result) {
      if(err) throw err;
      console.log('Result : ',result);
      console.log('Inserted successfully');
      next();
    })
  })
}

function getFeedBacks(req,res,next){

  MongoClient.connect(dbConnection, function(err, db) {
    var cursor =db.collection('feedbacks').find({});
    var all_results = [];
    cursor.each(function(err, doc) {
      if(err){
        console.log(err);
        req['results']={'error':'Something went wrong !!!'};
        return next();
      }
      if (doc != null) {
        console.log(doc);
         all_results.push(doc);
         console.log(doc);
      } else {
         req['results'] = all_results;
         next();
      }
    });


  });
}



module.exports = { saveFeedBack,getFeedBacks }




