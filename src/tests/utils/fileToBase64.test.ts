import { fileToBase64, validateImages } from '../../utils/fileToBase64'

describe('fileToBase64', () => {
  const createMockFile = (
    name: string,
    type: string,
    size: number,
  ): File => {
    const file = new File([], name, { type })
    Object.defineProperty(file, 'size', { value: size })
    return file
  }

  describe('fileToBase64', () => {
    it('should convert a valid JPEG file to base64', async () => {
      const file = createMockFile('test.jpg', 'image/jpeg', 100 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(true)
      expect(result.dataUrl).toContain('data:image/jpeg;base64,')
    })

    it('should convert a valid PNG file to base64', async () => {
      const file = createMockFile('test.png', 'image/png', 100 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(true)
      expect(result.dataUrl).toContain('data:image/png;base64,')
    })

    it('should reject files larger than 500KB', async () => {
      const file = createMockFile('large.jpg', 'image/jpeg', 600 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(false)
      expect(result.error).toContain('muy grande')
      expect(result.error).toContain('500KB')
    })

    it('should reject non-image files', async () => {
      const file = createMockFile('document.pdf', 'application/pdf', 100 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Tipo de archivo no permitido')
    })

    it('should accept WebP files', async () => {
      const file = createMockFile('test.webp', 'image/webp', 100 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(true)
      expect(result.dataUrl).toContain('data:image/webp;base64,')
    })

    it('should accept GIF files', async () => {
      const file = createMockFile('animation.gif', 'image/gif', 100 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(true)
      expect(result.dataUrl).toContain('data:image/gif;base64,')
    })

    it('should accept files exactly at 500KB limit', async () => {
      const file = createMockFile('exact-limit.jpg', 'image/jpeg', 500 * 1024)
      const result = await fileToBase64(file)

      expect(result.success).toBe(true)
    })
  })

  describe('validateImages', () => {
    it('should return valid for empty file list', () => {
      const result = validateImages(null)
      expect(result.valid).toBe(true)
      expect(result.count).toBe(0)
    })

    it('should return valid for no files', () => {
      const fileList = { length: 0 } as FileList
      const result = validateImages(fileList)
      expect(result.valid).toBe(true)
      expect(result.count).toBe(0)
    })

    it('should return valid for 1 file', () => {
      const files = {
        length: 1,
        item: () => createMockFile('test.jpg', 'image/jpeg', 100 * 1024),
      } as unknown as FileList

      const result = validateImages(files)
      expect(result.valid).toBe(true)
      expect(result.count).toBe(1)
    })

    it('should return valid for 4 files', () => {
      const files = {
        length: 4,
        0: createMockFile('1.jpg', 'image/jpeg', 100 * 1024),
        1: createMockFile('2.jpg', 'image/jpeg', 100 * 1024),
        2: createMockFile('3.jpg', 'image/jpeg', 100 * 1024),
        3: createMockFile('4.jpg', 'image/jpeg', 100 * 1024),
        item: (i: number) => [files[0], files[1], files[2], files[3]][i],
      } as unknown as FileList

      const result = validateImages(files)
      expect(result.valid).toBe(true)
      expect(result.count).toBe(4)
    })

    it('should return invalid for more than 4 files', () => {
      const files = {
        length: 5,
        0: createMockFile('1.jpg', 'image/jpeg', 100 * 1024),
        1: createMockFile('2.jpg', 'image/jpeg', 100 * 1024),
        2: createMockFile('3.jpg', 'image/jpeg', 100 * 1024),
        3: createMockFile('4.jpg', 'image/jpeg', 100 * 1024),
        4: createMockFile('5.jpg', 'image/jpeg', 100 * 1024),
        item: (i: number) =>
          [files[0], files[1], files[2], files[3], files[4]][i],
      } as unknown as FileList

      const result = validateImages(files)
      expect(result.valid).toBe(false)
      expect(result.error).toContain('Máximo 4')
      expect(result.count).toBe(5)
    })
  })
})
