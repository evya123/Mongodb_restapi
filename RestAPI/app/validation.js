const Joi = require('joi');

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

const solutionProviderValidation = data => {

	const SolutionProviderSchema = Joi.object({
		Provider: Joi.string().required(),
		Field: Joi.string().required(),
		Solution: Joi.string().required(),
		NeedTarget: Joi.string().required(),
		Cost: Joi.number().required(),
		TechnicalDescription: Joi.string().required(),
		ImplementationDescription: Joi.string().required()
	});

	return SolutionProviderSchema.validate(data);
};

module.exports.authorityValidation = authorityValidation;
module.exports.solutionProviderValidation = solutionProviderValidation