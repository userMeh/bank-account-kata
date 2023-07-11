const Joi = require("joi");
const { getAccountBalance } = require("./account");
const { WITHDRAWAL, DEPOSIT } = require("./constants");

/**
    * @description Joi schema for operation this will be used to validate operation
    * @param {number} account - account id
    * @param {string} type - operation type
    * @param {string} status - operation status
    * @param {number} amount - operation amount
    * @param {date} createdAt - operation date
    * @returns {object} - Joi schema for operation;
    * 
*/
const operationSchema =  Joi.object({
    accountId: Joi.number().integer().positive().required(),
    type: Joi.string().valid(WITHDRAWAL, DEPOSIT).required(),
    status: Joi.string().valid('done', 'in progress', 'rejected').default('in progress'),
    amount: Joi.number().required().positive(),
    createdAt: Joi.date().default(new Date().toLocaleString()),
});

 /**
    * @description validate operation
    * @param {object} operation - operation object
    * @returns {boolean} - true if operation is valid
    * 
*/
const validateOperation = (operation, account) => {
    const { error } = operationSchema.validate(operation);
    if(error) {
        throw new Error(error);
    }
    if (operation.type === WITHDRAWAL && operation.amount  > getAccountBalance(account) ) {
        throw new Error("Insufficient funds");
    }
};

/**
    * @description run operation on account, this can be either a deposit or a withdrawal
    * if operation is a deposit, the amount will be added to the account balance
    * if operation is a withdrawal, the amount will be subtracted from the account balance
    * if we ever have a new operation type, we will need to split this function into multiple functions
    * @see https://en.wikipedia.org/wiki/Single_responsibility_principle
    * @param {object} account - account object
    * @param {object} operation - operation object
    * @returns {object} - account object
    * 
*/
const runOperation = (account, operation) => {
    try {
        validateOperation(operation, account);
        if(operation.type === DEPOSIT) {
            account.balance = operation.amount + account.balance;
        } else if(operation.type === WITHDRAWAL) {
            account.balance = account.balance - operation.amount;
        }
        account.operations.push({ ...operation, createdAt: new Date().toLocaleString()});
        return account;
    } catch (error) {
        throw new Error(error);
    }
 };

module.exports = {
    operationSchema,
    validateOperation,
    runOperation
}