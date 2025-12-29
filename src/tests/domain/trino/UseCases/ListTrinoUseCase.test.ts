import { ListTrinoUseCase } from '../../../../domain/trino/UseCases/ListTrinoUseCase'
import { TrinosListValueObject } from '../../../../domain/trino/ValueObjects/TrinosListValueObject'

describe('ListTrinoUseCase', () => {
  let mockRepository
  let mockErrorFactory
  let useCase

  beforeEach(() => {
    mockRepository = {
      all: jest.fn(),
    }
    mockErrorFactory = () =>
      new Error('[TrinoRepository#all] something went wrong')
    useCase = new ListTrinoUseCase({
      repository: mockRepository,
      somethingWrongTrinoErrorFactory: mockErrorFactory,
    })
  })

  describe('execute', () => {
    it('should return list of trinos', async () => {
      const mockTrinosList = new TrinosListValueObject({ trinos: [] })
      mockRepository.all.mockResolvedValue([null, mockTrinosList])

      const [, result] = await useCase.execute()

      expect(result).toEqual({ trinos: [] })
      expect(mockRepository.all).toHaveBeenCalledTimes(1)
    })
  })
})
