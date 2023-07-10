// import { operations } from '../utils/data.js'

import { DEPOSIT, WITHDRAWAL } from '../utils/constants.js'

export const account = {
  id: 1,
  user: 1,
  balance: 100
}

export const operations = [
  {
    id: 1,
    account: 1,
    type: WITHDRAWAL,
    status: 'in progress',
    amount: 10,
    createdAt: new Date().toLocaleString()
  },
  {
    id: 2,
    account: 1,
    type: WITHDRAWAL,
    status: 'done',
    amount: 20,
    createdAt: new Date().toLocaleString()
  },
  {
    id: 3,
    account: 1,
    type: DEPOSIT,
    status: 'done',
    amount: 100,
    createdAt: new Date().toLocaleString()
  }

]

export const findAllAccountOperations = async (accountId) => {
  return Promise.resolve(operations.filter((operation) => operation.account === +accountId)).then((result) => (result))
}

export const findOperation = async (operationId) => {
  return {}
}

export const updateOperationStatus = async (operationId) => {
  return {}
}

export const createOperation = async (operationBody) => {
  return { id: 1, status: 'in progress', ...operationBody }
}
