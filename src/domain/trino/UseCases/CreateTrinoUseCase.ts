import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
class CreateTrinoUseCase extends UseCase {
  #repository
  #bodyValueObjectFactory
  #currentUserService

  constructor({ repository, currentUserService, bodyValueObjectFactory }) {
    super()

    this.#repository = repository
    this.#bodyValueObjectFactory = bodyValueObjectFactory
    this.#currentUserService = currentUserService
  }

  @asyncInlineError()
  async execute({ body: intro }) {
    const body = this.#bodyValueObjectFactory({ body: intro })
    const currentUser = await this.#currentUserService.execute()

    const trino = await this.#repository.create({
      body,
      user: currentUser,
    })

    return trino.toJSON()
  }
}

export { CreateTrinoUseCase }
