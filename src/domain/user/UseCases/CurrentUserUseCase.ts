import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
export class CurrentUserUseCase extends UseCase {
  constructor(
    private service: any // TODO: add type, but a new one?
  ) {
    super()
  }

  @asyncInlineError()
  async execute() {
    const user = await this.service.execute()

    return user.toJSON()
  }
}
