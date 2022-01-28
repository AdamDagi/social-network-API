const mongoose = require('mongoose');
const { User } = require('.');
const { Schema } = mongoose;

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// TODO friendcount;

const user = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        triemed: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Thought',
    }],
    friends: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }],
});

user.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = mongoose.model('User', user);