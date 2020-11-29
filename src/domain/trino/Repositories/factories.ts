import { TrinoErrorsFactory } from '../Errors/factories'
import { TrinoValueObjectsFactory } from '../ValueObjects/factories'
import { TrinoEntitiesFactory } from '../Entities/factories'

import { LocalStorageTrinoRepository } from './LocalStorageTrinoRepository'

export class TrinoRepositoriesFactory {
  static localStorageTrinoRepository() {
    return new LocalStorageTrinoRepository({
      notFoundListTrinoErrorFactory: TrinoErrorsFactory.notFoundListTrinoError,
      trinosListValueFactory: TrinoValueObjectsFactory.trinosListValueObject,
      trinoEntityFactory: TrinoEntitiesFactory.trinoEntity,
      localStorage: window.localStorage,
    })
  }
}
