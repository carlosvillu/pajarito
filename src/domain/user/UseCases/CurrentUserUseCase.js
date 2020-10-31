import {cache} from '@s-ui/decorators'
import {UseCase} from '../../common/UseCase'

export class CurrentUserUseCase extends UseCase {
  #service

  constructor({service}) {
    super()

    this.#service = service
  }

  @cache({cacheKeyString: 'CurrentUserUseCase'})
  async execute() {
    const user = await this.#service.execute()

    return user.toJSON()
  }
}
