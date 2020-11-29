import { NotFoundListTrinoError } from './NotFoundListTrinoError'
import { SomethingWrongTrinoError } from './SomethingWrongTrinoError'

export class TrinoErrorsFactory {
  static notFoundListTrinoError() {
    return new NotFoundListTrinoError()
  }

  static somethingWrongTrinoError() {
    return new SomethingWrongTrinoError()
  }
}
