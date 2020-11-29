import { TrinoError } from './TrinoError'

export class NotFoundListTrinoError extends TrinoError {
  constructor() {
    super('[NotFoundListTrinoError] List unavailable')
  }
}
