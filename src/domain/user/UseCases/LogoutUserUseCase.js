import {UseCase} from '../../common/UseCase'

export class LogoutUserUseCase extends UseCase {
  #repository

  constructor({repository}) {
    super()

    this.#repository = repository
  }

  async execute() {
    const logoutUserStatus = await this.#repository.logout()

    return logoutUserStatus.toJSON()
  }
}
