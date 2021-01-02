import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
export class LogoutUserUseCase extends UseCase {
  constructor(
    private repository: any // TODO: add type, but a new one?
  ) {
    super()
  }

  @asyncInlineError()
  async execute() {
    const logoutUserStatus = await this.repository.logout()

    return logoutUserStatus.toJSON()
  }
}
