import {UserEntitiesFactory} from '../Entities/factories'

import {LocalStorageUserRepository} from './LocalStorageUserRepository'

export class UserRepositoriesFactory {
  static localStorageUserRepository() {
    return new LocalStorageUserRepository({
      userEntityFactory: UserEntitiesFactory.userEntity,
      localStorage: window.localStorage
    })
  }
}
