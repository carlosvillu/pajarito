import { UserEntity } from '../../../../domain/user/Entities/UserEntity'

describe('UserEntity', () => {
  const createValidUser = () =>
    new UserEntity({
      id: 'user-123',
      username: 'testuser',
    })

  describe('constructor', () => {
    it('should create a UserEntity with valid data', () => {
      const user = createValidUser()

      expect(user.toJSON()).toEqual({
        id: 'user-123',
        username: 'testuser',
      })
    })
  })

  describe('generateUUID', () => {
    it('should generate a string', () => {
      const uuid = UserEntity.generateUUID()

      expect(typeof uuid).toBe('string')
      expect(uuid.length).toBe(36)
    })

    it('should generate unique UUIDs', () => {
      const uuid1 = UserEntity.generateUUID()
      const uuid2 = UserEntity.generateUUID()

      expect(uuid1).not.toEqual(uuid2)
    })

    it('should generate UUIDs with valid UUID format', () => {
      const uuid = UserEntity.generateUUID()

      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    })
  })

  describe('validate', () => {
    it('should not throw when all fields are valid', () => {
      expect(() => {
        UserEntity.validate({
          id: 'user-123',
          username: 'testuser',
        })
      }).not.toThrow()
    })

    it('should throw when username is missing', () => {
      expect(() => {
        UserEntity.validate({
          id: 'user-123',
          username: null,
        })
      }).toThrow(
        '[UserEntity.validate] forbidden UserEntity username(null) id(user-123)'
      )
    })

    it('should throw when id is missing', () => {
      expect(() => {
        UserEntity.validate({
          id: null,
          username: 'testuser',
        })
      }).toThrow(
        '[UserEntity.validate] forbidden UserEntity username(testuser) id(null)'
      )
    })

    it('should throw when both fields are missing', () => {
      expect(() => {
        UserEntity.validate({
          id: null,
          username: null,
        })
      }).toThrow(
        '[UserEntity.validate] forbidden UserEntity username(null) id(null)'
      )
    })

    it('should throw when username is empty string', () => {
      expect(() => {
        UserEntity.validate({
          id: 'user-123',
          username: '',
        })
      }).toThrow(
        '[UserEntity.validate] forbidden UserEntity username() id(user-123)'
      )
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation', () => {
      const user = createValidUser()

      expect(user.toJSON()).toEqual({
        id: 'user-123',
        username: 'testuser',
      })
    })

    it('should return correct JSON with different data', () => {
      const user = new UserEntity({
        id: 'another-user',
        username: 'anotheruser',
      })

      expect(user.toJSON()).toEqual({
        id: 'another-user',
        username: 'anotheruser',
      })
    })
  })
})
