const mongoose = require('mongoose');

/**
 * 2nd Way
 */
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    isActive: {
        type: Number,
        default: 1
    }
});
module.exports = mongoose.model('users', UserSchema);

/**
 * One Way
 */
// const User = mongoose.model('users', {
//     firstName: {
//         type: String,
//         required: true,
//         minlength: 4,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         minlength: 4,
//         trim: true
//     },
//     isActive: {
//         type: Number,
//         default: 1
//     }
// });

// module.exports = User;