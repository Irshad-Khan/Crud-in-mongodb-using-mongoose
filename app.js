const {MongoClient, ObjectId} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
  if (err) throw err

  const db = client.db('animals')

    /**
     * Store Data in Mongo DB
     */
    // db.collection('mammals').insertOne({
    //     name: "DOG"
    // }, (err, result) => {
    //     if (err) {
    //         return err;
    //     }

    //     console.log("INSERTED");
    // });

    /**
     * Fetch Data from Mongo DB
     */
    // db.collection('mammals').find().toArray(function (err, result) {
    //     if (err) {
    //         return err;
    //     }

    //     console.log(result);
    // });

    /**
     * Updating dsts in Monogo DB
     */
    // db.collection('mammals').findOneAndUpdate({
    //     _id: new ObjectId('6396460795f73b2910636430')
    // }, {
    //     $set: {
    //         name: "Irshad Khan"
    //     }
    // }).then(result => {
    //     console.log(result);
    // }).catch(err => {
    //     console.log(err);
    // });

    /**
     * Delete Item
     */
    db.collection('mammals').findOneAndDelete({
        _id: new ObjectId('639b1d16e468d3ffbdb155b6')
    }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });
})





// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/animals');
// mongoose
//     .connection
//     .once('open', () => console.log('CONNECTED'))
//     .on('error', (err) => {
//         console.log('could not connect', err);
//     });
