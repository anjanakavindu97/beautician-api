var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CustomerModelSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User field is required']
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('customer', CustomerModelSchema);
module.exports = {Customer};