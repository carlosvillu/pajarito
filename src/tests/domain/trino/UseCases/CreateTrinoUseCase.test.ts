import { CreateTrinoUseCase } from '../../../../domain/trino/UseCases/CreateTrinoUseCase'
import { BodyValueObject } from '../../../../domain/trino/ValueObjects/BodyValueObject'
import { TrinoEntity } from '../../../../domain/trino/Entities/TrinoEntity'
import { UserEntity } from '../../../../domain/user/Entities/UserEntity'

describe('CreateTrinoUseCase', () => {
  let mockRepository
  let mockCurrentUserService
  let bodyVOFactory
  let useCase

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
    }
    mockCurrentUserService = {
      execute: jest.fn(),
    }
    bodyVOFactory = ({ body }) => new BodyValueObject({ body })
    useCase = new CreateTrinoUseCase({
      repository: mockRepository,
      currentUserService: mockCurrentUserService,
      bodyValueObjectFactory: bodyVOFactory,
    })
  })

  describe('execute', () => {
    it('should create trino successfully', async () => {
      const mockUser = new UserEntity({
        id: 'user-123',
        username: 'testuser',
      })
      const mockTrino = new TrinoEntity({
        id: 'trino-123',
        body: new BodyValueObject({ body: 'Hello world' }),
        user: mockUser,
        timestamp: 1234567890,
      })

      mockCurrentUserService.execute.mockResolvedValue(mockUser)
      mockRepository.create.mockResolvedValue(mockTrino)

      const [, result] = await useCase.execute({ body: 'Hello world' })

      expect(result.id).toBe('trino-123')
      expect(result.body.body).toBe('Hello world')
      expect(result.images).toEqual([])
      expect(mockCurrentUserService.execute).toHaveBeenCalledTimes(1)
      expect(mockRepository.create).toHaveBeenCalledTimes(1)
    })

    it('should create trino with images', async () => {
      const mockUser = new UserEntity({
        id: 'user-123',
        username: 'testuser',
      })
      const mockImages = ['data:image/jpeg;base64,/9j/4AAQSkZJRg==']
      const mockTrino = new TrinoEntity({
        id: 'trino-with-images',
        body: new BodyValueObject({ body: 'Hello with images' }),
        user: mockUser,
        timestamp: 1234567890,
        images: mockImages,
      })

      mockCurrentUserService.execute.mockResolvedValue(mockUser)
      mockRepository.create.mockResolvedValue(mockTrino)

      const [, result] = await useCase.execute({
        body: 'Hello with images',
        images: mockImages,
      })

      expect(result.id).toBe('trino-with-images')
      expect(result.images).toEqual(mockImages)
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          images: mockImages,
        }),
      )
    })

    it('should call repository with correct parameters', async () => {
      const mockUser = new UserEntity({
        id: 'user-456',
        username: 'anotheruser',
      })
      const mockTrino = new TrinoEntity({
        id: 'trino-456',
        body: new BodyValueObject({ body: 'My trino' }),
        user: mockUser,
        timestamp: 1234567890,
      })

      mockCurrentUserService.execute.mockResolvedValue(mockUser)
      mockRepository.create.mockResolvedValue(mockTrino)

      await useCase.execute({ body: 'My trino' })

      const createCall = mockRepository.create.mock.calls[0][0]
      expect(createCall.body).toBeInstanceOf(BodyValueObject)
      expect(createCall.user).toEqual(mockUser)
    })
  })
})
