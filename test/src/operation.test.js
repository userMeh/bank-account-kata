const { validateOperation, runOperation, operationSchema } = require("../../src/operation.js");
const { DEPOSIT, WITHDRAWAL } = require("../../src/constants");

describe("operation", () => {
    const account = {id: 1, balance: 1, operations: []};
    const operation = { type: DEPOSIT, amount: 1000, accountId: 1 };

    describe("validateOperation", () => {
       
        it("should throw an error if operation is invalid", () => {
            expect(() => validateOperation({ ...operation, type: "invalid" }, account)).toThrow();
        });

        it("should throw an error if operation is a withdrawal and amount is greater than account balance", () => {
            expect(() => validateOperation({...operation, type: WITHDRAWAL }, account)).toThrow();
        });

        it("should not throw if operation is valid", () => {
            expect(() => validateOperation(operation, account)).not.toThrow();
        });

    });

    describe("runOperation", () => {

        it("should add amount to account balance if operation is a deposit", () => {
            const result = runOperation(account, operation);
            expect(result.balance).toBe(1001);
        });

        it("should subtract amount from account balance if operation is a withdrawal", () => {
            const result = runOperation({...account, balance: 1001}, { ...operation, type: WITHDRAWAL });
            expect(result.balance).toBe(1);
        });

        it("should add operation to account operations", () => {
            const newOperation = { type: WITHDRAWAL, amount: 1000, accountId: 1 };
            const newAccount = {id: 1, balance: 1001, operations: []};

            const result = runOperation(newAccount, newOperation);
            expect(result.operations.length).toBe(1);
        });
    });
    describe("operationSchema", () => {

        it("should throw an error if operation is invalid", () => {
            const operation = { type: "invalid", amount: 1000 };
            const { error } = operationSchema.validate(operation);
            expect(error).toBeTruthy();
        });

        it("should throw an error if operation is a withdrawal and amount is greater than account balance", () => {
            const operation = { type: WITHDRAWAL, amount: 1000 };
            const { error } = operationSchema.validate(operation);
            expect(error).toBeTruthy();
        });
        
        it("should return true if operation is valid", () => {
            const operation = { type: DEPOSIT, amount: 1000, accountId: 1 };
            const { error } = operationSchema.validate(operation);
            expect(error).toBeFalsy();
        });
    });
});
