const Joi = require("joi");

/**
    * @description Joi schema for account this will be used to validate account
    * @param {number} id - account id
    * @param {number} balance - account balance
    * @param {array} operations - account operations
    * @returns {object} - Joi schema for account;
    * 
    *  
*/
const accountSchema = Joi.object({      
    id: Joi.number().integer().positive().required(),
    balance: Joi.number().integer().positive().default(0),
    operations: Joi.array().default([]),    
});

/**
    * @description get account balance
    * @param {object} account - account object
    * @returns {number} - account balance
    * 
*/
const getAccountBalance = (account) => {
    return account.balance;
};

/**
    * @description get account statement at a given time
    * @param {object} account - account object
    * @returns {object} - account statement
    * 
*/
const getAccountStatement = (account) => {
    return account;
};

module.exports = {
    getAccountBalance,
    getAccountStatement,
    accountSchema,
}
      