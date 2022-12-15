const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { request, response } = require('express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/mongoose');
mongoose.connection
    .once('open', () => console.log('CONNECTED'))
    .on('error', (err) => {
        console.log('could not connect', err);
    });

app.get('/', (request,response) => {
    response.send('Root');    
});

app.post('/users', (request, response) => {
    const newUser = new User({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        isActive: request.body.isActive,
    });
    newUser.save().then(data => {
        response.send({
            status: true,
            message: 'User Saved',
            data: {
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                isActive: data.isActive,
            }
        },200);
    }).catch(err => {
        response.send({
            status: false,
            message: 'User Not Saved',
            errors: err
        },422);
    }); 
});

app.get('/users', (request, response) => {
    User.find({}).then(users => {
        response.send(
            {
                status: true,
                message: 'User Saved',
                data: users
            }, 200);
    }).catch(err => {
        response.send({
            status: false,
            message: 'Something wen wrong',
            errors: err
        },500);
     });
});

app.put('/users/:id', (request, response) => {
    const id = request.params.id;
    User.findByIdAndUpdate(id, {
        $set: {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            isActive: request.body.isActive,
        }
    },{new: true}).then((result) => {
        response.send(
            {
                status: true,
                message: 'User Update',
                data: result
            }, 200);
    }).catch((err) => {
        response.send({
            status: false,
            message: 'Something wen wrong',
            errors: err
        },500);
    });;
});

app.get('/user/:id', (request, response) => {

    User.findById(request.params.id).then(user => {
        response.send(
            {
                status: true,
                message: 'User Data',
                data: user
            }, 200);
    }).catch(err => {
        response.send({
            status: false,
            message: 'Something wen wrong',
            errors: err
        },500);
     });
});

/**
 * One Method
 */
// app.delete('/users/:id', (request, response) => {
//     User.findOne({_id: request.params.id}).then((user) => {
//         user.remove().then((result) => {
//             response.send(
//             {
//                 status: true,
//                 message: 'User Deleted',
//                 data: result
//             }, 200);
//         }).catch((err) => {
//                 response.send({
//                 status: false,
//                 message: 'Something wen wrong',
//                 errors: err
//             },500);
//         });
//     }).catch((err) => {
//         response.send({
//             status: false,
//             message: 'Something wen wrong',
//             errors: err
//         },500);
//     });
// });

app.delete('/users/:id', (request, response) => {
    User.findByIdAndRemove(request.params.id).then((user) => {
        response.send(
        {
            status: true,
            message: 'User Deleted',
            data: user
        }, 200);
    }).catch((err) => {
        response.send({
            status: false,
            message: 'Something wen wrong',
            errors: err
        },500);
    });
});

const port = 4444 || process.env.PORT;
app.listen(port, () => {
    console.log(`Listing at ${port}`);
});