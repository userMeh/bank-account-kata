// format this file
import { test } from 'tap'
import { build } from '../helper.js'

test('POST /operation', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    method: 'POST',
    url: '/operation',
    payload: {
      account: 1,
      type: 'deposit',
      amount: 100
    }
  })
  t.equal(response.statusCode, 201)
  t.equal(response.json().id, 1)
  t.equal(response.json().account, 1)
  t.equal(response.json().type, 'deposit')
  t.equal(response.json().status, 'in progress')
  t.equal(response.json().amount, 100)
  t.end()
})
test('POST /operation with invalid payload', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    method: 'POST',
    url: '/operation',
    payload: {
      type: 'deposit',
      amount: 100
    }
  })
  t.equal(response.statusCode, 422)
  t.equal(response.payload, 'invalid data')

  t.end()
})
test('POST /operation with rejected operation', async (t) => {
  const app = await build(t)

  const response = await app.inject({
    method: 'POST',
    url: '/operation',

    payload: {
      account: 1,
      type: 'withdrawal',
      amount: 1000
    }
  })
  t.equal(response.statusCode, 400)
  t.equal(response.payload, 'invalid operation')
  t.end()
})
