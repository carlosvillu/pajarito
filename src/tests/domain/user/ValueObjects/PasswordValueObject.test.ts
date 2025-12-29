import { PasswordValueObject } from '../../../../domain/user/ValueObjects/PasswordValueObject'

describe('PasswordValueObject', () => {
  describe('constructor', () => {
    it('should create a PasswordValueObject with valid password', () => {
      const password = 'securepass123'
      const valueObject = new PasswordValueObject({ password })

      expect(valueObject.value()).toEqual('securepass123')
      expect(valueObject.toJSON()).toEqual({ password: 'securepass123' })
    })

    it('should create a PasswordValueObject with 8 character password (minimum)', () => {
      const password = 'abcdefgh'
      const valueObject = new PasswordValueObject({ password })

      expect(valueObject.value()).toEqual('abcdefgh')
    })
  })

  describe('validate', () => {
    it('should not throw when password is valid', () => {
      expect(() => {
        PasswordValueObject.validate({ password: 'securepass123' })
      }).not.toThrow()
    })

    it('should not throw when password is exactly 8 characters', () => {
      expect(() => {
        PasswordValueObject.validate({ password: 'abcdefgh' })
      }).not.toThrow()
    })

    it('should throw when password is less than 8 characters', () => {
      expect(() => {
        PasswordValueObject.validate({ password: 'abc123' })
      }).toThrow(
        '[PasswordValueObject.validate] forbidden password lower than 8 characters'
      )
    })

    it('should throw when password is empty string', () => {
      expect(() => {
        PasswordValueObject.validate({ password: '' })
      }).toThrow(
        '[PasswordValueObject.validate] forbidden password lower than 8 characters'
      )
    })

    it('should throw when password is null', () => {
      expect(() => {
        PasswordValueObject.validate({ password: null })
      }).toThrow(
        '[PasswordValueObject.validate] forbidden password lower than 8 characters'
      )
    })

    it('should throw when password is undefined', () => {
      expect(() => {
        PasswordValueObject.validate({ password: undefined })
      }).toThrow(
        '[PasswordValueObject.validate] forbidden password lower than 8 characters'
      )
    })
  })

  describe('value', () => {
    it('should return the password value', () => {
      const valueObject = new PasswordValueObject({ password: 'mysecret' })

      expect(valueObject.value()).toEqual('mysecret')
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation', () => {
      const valueObject = new PasswordValueObject({ password: 'hiddenpass' })

      expect(valueObject.toJSON()).toEqual({ password: 'hiddenpass' })
    })
  })
})
