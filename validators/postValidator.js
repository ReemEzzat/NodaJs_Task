const Joi = require("joi");

const createPostSchema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(10).required(),
    category: Joi.string().valid("Tech", "Life", "Health", "Education"),
});

const updatePostSchema = Joi.object({
    title: Joi.string().min(5),
    content: Joi.string().min(10),
    category: Joi.string().valid("Tech", "Life", "Health", "Education"),
});

module.exports = { createPostSchema, updatePostSchema };
