import { Service } from '../../common/Service'

export class CurrentUserService extends Service {
  constructor(
    private repository: any // TODO: add type, but a new one?
  ) {
    super()
  }

  async execute() {
    const user = await this.repository.current()

    return user
  }
}
