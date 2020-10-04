import {UseCase} from '../../common/UseCase'

export class LoginUserUseCase extends UseCase {
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
    const user = await this.#repository.login({
      username: this.#usernameValueObjectFactory({username}),
      password: this.#passwordValueObjectFactory({password})
    })

    return user.toJSON()
  }
}
