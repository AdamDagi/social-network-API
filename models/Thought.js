const mongoose = require('mongoose');
const { Shema } = mongoose;

const thought = new Schema({
    thoughtText: {
        type: String,
        require: true,
        triemed: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    },
    username: {
        type: String,
        require: true,
    },
    // reactions: [{ 
    //     ref: 'Reaction',
    // }]
});

module.exports = mongoose.model('Thought', thought);