const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: ['javascript', 'python', 'cpp', 'java']
    },
    status: {
        type: String,
        enum: ['pending', 'passed', 'failed'],
        default: 'pending'
    },
    executionTime: {
        type: Number,
        default: null
    },
    output: {
        type: String,
        default: null
    },
    error: {
        type: String,
        default: null
    },
    testResults: [{
        input: String,
        expectedOutput: String,
        actualOutput: String,
        passed: Boolean
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes
SubmissionSchema.index({ matchId: 1 });
SubmissionSchema.index({ userId: 1 });
SubmissionSchema.index({ matchId: 1, userId: 1 });

module.exports = mongoose.model('Submission', SubmissionSchema);
