const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    isDietChart: { type: Boolean, default: false }, // To identify if a message contains a diet plan
    dietPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' } // Link to the diet plan if it is one
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;