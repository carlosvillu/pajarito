import { ValueObject } from '../../common/ValueObject'

export class TrinosListValueObject extends ValueObject {
  #trinos

  static validate({ trinos }) {
    if (!Array.isArray(trinos)) {
      throw new Error(
        `[TrinosListValueObject.validate] trinos should be instanceof Array trinos(${trinos})`
      )
    }
  }

  constructor({ trinos }) {
    super()
    this.#trinos = trinos
  }

  toJSON() {
    return { trinos: this.#trinos.map((trino) => trino.toJSON()) }
  }
}
