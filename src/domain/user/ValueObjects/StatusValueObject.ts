import { ValueObject } from '../../common/ValueObject'

export class StatusValueObject extends ValueObject {
  static validate({ status }) {
    if (typeof status !== 'boolean') {
      throw new Error(
        `[StatusValueObject.validate] status(${status}) should be boolean`
      )
    }
  }

  constructor(private status: boolean) {
    super()
  }

  isOK() {
    return this.status
  }

  value() {
    return this.status
  }

  toJSON() {
    return {
      status: this.status,
    }
  }
}
