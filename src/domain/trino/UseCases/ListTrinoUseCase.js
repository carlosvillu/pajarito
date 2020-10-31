import {asyncInlineError} from '../../../decorators/asyncInlineError'
import {UseCase} from '../../common/UseCase'

export class ListTrinoUseCase extends UseCase {
  #repository

  constructor({repository}) {
    super()
    this.#repository = repository
  }

  @asyncInlineError()
  async execute() {
    const TrinosList = await this.#repository.all()

    return TrinosList.toJSON()
  }
}
