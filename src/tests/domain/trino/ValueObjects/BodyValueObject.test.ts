import { BodyValueObject } from '../../../../domain/trino/ValueObjects/BodyValueObject'

describe('BodyValueObject', () => {
  describe('constructor', () => {
    it('should create a BodyValueObject with valid body', () => {
      const body = 'Hello, this is a valid trino body'
      const valueObject = new BodyValueObject({ body })

      expect(valueObject.toJSON()).toEqual({ body })
    })

    it('should create a BodyValueObject with empty string body', () => {
      const body = ''
      const valueObject = new BodyValueObject({ body })

      expect(valueObject.toJSON()).toEqual({ body: '' })
    })
  })

  describe('validate', () => {
    it('should not throw when body is valid string', () => {
      expect(() => {
        BodyValueObject.validate({ body: 'Valid body' })
      }).not.toThrow()
    })

    it('should throw when body is empty string', () => {
      expect(() => {
        BodyValueObject.validate({ body: '' })
      }).toThrow('[BodyValueObject.validate] forbidden empty bodies')
    })

    it('should throw when body is null', () => {
      expect(() => {
        BodyValueObject.validate({ body: null })
      }).toThrow('[BodyValueObject.validate] forbidden empty bodies')
    })

    it('should throw when body is undefined', () => {
      expect(() => {
        BodyValueObject.validate({ body: undefined })
      }).toThrow('[BodyValueObject.validate] forbidden empty bodies')
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation', () => {
      const body = 'Test body'
      const valueObject = new BodyValueObject({ body })

      expect(valueObject.toJSON()).toEqual({ body: 'Test body' })
    })
  })
})
