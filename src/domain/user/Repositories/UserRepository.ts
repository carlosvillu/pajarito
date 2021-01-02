export abstract class UserRepository {
  abstract register(_param)

  abstract login(_param)

  abstract logout()

  abstract current()
}
