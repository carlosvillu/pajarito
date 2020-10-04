import {UserEntity} from '../Entities/UserEntity'
import {UserRepository} from './UserRepository'

const USERS_KEY = 'users'

export class LocalStorageUserRepository extends UserRepository {
  #userEntityFactory
  #localStorage

  constructor({userEntityFactory, localStorage}) {
    super()
    this.#userEntityFactory = userEntityFactory
    this.#localStorage = localStorage
  }

  async login({username, password}) {
    super.login()
  }

  async register({username, password}) {
    const newUserID = UserEntity.generateUUID()
    const usersJSON = this.#localStorage.getItem(USERS_KEY) || '{}'
    const usersDB = JSON.parse(usersJSON)

    /**
     *
     * const usersDB = {
     *  [id]: {
     *     id,
     *     username,
     *     password
     *  }
     * }
     *
     * */

    if (
      Object.values(usersDB).some(user => user.username === username.value())
    ) {
      throw new Error(
        '[UserRepository#register] forbidden register already used username'
      )
    }

    const nextUsersDB = Object.assign(usersDB, {
      [newUserID]: {
        id: newUserID,
        username: username.value(),
        password: password.value()
      }
    })

    this.#localStorage.setItem(USERS_KEY, JSON.stringify(nextUsersDB))

    return this.#userEntityFactory({id: newUserID, username: username.value()})
  }
}
