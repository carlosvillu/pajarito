import {UserEntitiesFactory} from '../Entities/factories'
import {UserValueObjectsFactory} from '../ValueObjects/factories'

import {LocalStorageUserRepository} from './LocalStorageUserRepository'
import {InMemoryUserRepository} from './InMemoryUserRepository'

export class UserRepositoriesFactory {
  static inMemoryUserRepository() {
    return new InMemoryUserRepository()
  }

  static localStorageUserRepository() {
    return new LocalStorageUserRepository({
      userEntityFactory: UserEntitiesFactory.userEntity,
      statusValueObjectFactory: UserValueObjectsFactory.statusValueObject,
      localStorage: window.localStorage
    })
  }
}
