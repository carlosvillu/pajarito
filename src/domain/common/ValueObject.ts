export class ValueObject {
  toJSON() {
    throw new Error('[ValueObject#toJSON] should be implemented')
  }
}
