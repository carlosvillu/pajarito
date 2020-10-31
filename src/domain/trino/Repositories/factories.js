import {TrinoValueObjectsFactory} from '../ValueObjects/factories'
import {TrinoEntitiesFactory} from '../Entities/factories'

import {LocalStorageTrinoRepository} from './LocalStorageTrinoRepository'

export class TrinoRepositoriesFactory {
  static localStorageTrinoRepository() {
    return new LocalStorageTrinoRepository({
      trinosListValueFactory: TrinoValueObjectsFactory.trinosListValueObject,
      trinoEntityFactory: TrinoEntitiesFactory.trinoEntity,
      localStorage: window.localStorage
    })
  }
}
