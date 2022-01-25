const mongoose = require('mongoose');
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
    }],
});

module.exports = mongoose.model('User', user);