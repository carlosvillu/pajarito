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

  async execute({body}) {
    const bodyTrino = this.#bodyValueObjectFactory({body})
    const currentUserEntity = this.#currentUserService.execute()

    const trino = this.#repository.create({
      body: bodyTrino,
      user: currentUserEntity
    })

    return trino.toJSON()
  }
}
