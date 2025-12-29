import { TrinosListValueObject } from '../../../../domain/trino/ValueObjects/TrinosListValueObject'

describe('TrinosListValueObject', () => {
  describe('constructor', () => {
    it('should create a TrinosListValueObject with valid array', () => {
      const trinos = []
      const valueObject = new TrinosListValueObject({ trinos })

      expect(valueObject.toJSON()).toEqual({ trinos: [] })
    })

    it('should create a TrinosListValueObject with trino objects', () => {
      const mockTrino1 = { toJSON: () => ({ id: '1', body: 'Test 1' }) }
      const mockTrino2 = { toJSON: () => ({ id: '2', body: 'Test 2' }) }
      const trinos = [mockTrino1, mockTrino2]

      const valueObject = new TrinosListValueObject({ trinos })

      expect(valueObject.toJSON()).toEqual({
        trinos: [
          { id: '1', body: 'Test 1' },
          { id: '2', body: 'Test 2' },
        ],
      })
    })
  })

  describe('validate', () => {
    it('should not throw when trinos is a valid array', () => {
      expect(() => {
        TrinosListValueObject.validate({ trinos: [] })
      }).not.toThrow()
    })

    it('should not throw when trinos has elements', () => {
      expect(() => {
        TrinosListValueObject.validate({ trinos: [{ id: '1' }] })
      }).not.toThrow()
    })

    it('should throw when trinos is null', () => {
      expect(() => {
        TrinosListValueObject.validate({ trinos: null })
      }).toThrow(
        '[TrinosListValueObject.validate] trinos should be instanceof Array trinos(null)'
      )
    })

    it('should throw when trinos is undefined', () => {
      expect(() => {
        TrinosListValueObject.validate({ trinos: undefined })
      }).toThrow(
        '[TrinosListValueObject.validate] trinos should be instanceof Array trinos(undefined)'
      )
    })

    it('should throw when trinos is a string', () => {
      expect(() => {
        TrinosListValueObject.validate({ trinos: 'not an array' })
      }).toThrow(
        '[TrinosListValueObject.validate] trinos should be instanceof Array trinos(not an array)'
      )
    })

    it('should throw when trinos is an object', () => {
      expect(() => {
        TrinosListValueObject.validate({ trinos: { foo: 'bar' } })
      }).toThrow(
        '[TrinosListValueObject.validate] trinos should be instanceof Array trinos([object Object])'
      )
    })
  })

  describe('toJSON', () => {
    it('should return correct JSON representation with empty array', () => {
      const valueObject = new TrinosListValueObject({ trinos: [] })

      expect(valueObject.toJSON()).toEqual({ trinos: [] })
    })
  })
})
