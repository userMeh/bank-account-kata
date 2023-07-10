import { findAllAccountOperations } from '../../repositories/operations.js'

export default async function (fastify, opts) {
  fastify.get('/:id/statement',
    async (request, reply) => {
      reply.send(await findAllAccountOperations(request.params.id))
    })
}
