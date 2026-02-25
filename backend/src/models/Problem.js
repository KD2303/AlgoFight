const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
    input: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    expected: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { _id: false });

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    example: {
        type: String
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'easy'
    },
    testCases: {
        type: [TestCaseSchema],
        required: true,
        validate: {
            validator: (v) => v.length > 0,
            message: 'At least one test case is required'
        }
    },
    starterCode: {
        type: String
    },
    timeLimit: {
        type: Number,
        default: 3000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Problem', ProblemSchema);
