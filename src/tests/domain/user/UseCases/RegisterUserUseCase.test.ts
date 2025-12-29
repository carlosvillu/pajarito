import { RegisterUserUseCase } from '../../../../domain/user/UseCases/RegisterUserUseCase'
import { UserNameValueObject } from '../../../../domain/user/ValueObjects/UserNameValueObject'
import { PasswordValueObject } from '../../../../domain/user/ValueObjects/PasswordValueObject'
import { UserEntity } from '../../../../domain/user/Entities/UserEntity'

describe('RegisterUserUseCase', () => {
  let mockRepository
  let usernameVOFactory
  let passwordVOFactory
  let useCase

  beforeEach(() => {
    mockRepository = {
      register: jest.fn(),
    }
    usernameVOFactory = ({ username }) => new UserNameValueObject({ username })
    passwordVOFactory = ({ password }) => new PasswordValueObject({ password })
    useCase = new RegisterUserUseCase({
      repository: mockRepository,
      usernameValueObjectFactory: usernameVOFactory,
      passwordValueObjectFactory: passwordVOFactory,
    })
  })

  describe('execute', () => {
    it('should register user with valid credentials', async () => {
      const mockUser = new UserEntity({
        id: 'new-user-123',
        username: 'newuser',
      })
      mockRepository.register.mockResolvedValue(mockUser)

      const [error, result] = await useCase.execute({
        username: 'newuser',
        password: 'password123',
      })

      expect(error).toBeNull()
      expect(result).toEqual({
        id: 'new-user-123',
        username: 'newuser',
      })
    })

    it('should call repository with correct ValueObjects', async () => {
      const mockUser = new UserEntity({
        id: 'user-789',
        username: 'registeruser',
      })
      mockRepository.register.mockResolvedValue(mockUser)

      await useCase.execute({
        username: 'registeruser',
        password: 'password123',
      })

      const registerCall = mockRepository.register.mock.calls[0][0]
      expect(registerCall.username).toBeInstanceOf(UserNameValueObject)
      expect(registerCall.password).toBeInstanceOf(PasswordValueObject)
      expect(registerCall.username.value()).toBe('registeruser')
      expect(registerCall.password.value()).toBe('password123')
    })
  })
})
