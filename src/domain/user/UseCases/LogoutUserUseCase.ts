import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
class LogoutUserUseCase extends UseCase {
  #repository

  constructor({ repository }) {
    super()

    this.#repository = repository
  }

  @asyncInlineError()
  async execute() {
    const logoutUserStatus = await this.#repository.logout()

    return logoutUserStatus.toJSON()
  }
}

export { LogoutUserUseCase }
