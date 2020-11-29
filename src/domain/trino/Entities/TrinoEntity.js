import {Entity} from '../../common/Entity'

import {UserEntity} from '../../user/Entities/UserEntity'
import {BodyValueObject} from '../ValueObjects/BodyValueObject'

export class TrinoEntity extends Entity {
  #timestamp
  #body
  #id
  #user

  static generateUUID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a =>
      (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    )
  }

  static validate({body, id, user, timestamp}) {
    if (!body || !id || !user || !timestamp) {
      throw new Error(
        `[TrinoEntity.validate] forbidden TrinoEntity body(${body}) id(${id}) user(${user}) timestamp(${timestamp})`
      )
    }

    if (!(body instanceof BodyValueObject)) {
      throw new Error(
        `[TrinoEntity.validate] body is not instanceof BodyValueObject body(${body})`
      )
    }

    if (!(user instanceof UserEntity)) {
      throw new Error(
        `[TrinoEntity.validate] user is not instanceof UserEntity user(${user})`
      )
    }
  }

  constructor({body, id, user, timestamp}) {
    super()
    this.#timestamp = timestamp
    this.#id = id
    this.#body = body
    this.#user = user
  }

  toJSON() {
    return {
      id: this.#id,
      timestamp: this.#timestamp,
      body: this.#body.toJSON(),
      user: this.#user.toJSON()
    }
  }
}
