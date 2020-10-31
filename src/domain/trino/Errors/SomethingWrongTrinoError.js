import {TrinoError} from './TrinoError'

export class SomethingWrongTrinoError extends TrinoError {
  constructor() {
    super('[SomethingWrongTrinoError] TODO MAL!')
  }
}
