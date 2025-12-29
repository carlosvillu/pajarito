import { LoginUserUseCase } from '../../../../domain/user/UseCases/LoginUserUseCase'
import { UserNameValueObject } from '../../../../domain/user/ValueObjects/UserNameValueObject'
import { PasswordValueObject } from '../../../../domain/user/ValueObjects/PasswordValueObject'
import { UserEntity } from '../../../../domain/user/Entities/UserEntity'

describe('LoginUserUseCase', () => {
  let mockRepository
  let usernameVOFactory
  let passwordVOFactory
  let useCase

  beforeEach(() => {
    mockRepository = {
      login: jest.fn(),
    }
    usernameVOFactory = ({ username }) => new UserNameValueObject({ username })
    passwordVOFactory = ({ password }) => new PasswordValueObject({ password })
    useCase = new LoginUserUseCase({
      repository: mockRepository,
      usernameValueObjectFactory: usernameVOFactory,
      passwordValueObjectFactory: passwordVOFactory,
    })
  })

  describe('execute', () => {
    it('should login user with valid credentials', async () => {
      const mockUser = new UserEntity({
        id: 'user-123',
        username: 'testuser',
      })
      mockRepository.login.mockResolvedValue(mockUser)

      const [error, result] = await useCase.execute({
        username: 'testuser',
        password: 'password123',
      })

      expect(error).toBeNull()
      expect(result).toEqual({
        id: 'user-123',
        username: 'testuser',
      })
      expect(mockRepository.login).toHaveBeenCalledWith(
        expect.objectContaining({
          username: expect.any(UserNameValueObject),
          password: expect.any(PasswordValueObject),
        })
      )
    })

    it('should call repository with correct arguments', async () => {
      const mockUser = new UserEntity({
        id: 'user-456',
        username: 'anotheruser',
      })
      mockRepository.login.mockResolvedValue(mockUser)

      await useCase.execute({
        username: 'anotheruser',
        password: 'securepass',
      })

      const loginCall = mockRepository.login.mock.calls[0][0]
      expect(loginCall.username.value()).toBe('anotheruser')
      expect(loginCall.password.value()).toBe('securepass')
    })
  })
})
