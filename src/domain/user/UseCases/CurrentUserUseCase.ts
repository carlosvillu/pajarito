import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
class CurrentUserUseCase extends UseCase {
  #service

  constructor({ service }) {
    super()

    this.#service = service
  }

  @asyncInlineError()
  async execute() {
    const user = await this.#service.execute()

    return user.toJSON()
  }
}

export { CurrentUserUseCase }
