import Joi from 'joi'
import { DEPOSIT, WITHDRAWAL } from '../utils/constants.js'

export default Joi.object({
  account: Joi.number().integer().positive().required(),
  type: Joi.string().valid(WITHDRAWAL, DEPOSIT).required(),
  status: Joi.string().valid('done', 'in progress', 'rejected').default('in progress'),
  amount: Joi.number().required().positive(),
  createdAt: Joi.date().default(new Date().toLocaleString()),
  updatedAt: Joi.date().default(null)
})
