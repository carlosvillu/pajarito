export class UserRepository {
  register(_param) {
    throw new Error('[UserRepository#register] should be implemented')
  }

  login(_param) {
    throw new Error('[UserRepository#login] should be implemented')
  }

  logout() {
    throw new Error('[UserRepository#logout] should be implemented')
  }

  current() {
    throw new Error('[UserRepository#current] should be implemented')
  }
}
