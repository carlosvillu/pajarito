import {streamify, inlineError} from '@s-ui/decorators'

import {UseCase} from '../../common/UseCase'

@streamify('execute')
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

  @inlineError
  async execute({username, password}) {
    const user = await this.#repository.login({
      username: this.#usernameValueObjectFactory({username}),
      password: this.#passwordValueObjectFactory({password})
    })


    if(!user) {
      throw new Error('Error Login')
    }

    return user.toJSON()
  }
}
