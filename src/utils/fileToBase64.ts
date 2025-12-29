const MAX_IMAGE_SIZE = 500 * 1024 // 500KB max per image for localStorage
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

export interface FileToBase64Result {
  success: boolean
  dataUrl?: string
  error?: string
}

export async function fileToBase64(file: File): Promise<FileToBase64Result> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Tipo de archivo no permitido: ${file.type}. Solo se permiten JPEG, PNG, GIF y WebP.`,
    }
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      success: false,
      error: `El archivo es muy grande (${(file.size / 1024).toFixed(1)}KB). Máximo 500KB por imagen.`,
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve({
        success: true,
        dataUrl: reader.result as string,
      })
    }
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Error al leer el archivo.',
      })
    }
    reader.readAsDataURL(file)
  })
}

export function validateImages(files: FileList | null): {
  valid: boolean
  count: number
  error?: string
} {
  if (!files || files.length === 0) {
    return { valid: true, count: 0 }
  }

  if (files.length > 4) {
    return {
      valid: false,
      count: files.length,
      error: 'Máximo 4 imágenes por trino.',
    }
  }

  return { valid: true, count: files.length }
}
