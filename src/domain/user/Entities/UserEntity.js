import {Entity} from '../../common/Entity'

export class UserEntity extends Entity {
  #username
  #id

  static generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a =>
      (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    )
  }

  static validate({id, username}) {
    if (!username || !id) {
      throw new Error(
        `[UserEntity.validate] forbidden UserEntity username(${username}) id(${id})`
      )
    }
  }

  constructor({id, username}) {
    super()
    this.#username = username
    this.#id = id
  }

  toJSON() {
    return {
      username: this.#username,
      id: this.#id
    }
  }
}
