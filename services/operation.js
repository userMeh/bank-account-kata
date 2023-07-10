import { getAccountBalance } from '../repositories/account.js'
import { WITHDRAWAL } from '../utils/constants.js'

export const validateOperationAmount = (operation) => {
  if (operation.type === WITHDRAWAL) { return getAccountBalance(operation.accountId) > operation.amount ? 'validated' : 'rejected' }
  if (operation.amount > 10000) { return 'rejected' }
  return 'validated'
}
