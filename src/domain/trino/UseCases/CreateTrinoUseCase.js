import {inlineError} from '@s-ui/decorators'
import {UseCase} from '../../common/UseCase'

export class CreateTrinoUseCase extends UseCase {
  #repository
  #bodyValueObjectFactory
  #currentUserService

  constructor({repository, currentUserService, bodyValueObjectFactory}) {
    super()

    this.#repository = repository
    this.#bodyValueObjectFactory = bodyValueObjectFactory
    this.#currentUserService = currentUserService
  }

  @inlineError
  async execute({body}) {
    const bodyTrino = this.#bodyValueObjectFactory({body})
    const currentUserEntity = this.#currentUserService.execute()

    const trino = this.#repository.create({
      body: bodyTrino,
      user: currentUserEntity
    })

    if (!trino) {
      throw new Error('[CreateTrinoUseCase#execute] Error creating trino')
    }

    return trino.toJSON()
  }
}
