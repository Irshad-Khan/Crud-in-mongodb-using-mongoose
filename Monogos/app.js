const mongoose = require('mongoose');
const User = require('./models/User');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose
    .connection
    .once('open', () => console.log('CONNECTED'))
    .on('error', (err) => {
        console.log('could not connect', err);
    });
    
const newUser = new User({
    firstName: 'Irshad',
    firstName: 'Irshad',
    isActive: 1,
});

newUser.save(function (err, dataSaved) {
    if (err) {
        return err;
    }

    console.log(dataSaved);
});
