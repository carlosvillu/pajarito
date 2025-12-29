import { UserNameValueObject } from '../../../../domain/user/ValueObjects/UserNameValueObject'

describe('UserNameValueObject', () => {
  describe('constructor', () => {
    it('should create a UserNameValueObject with valid username', () => {
      const username = 'testuser'
      const valueObject = new UserNameValueObject({ username })

      expect(valueObject.value()).toEqual('testuser')
      expect(valueObject.toJSON()).toEqual({ username: 'testuser' })
    })

    it('should create a UserNameValueObject with 4 character username (minimum)', () => {
      const username = 'abcd'
      const valueObject = new UserNameValueObject({ username })

      expect(valueObject.value()).toEqual('abcd')
    })
  })

  describe('validate', () => {
    it('should not throw when username is valid', () => {
      expect(() => {
        UserNameValueObject.validate({ username: 'validuser' })
      }).not.toThrow()
    })

    it('should not throw when username is exactly 4 characters', () => {
      expect(() => {
        UserNameValueObject.validate({ username: 'abcd' })
      }).not.toThrow()
    })

    it('should throw when username is less than 4 characters', () => {
      expect(() => {
        UserNameValueObject.validate({ username: 'abc' })
      }).toThrow(
        '[UserNameValueObject.validate] forbidden username lower than 4 characters'
      )
    })

    it('should throw when username is empty string', () => {
      expect(() => {
        UserNameValueObject.validate({ username: '' })
      }).toThrow(
        '[UserNameValueObject.validate] forbidden username lower than 4 characters'
      )
    })

    it('should throw when username is null', () => {
      expect(() => {
        UserNameValueObject.validate({ username: null })
      }).toThrow(
        '[UserNameValueObject.validate] forbidden username lower than 4 characters'
      )
    })

    it('should throw when username is undefined', () => {
      expect(() => {
        UserNameValueObject.validate({ username: undefined })
      }).toThrow(
        '[UserNameValueObject.validate] forbidden username lower than 4 characters'
      )
    })
  })

  describe('value', () => {
    it('should return the username value', () => {
      const valueObject = new UserNameValueObject({ username: 'myuser' })

      expect(valueObject.value()).toEqual('myuser')
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation', () => {
      const valueObject = new UserNameValueObject({ username: 'jsonuser' })

      expect(valueObject.toJSON()).toEqual({ username: 'jsonuser' })
    })
  })
})
