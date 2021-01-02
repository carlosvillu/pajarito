import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
export class RegisterUserUseCase extends UseCase {
  constructor(
    private repository: any, // TODO: add type, but a new one?
    private usernameValueObjectFactory: any, // TODO: add type, but a new one?
    private passwordValueObjectFactory: any // TODO: add type, but a new one?
  ) {
    super()
  }

  @asyncInlineError()
  async execute({ username, password }) {
    const user = await this.repository.register({
      username: this.usernameValueObjectFactory({ username }),
      password: this.passwordValueObjectFactory({ password }),
    })

    return user.toJSON()
  }
}
