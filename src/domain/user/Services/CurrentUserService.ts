import { Service } from '../../common/Service'

export class CurrentUserService extends Service {
  #repository

  constructor({ repository }) {
    super()

    this.#repository = repository
  }

  async execute() {
    const user = await this.#repository.current()

    return user
  }
}
