const mongoose = require('mongoose');
const { Schema } = mongoose
const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    storeType: {
        type: String,
        enum: ['Sushi', 'Cafe', 'Bakery', 'Groceries', 'Sweets', 'Supermarket', 'Restaurant', 'Other'],
        required: true,
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    storeLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        }
    },
    description: {
        type: String,
        default: '',
    },
    internalReference: { type: String },
    storeLogo: {
        name: String,
        data: Schema.Types.Buffer,
        mimeType: String,
        size: Number,
    },
    favoritedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

})

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;