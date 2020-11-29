import { ValueObject } from '../../common/ValueObject'

export class BodyValueObject extends ValueObject {
  #body

  static validate({ body }) {
    if (!body) {
      throw new Error('[BodyValueObject.validate] forbidden empty bodies')
    }
  }

  constructor({ body }) {
    super()
    this.#body = body
  }

  toJSON() {
    return {
      body: this.#body,
    }
  }
}
