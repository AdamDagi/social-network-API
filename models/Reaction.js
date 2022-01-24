const mongoose = require('mongoose');
const { Shema } = mongoose;

const reaction = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
        triemed: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thought',
    }],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }]
});

module.exports = mongoose.model('Reaction', reaction);