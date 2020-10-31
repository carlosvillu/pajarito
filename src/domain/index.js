import {TrinoUseCasesFactory} from './trino/UseCases/factories'

import {UserUseCasesFactory} from './user/UseCases/factories'

const USE_CASES = {
  listTrinoUseCase: TrinoUseCasesFactory.listTrinoUseCase(),
  createTrinoUseCase: TrinoUseCasesFactory.createTrinoUseCase(),

  currentUserUseCase: UserUseCasesFactory.currentUserUseCase(),
  logoutUserUseCase: UserUseCasesFactory.logoutUserUseCase(),
  loginUserUseCase: UserUseCasesFactory.loginUserUseCase(),
  registerUserUseCase: UserUseCasesFactory.registerUserUseCase()
}

export class Pajarito {
  get(key) {
    if (!USE_CASES[key]) {
      throw new Error(`[Pajarito#get] key(${key}) NOT FOUND`)
    }

    return USE_CASES[key]
  }
}
