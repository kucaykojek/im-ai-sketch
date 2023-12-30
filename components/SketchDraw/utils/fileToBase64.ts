const MIME_TYPE = 'image/jpeg'
const QUALITY = 0.7

export default function fileToBase64(
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
          MIME_TYPE,
          QUALITY
        )
        canvas.remove()
      } else {
        resolve(null)
      }
    }
  })
}

function calculateImageSize(
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
