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

module.exports = mongoose.model('Reaction', reaction);