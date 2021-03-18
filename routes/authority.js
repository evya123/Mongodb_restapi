const express = require('express');
const router = express.Router();

// MongoDB Model
const Authority = require('../models/Authority');


// VALIDATION Import
const { authorityValidation } = require('../validation');

// Add Authority
router.post('/addAuthority', async (req, res) => {

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

router.route('/:name').get( async (req, res) => {

	try {
		const authorityExist = await Authority.findOne({ Authority: req.params.name }, (err, data) => {
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

router.route('/').get( async (_, res) => {

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

// // Login User
// router.post('/login', async(req, res) => {
// 	const { error } = loginValidation(req.body);
// 	if (error) return res.status(400).send(error.details[0].message);

// 	// Check if Email Exists
// 	const user = await User.findOne({ email: req.body.email });
// 	if(!user) return res.status(400).send('Email Does Not Exist');

// 	const validPass = await bcrypt.compare(req.body.password, user.password)
// 	if(!validPass) return res.status(400).send('Invalid Password');

// 	// Create & Assign Token 
// 	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
// 	res.header('auth-token', token).send(token);
// });

// // Delete user 
// router.delete('/:uid/only', async(req, res) => {
// 	try {
// 		const removedUser = await User.deleteOne({ _id: req.params.uid });
// 		res.json(removedUser);
// 	} catch(err) {
// 		res.json({ message: err });
// 	}
// });

// router.delete('/:uid/all', async(req, res) => {
// 	try {
// 		const removedUser = await User.deleteOne({ _id: req.params.uid, get: req.body });
// 		const removedPosts = await Post.deleteMany({ userID: req.params.uid });
// 		res.json(removedUser);
// 		res.json(removedPosts);
// 	} catch(err) {
// 		res.json({ message: err });
// 	}
// });

module.exports = router;