const mongoose = require('mongoose');
const { Schema } = mongoose;

const reaction = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        require: true,
        maxLength: 280,
    },
    username: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    },
});

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
    reactions: [reaction],
});

thought.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = mongoose.model('Thought', thought);