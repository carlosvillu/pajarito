import {UserUseCasesFactory} from './user/UseCases/factories'

const USE_CASES = {
  registerUserUseCase: UserUseCasesFactory.registerUserUseCase(),
  loginUserUseCase: UserUseCasesFactory.loginUserUseCase()
}

export class Pajarito {
  get(key) {
    if (!USE_CASES[key]) {
      throw new Error(`[Pajarito#get] key(${key}) NOT FOUND`)
    }

    return USE_CASES[key]
  }
}
