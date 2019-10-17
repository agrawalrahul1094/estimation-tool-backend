import * as mongoose from 'mongoose'

const contentDataSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createRequestID: String,
    content: Object,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Content', contentDataSchema);
