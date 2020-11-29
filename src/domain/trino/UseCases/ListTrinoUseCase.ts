import { streamify, asyncInlineError } from '../../../decorators'
import { UseCase } from '../../common/UseCase'

@streamify('execute')
class ListTrinoUseCase extends UseCase {
  #somethingWrongTrinoErrorFactory
  #repository

  constructor({ repository, somethingWrongTrinoErrorFactory }) {
    super()
    this.#repository = repository
    this.#somethingWrongTrinoErrorFactory = somethingWrongTrinoErrorFactory
  }

  @asyncInlineError()
  async execute() {
    const [error, TrinosList] = await this.#repository.all()

    if (error) {
      throw error
    }

    return TrinosList.toJSON()
  }
}

export { ListTrinoUseCase }
