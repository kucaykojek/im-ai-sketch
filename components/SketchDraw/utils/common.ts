import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isHexLight(color: string) {
  const hex = color.replace('#', '')
  const c_r = parseInt(hex.substring(0, 0 + 2), 16)
  const c_g = parseInt(hex.substring(2, 2 + 2), 16)
  const c_b = parseInt(hex.substring(4, 4 + 2), 16)
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000

  return brightness > 155
}

export function generateUniqueId(): string {
  return uuidv4()
}

export function fileToBase64(
  file: File,
  maxDimension: {
    width: number
    height: number
  }
): Promise<{ image: string; width: number; height: number } | null> {
  return new Promise((resolve, reject) => {
    const blobURL = URL.createObjectURL(file)
    const img = new Image()
    img.src = blobURL
    img.onerror = function () {
      URL.revokeObjectURL(this.src)
      resolve(null)
    }
    img.onload = function () {
      const [newWidth, newHeight] = calculateImageSize(
        img,
        maxDimension.width,
        maxDimension.height
      )

      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight)
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader()
            reader.readAsDataURL(blob as Blob)
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                resolve({
                  image: reader.result,
                  width: newWidth,
                  height: newHeight
                })
              } else {
                resolve(null)
              }
            }
            reader.onerror = (error) => {
              reject(error)
            }
          },
          'image/jpeg',
          0.7 // quality
        )
        canvas.remove()
      } else {
        resolve(null)
      }
    }
  })
}

export function calculateImageSize(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
) {
  let width = img.width
  let height = img.height

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width)
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height)
      height = maxHeight
    }
  }
  return [width, height]
}

export function hexToRgba({
  hex,
  opacity = 100
}: {
  hex: string
  opacity?: number
}): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  const r = result?.[1] ? parseInt(result[1], 16) : undefined
  const g = result?.[2] ? parseInt(result[2], 16) : undefined
  const b = result?.[3] ? parseInt(result[3], 16) : undefined

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`
}
