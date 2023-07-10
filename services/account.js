import { getAccountBalance, updateAccountBalance } from '../repositories/account.js'
import { WITHDRAWAL } from '../utils/constants.js'

export const calculateAndUpdateAccountBalance = async (operation) => {
  if (operation.type === WITHDRAWAL) {
    updateAccountBalance(getAccountBalance() - operation.amount)
    return
  }
  updateAccountBalance(getAccountBalance() + operation.amount)
}
