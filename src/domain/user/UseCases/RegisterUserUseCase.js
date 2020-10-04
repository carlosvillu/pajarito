import {UseCase} from '../../common/UseCase'

export class RegisterUserUseCase extends UseCase {
  #repository
  #usernameValueObjectFactory
  #passwordValueObjectFactory

  constructor({
    repository,
    usernameValueObjectFactory,
    passwordValueObjectFactory
  }) {
    super()
    this.#repository = repository
    this.#usernameValueObjectFactory = usernameValueObjectFactory
    this.#passwordValueObjectFactory = passwordValueObjectFactory
  }

  async execute({username, password}) {
    const user = await this.#repository.register({
      username: this.#usernameValueObjectFactory({username}),
      password: this.#passwordValueObjectFactory({password})
    })

    return user.toJSON()
  }
}
