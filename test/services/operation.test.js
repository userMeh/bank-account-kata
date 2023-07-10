import { test } from 'tap'
import { validateOperationAmount } from '../../services/operation.js'
import '../../repositories/account.js'

test('should validate operation', async (t) => {
  t.equal(validateOperationAmount({ type: 'withdrawal', amount: 100, accountId: 1 }), 'validated')
  t.equal(validateOperationAmount({ type: 'deposit', amount: 9000, accountId: 1 }), 'validated')
  t.end()
})

test('should reject operation', async (t) => {
  // t.before(() => {
  //     t.mock('../../repositories/account.js', {'getBalanceAcccount': () => 1000})
  // })
  t.equal(validateOperationAmount({ type: 'withdrawal', amount: 2000, accountId: 1 }), 'rejected')
  t.equal(validateOperationAmount({ type: 'deposit', amount: 10001, accountId: 1 }), 'rejected')
  t.end()
})
