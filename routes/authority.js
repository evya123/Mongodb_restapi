const express = require('express');
const router = express.Router();

// Authority Model
const Authority = require('../models/Authority');

// VALIDATION Import
const { authorityValidation } = require('../validation');

// @routes POST api/authorities
// @desc Add Authority
router.route('/addAuthority').post(async (req, res) => {

	// Validate User
	const { error } = authorityValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// Check if Authority already in database
	const authorityExist = await Authority.findOne({ Authority: req.body.Authority });
	if(authorityExist) return res.status(400).send('Authority already exists');

	// Validated And Create User
	const authority = new Authority({ 
		Authority: req.body.Authority,
		Contact: req.body.Contact,
		Population: req.body.Population,
		Area: req.body.Area,
		MedianAge: req.body.MedianAge
	});

	try{
		const savedAuthority = await authority.save();
		res.json({ authority: savedAuthority.Authority, Contact: savedAuthority.Contact });
	} catch (err) {
		res.json({ message: err });
	}
});

// @routes GET api/authorities
// @desc Get Authority by name
router.route('/:name').get( async (req, res) => {

	try {
		await Authority.findOne({ Authority: req.params.name }, (err, data) => {
			console.log("Getting Autority!")
			if (err) {
				console.log("Error: "+err)
				return next("Error: "+err);
			} else {
				console.log("Value returned: "+data)
				if (data)
					res.json(data);
				else 
					res.status(400).send("Could not find document!")
			}
		});

	} catch (err) {
		res.status(400).send("Could not complete the request due to internal error!\n"+err);
	}
})

// Get all authorities
router.route('/all').get( async (_, res) => {

	try {
		await Authority.find({}, (err, data) => {
			console.log("Getting Autorities!")
			if (err) {
				console.log("Error: "+err)
				return next("Error: "+err);
			} else {
				console.log("Value returned: "+data)
				if (data)
					res.json(data);
				else 
					res.status(400).send("Could not find document!")
			}
		});

	} catch (err) {
		res.status(400).send("Could not complete the request due to internal error!\n"+err);
	}
})

// Delete authority 
router.delete('/:name', async(req, res) => {
	try {
		const removedAuthority = await User.deleteOne({ Authority: req.params.name });
		res.json(removedAuthority);
	} catch(err) {
		res.json({ message: err });
	}
});

// @routes PATCH api/authorities
// @desc Upate Authority
router.route('/:name').patch( async(req, res) => {

	console.log("Updating " + req.params.name + " fields")
	await Authority.findOneAndUpdate({
		Authority: req.params.name
	},
	{
		$set: { 
			Contact: req.body.Contact, 
			Population: req.body.Population, 
			Area: req.body.Area,
			MedianAge: req.body.MedianAge
		}
	},
	{ new: true },
	(err, data) => {
		if (!err){
			res.json(data);
		}else{
			res.json(err);
		}
	})
});
module.exports = router;