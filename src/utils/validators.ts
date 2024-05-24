import joi from "joi";

export const validateSignup = joi.object({
  password: joi.string().length(6),
  email: joi.string().email(),
});
