const Joi = require('joi');

// const contactValidation = date => {
// 	const ContactSchema = Joi.object({
// 		First_Name: Joi.string().required(),
// 		Last_Name: Joi.string().required(),
// 		Email: Joi.string().email().required(),
// 	  });
	
// 	  return ContactSchema.validate(date)
// }

const authorityValidation = data => {
	const ContactSchema = Joi.object().keys({
		First_Name: Joi.string().required(),
		Last_Name: Joi.string().required(),
		Email: Joi.string().email().required(),
	});

	const AuthoritySchema = Joi.object({
		Authority: Joi.string().required(),
		Contact: ContactSchema,
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
module.exports.needSpecificationsValidation = needSpecificationsValidation;