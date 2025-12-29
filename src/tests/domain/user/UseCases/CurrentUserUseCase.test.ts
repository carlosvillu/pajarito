import { CurrentUserUseCase } from '../../../../domain/user/UseCases/CurrentUserUseCase'
import { UserEntity } from '../../../../domain/user/Entities/UserEntity'

describe('CurrentUserUseCase', () => {
  let mockService
  let useCase

  beforeEach(() => {
    mockService = {
      execute: jest.fn(),
    }
    useCase = new CurrentUserUseCase({
      service: mockService,
    })
  })

  describe('execute', () => {
    it('should return current user', async () => {
      const mockUser = new UserEntity({
        id: 'current-user-123',
        username: 'currentuser',
      })
      mockService.execute.mockResolvedValue(mockUser)

      const [error, result] = await useCase.execute()

      expect(error).toBeNull()
      expect(result).toEqual({
        id: 'current-user-123',
        username: 'currentuser',
      })
      expect(mockService.execute).toHaveBeenCalledTimes(1)
    })

    it('should return user data from service', async () => {
      const mockUser = new UserEntity({
        id: 'user-abc',
        username: 'testuser',
      })
      mockService.execute.mockResolvedValue(mockUser)

      const [, result] = await useCase.execute()

      expect(result.id).toBe('user-abc')
      expect(result.username).toBe('testuser')
    })
  })
})
