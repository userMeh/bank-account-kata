import { DEPOSIT, WITHDRAWAL } from './constants.js'

export const account = {
  id: 1,
  user: 1,
  balance: 100
}

export const operations = [
  {
    id: 1,
    account: 10,
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
