import { test } from 'tap'
import { build } from '../helper.js'

test('GET /account/:id/statement', async (t) => {
  const app = await build(t)
  const response = await app.inject({
    method: 'GET',
    url: '/account/1/statement'
  })
  t.equal(response.statusCode, 200)
  t.equal(response.json().length, 3)
  t.equal(response.json()[0].id, 1)
  t.equal(response.json()[0].account, 1)
  t.equal(response.json()[0].type, 'withdrawal')
  t.equal(response.json()[0].status, 'in progress')
  t.equal(response.json()[0].amount, 10)
  t.end()
})
