import { TrinoEntity } from '../../../../domain/trino/Entities/TrinoEntity'
import { UserEntity } from '../../../../domain/user/Entities/UserEntity'
import { BodyValueObject } from '../../../../domain/trino/ValueObjects/BodyValueObject'

describe('TrinoEntity', () => {
  const createValidUser = () =>
    new UserEntity({
      id: 'user-123',
      username: 'testuser',
    })

  const createValidBody = () => new BodyValueObject({ body: 'Hello world' })

  const createValidTrino = () =>
    new TrinoEntity({
      id: 'trino-123',
      body: createValidBody(),
      user: createValidUser(),
      timestamp: 1234567890,
      images: [],
    })

  describe('constructor', () => {
    it('should create a TrinoEntity with valid data', () => {
      const trino = createValidTrino()

      expect(trino.toJSON()).toEqual({
        id: 'trino-123',
        timestamp: 1234567890,
        body: { body: 'Hello world' },
        user: {
          id: 'user-123',
          username: 'testuser',
        },
        images: [],
      })
    })
  })

  describe('generateUUID', () => {
    it('should generate a string', () => {
      const uuid = TrinoEntity.generateUUID()

      expect(typeof uuid).toBe('string')
      expect(uuid.length).toBeGreaterThan(0)
    })

    it('should generate unique UUIDs', () => {
      const uuid1 = TrinoEntity.generateUUID()
      const uuid2 = TrinoEntity.generateUUID()

      expect(uuid1).not.toEqual(uuid2)
    })

    it('should generate UUIDs with expected length', () => {
      const uuid = TrinoEntity.generateUUID()

      expect(uuid.length).toBeGreaterThan(0)
    })
  })

  describe('validate', () => {
    it('should not throw when all fields are valid', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: createValidBody(),
          user: createValidUser(),
          timestamp: 1234567890,
          images: [],
        })
      }).not.toThrow()
    })

    it('should throw when body is missing', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: null,
          user: createValidUser(),
          timestamp: 1234567890,
          images: [],
        })
      }).toThrow(
        '[TrinoEntity.validate] forbidden TrinoEntity body(null) id(trino-123) user([object Object]) timestamp(1234567890)'
      )
    })

    it('should throw when id is missing', () => {
      expect(() => {
        TrinoEntity.validate({
          id: null,
          body: createValidBody(),
          user: createValidUser(),
          timestamp: 1234567890,
          images: [],
        })
      }).toThrow(
        '[TrinoEntity.validate] forbidden TrinoEntity body([object Object]) id(null) user([object Object]) timestamp(1234567890)'
      )
    })

    it('should throw when user is missing', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: createValidBody(),
          user: null,
          timestamp: 1234567890,
          images: [],
        })
      }).toThrow(
        '[TrinoEntity.validate] forbidden TrinoEntity body([object Object]) id(trino-123) user(null) timestamp(1234567890)'
      )
    })

    it('should throw when timestamp is missing', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: createValidBody(),
          user: createValidUser(),
          timestamp: null,
          images: [],
        })
      }).toThrow(
        '[TrinoEntity.validate] forbidden TrinoEntity body([object Object]) id(trino-123) user([object Object]) timestamp(null)'
      )
    })

    it('should throw when body is not a BodyValueObject', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: { body: 'not a BodyValueObject' },
          user: createValidUser(),
          timestamp: 1234567890,
          images: [],
        })
      }).toThrow(
        '[TrinoEntity.validate] body is not instanceof BodyValueObject body([object Object])'
      )
    })

    it('should throw when user is not a UserEntity', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: createValidBody(),
          user: { id: 'user-123', username: 'testuser' },
          timestamp: 1234567890,
          images: [],
        })
      }).toThrow(
        '[TrinoEntity.validate] user is not instanceof UserEntity user([object Object])'
      )
    })

    it('should throw when images is not an array', () => {
      expect(() => {
        TrinoEntity.validate({
          id: 'trino-123',
          body: createValidBody(),
          user: createValidUser(),
          timestamp: 1234567890,
          images: 'not an array',
        })
      }).toThrow(
        '[TrinoEntity.validate] images must be an array if provided images(not an array)'
      )
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation', () => {
      const trino = createValidTrino()

      expect(trino.toJSON()).toEqual({
        id: 'trino-123',
        timestamp: 1234567890,
        body: { body: 'Hello world' },
        user: {
          id: 'user-123',
          username: 'testuser',
        },
        images: [],
      })
    })

    it('should return correct JSON representation with images', () => {
      const trino = new TrinoEntity({
        id: 'trino-123',
        body: createValidBody(),
        user: createValidUser(),
        timestamp: 1234567890,
        images: ['data:image/jpeg;base64,/9j/4AAQSkZJRg=='],
      })

      expect(trino.toJSON()).toEqual({
        id: 'trino-123',
        timestamp: 1234567890,
        body: { body: 'Hello world' },
        user: {
          id: 'user-123',
          username: 'testuser',
        },
        images: ['data:image/jpeg;base64,/9j/4AAQSkZJRg=='],
      })
    })
  })
})
