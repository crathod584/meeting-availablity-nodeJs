const mongoose = require('../../../config/mongoose.service').mongoose;
const Schema = mongoose.Schema;

/**
* @desc Creating a addAvailability Schema
*/
const addAvailabilitySchema = new Schema({
   startTime: {
       type: Date,
       required: true
    },
   endTime: {
    type: Date,
    required: true
   },
   userId: {
       type: Schema.ObjectId,
       required: true
   }
});

const availability = mongoose.model('Availability', addAvailabilitySchema);

module.exports = { Availability: availability };

