const { model, Schema } = require('mongoose');

const operationSchema = new Schema({
    description: String,
    createdAt: String,
    pricePerAction: Number,
    numberOfActions: Number,
    companySymbol: String,
    username: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    });

module.exports = model('Operation', operationSchema);