const mongoose = require('mongoose');
const { Schema } = mongoose;

const thought = new Schema({
    thoughtText: {
        type: String,
        required: true,
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
        required: true,
    },
    reactions: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Reaction',
    }],
});

module.exports = mongoose.model('Thought', thought);