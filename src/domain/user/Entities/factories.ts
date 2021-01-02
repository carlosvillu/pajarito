import { UserEntity } from './UserEntity'

export class UserEntitiesFactory {
  static userEntity({ id, username }) {
    UserEntity.validate({ id, username })

    return new UserEntity(id, username)
  }
}
