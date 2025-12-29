import { LogoutUserUseCase } from '../../../../domain/user/UseCases/LogoutUserUseCase'
import { StatusValueObject } from '../../../../domain/user/ValueObjects/StatusValueObject'

describe('LogoutUserUseCase', () => {
  let mockRepository
  let useCase

  beforeEach(() => {
    mockRepository = {
      logout: jest.fn(),
    }
    useCase = new LogoutUserUseCase({
      repository: mockRepository,
    })
  })

  describe('execute', () => {
    it('should logout user successfully', async () => {
      const mockStatus = new StatusValueObject({ status: true })
      mockRepository.logout.mockResolvedValue(mockStatus)

      const [error, result] = await useCase.execute()

      expect(error).toBeNull()
      expect(result).toEqual({ status: true })
      expect(mockRepository.logout).toHaveBeenCalledTimes(1)
    })

    it('should return status from repository', async () => {
      const mockStatus = new StatusValueObject({ status: true })
      mockRepository.logout.mockResolvedValue(mockStatus)

      const [, result] = await useCase.execute()

      expect(result.status).toBe(true)
    })
  })
})
