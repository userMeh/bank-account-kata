import Joi from 'joi'

export default Joi.object({
  id: Joi.number().integer().positive().required(),
  user: Joi.number().integer().positive().required(),
  balance: Joi.number().required()
})
