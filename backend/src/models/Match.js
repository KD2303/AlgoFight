const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        default: null
    },
    status: {
        type: String,
        enum: ['waiting', 'active', 'completed'],
        default: 'waiting'
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    player1Username: {
        type: String
    },
    player2Username: {
        type: String
    },
    winnerUsername: {
        type: String
    },
    isDraw: {
        type: Boolean,
        default: false
    },
    roomId: {
        type: String,
        default: null
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    },
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission'
    }]
}, { timestamps: true });

// Indexes for efficient queries
MatchSchema.index({ status: 1 });
MatchSchema.index({ player1: 1 });
MatchSchema.index({ player2: 1 });
MatchSchema.index({ roomId: 1 });

module.exports = mongoose.model('Match', MatchSchema);
