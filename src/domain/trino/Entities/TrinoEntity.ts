import { Entity } from '../../common/Entity'

import { UserEntity } from '../../user/Entities/UserEntity'
import { BodyValueObject } from '../ValueObjects/BodyValueObject'

interface TrinoJson {
  id: string
  timestamp: string
  body: any
  user: any
}

export class TrinoEntity extends Entity {
  #timestamp: string
  #body: any
  #id: string
  #user: any

  static generateUUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    )
  }

  static validate({ body, id, user, timestamp }) {
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

  constructor({ body, id, user, timestamp }) {
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
      user: this.#user.toJSON(),
    }
  }
}
