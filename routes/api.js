var express = require('express');
var router = express.Router();
var Venue = require('../models/Venue');
var accountSid = 'AC172b28c8a6c3d83ae165f83d3f6add23';
var authToken = '3e5a19cd4e66dc41c133539dbc645422';

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

function createError(message){
	var response = {
		confirmation: 'fail',
		message: message
	}
	return response
}

function createResult(result){
	var response = {
		confirmation: 'success',
		result: result
	}
	return response
}

router.post('/sms', function(req, res, next){
	var twiml = new twilio.TwimlResponse();
	console.log(JSON.stringify(req.body));
    twiml.message="Hey it's Jake!" ;
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    return
})

router.post('/:resource', function(req, res, next){
	var resource = req.params.resource
	if(resource=='venue'){
		Venue.create(req.body, function(err, result){
			if (err){
				res.json(createError(err.message))
				return
			}
			if(!result){
				res.json(createError('Error'))
				return
			}
			client.messages.create({
			    body: JSON.stringify(result),
			    to: '+12017887261',  // Text this number
			    from: '+12012920361' // From a valid Twilio number
			}, function(err, message) {
			    console.log(message.sid);
			});
			res.json(createResult(result))
			return
		})
		return
	}

	res.json(createError('Invalid resource'))
	return
})

router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource;

	if (resource == 'venue'){
		var name = req.query.venue;
		Venue.findOne(name, function(err, result){
			if (err){
				res.json(createError(err.message))
				return
			}
			if (!result){
				res.json(createError('Error'))
				return
			}
			res.json(createResult(result))
			return
		});
		return
	}

	res.json(createError('Invalid resource'))
	return
	
});

module.exports = router;
