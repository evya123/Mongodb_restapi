const Joi = require('joi');
const { model } = require('mongoose');

const authorityValidation = data => {
	const AuthoritySchema = Joi.object({
		Authority: Joi.string().min(3).required(),
		Contact: Joi.string().min(6).required(),
		Population: Joi.number().required(),
		Area: Joi.number().required(),
		MedianAge: Joi.number().required()
	});

	return AuthoritySchema.validate(data);
};

const needSpecificationsValidation = data => {
	const needSpecificationsSchema = Joi.object({
		AuthorityID: Joi.objectId().required(),
		Field: Joi.array().items(Joi.string()),
		Needs: Joi.array().items(Joi.string()),
		ExpectedResult: Joi.string().min(6).required(),
		Budget: Joi.number().required()
	});

	return needSpecificationsSchema.validate(data);
};

const registerValidation = data => {
	const RegistrationSchema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	return RegistrationSchema.validate(data);
};

const loginValidation = data => {
	const LoginSchema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required()
	});

	return LoginSchema.validate(data);
};

module.exports.authorityValidation = authorityValidation;
module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
model.exports.needSpecificationsValidation = needSpecificationsValidation;