import {invalidateCache} from '@s-ui/decorators'
import {UseCase} from '../../common/UseCase'

export class LogoutUserUseCase extends UseCase {
  #repository

  constructor({repository}) {
    super()

    this.#repository = repository
  }

  @invalidateCache({cacheKeyString: 'CurrentUserUseCase'})
  async execute() {
    const logoutUserStatus = await this.#repository.logout()

    return logoutUserStatus.toJSON()
  }
}
