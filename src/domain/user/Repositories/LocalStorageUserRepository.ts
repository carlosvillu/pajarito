import { UserEntity } from '../Entities/UserEntity'
import { UserRepository } from './UserRepository'

const EMPTY_DB = JSON.stringify({})
const USERS_KEY = 'users'
const CURRENT_USER_KEY = '__CURRENT_USER__'

interface UserData {
  username: string
  id: string
  password: string
}

export class LocalStorageUserRepository extends UserRepository {
  #statusValueObjectFactory
  #userEntityFactory
  #localStorage

  constructor({ userEntityFactory, statusValueObjectFactory, localStorage }) {
    super()

    this.#statusValueObjectFactory = statusValueObjectFactory
    this.#userEntityFactory = userEntityFactory
    this.#localStorage = localStorage
  }

  async current() {
    const usersJSON = this.#localStorage.getItem(USERS_KEY) || EMPTY_DB
    const usersDB = JSON.parse(usersJSON)

    const currentUserJSON = usersDB[CURRENT_USER_KEY]

    if (!currentUserJSON) {
      throw new Error('[UserRepository#current] user NOT FOUND')
    }

    return this.#userEntityFactory(currentUserJSON)
  }

  async logout() {
    const usersJSON = this.#localStorage.getItem(USERS_KEY) || EMPTY_DB
    const usersDB = JSON.parse(usersJSON)

    const nextUsersDB = Object.assign(usersDB, {
      [CURRENT_USER_KEY]: undefined,
    })

    this.#localStorage.setItem(USERS_KEY, JSON.stringify(nextUsersDB))

    return this.#statusValueObjectFactory({ status: true })
  }

  async login({ username, password }) {
    const usersJSON = this.#localStorage.getItem(USERS_KEY) || EMPTY_DB
    const usersDB: UserData[] = JSON.parse(usersJSON)

    const userJSON: UserData = Object.values(usersDB).find(
      (user) => user.username === username.value()
    )

    if (!usersJSON || userJSON.password !== password.value()) {
      throw new Error('[UserRepository#login] forbidden user')
    }

    const nextUsersDB = Object.assign(usersDB, {
      [CURRENT_USER_KEY]: {
        ...userJSON,
        password: undefined,
      },
    })

    this.#localStorage.setItem(USERS_KEY, JSON.stringify(nextUsersDB))

    return this.#userEntityFactory(userJSON)
  }

  async register({ username, password }) {
    const newUserID = UserEntity.generateUUID()
    const usersJSON = this.#localStorage.getItem(USERS_KEY) || EMPTY_DB
    const usersDB: UserData = JSON.parse(usersJSON)

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
      Object.values(usersDB).some((user) => user.username === username.value())
    ) {
      throw new Error(
        '[UserRepository#register] forbidden register already used username'
      )
    }

    const nextUsersDB = Object.assign(usersDB, {
      [newUserID]: {
        id: newUserID,
        username: username.value(),
        password: password.value(),
      },
    })

    this.#localStorage.setItem(USERS_KEY, JSON.stringify(nextUsersDB))

    return this.#userEntityFactory({
      id: newUserID,
      username: username.value(),
    })
  }
}
