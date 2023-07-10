import { createOperation, updateOperationStatus } from '../../repositories/operations.js'
import { validateOperationAmount } from '../../services/operation.js'
import operationSchema from '../../schemas/operation.schema.js'
import { calculateAndUpdateAccountBalance } from '../../services/account.js'

export default async (fastify, opts) => {
  fastify.post('/',
    {
      preHandler: async (request, reply) => {
        try {
          const schemaValidator = operationSchema.validate(request.body)
          const operationValidator = validateOperationAmount(request.body)
          if (schemaValidator.error) {
            request.log.error(schemaValidator.error)
            reply.code(422).send('invalid data')
          }
          if (operationValidator === 'rejected') {
            reply.code(400).send('invalid operation')
          }
        } catch (error) {
          request.log.error(error)
        }
      }
    },
    async (request, reply) => {
      try {
        const operation = await createOperation(request.body)
        await calculateAndUpdateAccountBalance(operation)
        await updateOperationStatus(operation.id)
        reply.code(201).send(operation)
      } catch (error) {
        request.log.error(error)
      }
    })
}
