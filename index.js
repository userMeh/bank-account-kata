const { getAccountStatement, accountSchema } = require("./src/account");
const { DEPOSIT, WITHDRAWAL } = require("./src/constants");
const { runOperation } = require("./src/operation");

// This mocks are to test our code, we will not use them in the final version
// Our final version will use a database to store data or a third party API

const account = {id: 1, balance: 1, operations: []};
const operations = [{accountId: 1, type: DEPOSIT, amount: 1000 }, { accountId: 1, type: WITHDRAWAL, amount: 40 }];

function runApp(account, operations) {
    try {
        const {value, error} = accountSchema.validate(account);
        if(error) {
            throw new Error(error);
        }
        for (const operation of operations) {
            runOperation(value, operation);
            console.log(`account after ${operation.type}`, value);

        }
        const accountStatement = getAccountStatement(value);
        console.log("account statement", accountStatement);
    } catch (error) {
        console.log(error);
    }
}


runApp(account, operations);
