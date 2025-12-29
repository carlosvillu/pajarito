import { StatusValueObject } from '../../../../domain/user/ValueObjects/StatusValueObject'

describe('StatusValueObject', () => {
  describe('constructor', () => {
    it('should create a StatusValueObject with true status', () => {
      const status = true
      const valueObject = new StatusValueObject({ status })

      expect(valueObject.value()).toEqual(true)
      expect(valueObject.isOK()).toEqual(true)
      expect(valueObject.toJSON()).toEqual({ status: true })
    })

    it('should create a StatusValueObject with false status', () => {
      const status = false
      const valueObject = new StatusValueObject({ status })

      expect(valueObject.value()).toEqual(false)
      expect(valueObject.isOK()).toEqual(false)
      expect(valueObject.toJSON()).toEqual({ status: false })
    })
  })

  describe('validate', () => {
    it('should not throw when status is true', () => {
      expect(() => {
        StatusValueObject.validate({ status: true })
      }).not.toThrow()
    })

    it('should not throw when status is false', () => {
      expect(() => {
        StatusValueObject.validate({ status: false })
      }).not.toThrow()
    })

    it('should throw when status is null', () => {
      expect(() => {
        StatusValueObject.validate({ status: null })
      }).toThrow('[StatusValueObject.validate] status(null) should be boolean')
    })

    it('should throw when status is undefined', () => {
      expect(() => {
        StatusValueObject.validate({ status: undefined })
      }).toThrow('[StatusValueObject.validate] status(undefined) should be boolean')
    })

    it('should throw when status is a string', () => {
      expect(() => {
        StatusValueObject.validate({ status: 'true' })
      }).toThrow('[StatusValueObject.validate] status(true) should be boolean')
    })

    it('should throw when status is a number', () => {
      expect(() => {
        StatusValueObject.validate({ status: 1 })
      }).toThrow('[StatusValueObject.validate] status(1) should be boolean')
    })
  })

  describe('isOK', () => {
    it('should return true when status is true', () => {
      const valueObject = new StatusValueObject({ status: true })

      expect(valueObject.isOK()).toEqual(true)
    })

    it('should return false when status is false', () => {
      const valueObject = new StatusValueObject({ status: false })

      expect(valueObject.isOK()).toEqual(false)
    })
  })

  describe('value', () => {
    it('should return the status value', () => {
      const valueObject = new StatusValueObject({ status: true })

      expect(valueObject.value()).toEqual(true)
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation with true', () => {
      const valueObject = new StatusValueObject({ status: true })

      expect(valueObject.toJSON()).toEqual({ status: true })
    })

    it('should return correct JSON representation with false', () => {
      const valueObject = new StatusValueObject({ status: false })

      expect(valueObject.toJSON()).toEqual({ status: false })
    })
  })
})
