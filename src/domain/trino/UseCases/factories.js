import {UserServicesFactory} from '../../user/Services/factory'

import {TrinoValueObjectsFactory} from '../ValueObjects/factories'
import {TrinoRepositoriesFactory} from '../Repositories/factories'

import {ListTrinoUseCase} from './ListTrinoUseCase'
import {CreateTrinoUseCase} from './CreateTrinoUseCase'

export class TrinoUseCasesFactory {
  static listTrinoUseCase() {
    return new ListTrinoUseCase({
      repository: TrinoRepositoriesFactory.localStorageTrinoRepository()
    })
  }

  static createTrinoUseCase() {
    return new CreateTrinoUseCase({
      repository: TrinoRepositoriesFactory.localStorageTrinoRepository(),
      currentUserService: UserServicesFactory.currentUserService(),
      bodyValueObjectFactory: TrinoValueObjectsFactory.bodyValueObject
    })
  }
}
