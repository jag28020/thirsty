var mongoose = require ('mongoose');

var VenueSchema = new mongoose.Schema({
    name: {type: String, lowercase: true, trim: true, default:''},
    hours: {type: String, trim: true, default: ''},
    timestamp: {type: Date, default: Date.now}
});


module.exports = mongoose.model('VenueSchema',VenueSchema);