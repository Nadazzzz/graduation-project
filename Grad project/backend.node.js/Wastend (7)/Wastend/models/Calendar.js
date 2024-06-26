const mongoose = require('mongoose');

const calendarEntrySchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  firstDay: {
    type: Date,
  },
  lastDay: {
    type: Date,
  },
  daysOfWeek: { 
    type: [String],
 },
  pickUpTimes: {
     type: [String],
 },
  dailyLimit: { 
    type: Number,
 }
});

const CalendarEntry = mongoose.model('CalendarEntry', calendarEntrySchema);

module.exports = CalendarEntry;