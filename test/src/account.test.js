const { getAccountBalance, getAccountStatement, accountSchema } = require("../../src/account");

const account = {id: 1, balance: 1, operations: []};

describe("account", () => {
    it("should validate account", () => {
        const { error } = accountSchema.validate(account);
        expect(error).toBeUndefined();
    });
    it("should return account balance", () => {

        const result = getAccountBalance(account);   
        expect(result).toBe(1);
    });
    it("should return account statement", () => {
        const result = getAccountStatement(account);
        expect(result).toEqual(account);
    });
});

describe("accountSchema", () => {
    it("should throw an error if account is invalid", () => {
        const { error } = accountSchema.validate({ ...account, balance: "invalid" });
        expect(error).toBeTruthy();
    });
    it("should return true if account is valid", () => {
        const { error } = accountSchema.validate({ ...account, balance: 1 });
        expect(error).toBeFalsy();
    });
});
