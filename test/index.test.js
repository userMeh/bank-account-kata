require('../index');
const { runOperation } = require('../src/operation');
const { accountSchema, getAccountStatement } = require('../src/account');
jest.mock('../src/account', () => {
    return {
        getAccountStatement: jest.fn(),
        accountSchema: {
            validate: jest.fn(() => ({ value: {}, error: null }))
        }
    }
});

jest.mock('../src/operation', () => {
    return {
        runOperation: jest.fn()
    }
});



describe('runApp', () => {
    it("should return account statement", () => {
        expect(accountSchema.validate).toHaveBeenCalled();
        expect(runOperation).toHaveBeenCalled();
        expect(getAccountStatement).toHaveBeenCalled();
    });
});
