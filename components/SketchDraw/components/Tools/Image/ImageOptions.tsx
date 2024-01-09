'use client'

import { FabricImage } from 'fabric'
import { ImageIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import useSketchDrawStore from '../../../store/SketchDraw.store'
import { cn, fileToBase64, generateUniqueId } from '../../../utils/common'
import style from '../Tools.module.css'

const ImageOptions = () => {
  const { isReady, canvas, canvasOptions, setActiveTool } = useSketchDrawStore()

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': []
      },
      maxFiles: 1,
      minSize: 1000,
      maxSize: 5000000, // 5Mb,
      disabled: !isReady
    })

  const isError = acceptedFiles.length === 0 && fileRejections.length > 0

  const pushImageObject = async ({
    image: imageUrl,
    width,
    height
  }: {
    image: string
    width: number
    height: number
  }) => {
    // TODO:
    if (canvas) {
      const imageObj = await FabricImage.fromURL(imageUrl)
      const obj = imageObj.set({
        name: generateUniqueId(),
        left: (canvasOptions.width! - width) / 2, // center
        top: (canvasOptions.height! - height) / 2, // center
        width: width,
        height: height
      })

      canvas.add(obj)
      canvas.requestRenderAll()

      setActiveTool(null)
    }
  }

  useEffect(() => {
    const handleFileSelected = async (file: File) => {
      try {
        const result = await fileToBase64(file, {
          width: canvasOptions.width || 0,
          height: canvasOptions.height || 0
        })

        if (result) {
          pushImageObject(result)
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (acceptedFiles.length > 0) {
      handleFileSelected(acceptedFiles[0])
    }
  }, [acceptedFiles])

  return (
    <div className={style.imageToolOptions}>
      <div className={cn(style.optionsWrapper, 'flex-col !py-4 space-y-4')}>
        <div className={style.optionsItem}>
          <div
            {...getRootProps({ className: 'dropzone' })}
            className={cn(
              'border-2 border-dashed rounded-lg px-4 py-20 cursor-pointer w-[30rem] text-center',
              isError && 'border-red-600 text-red-700'
            )}
          >
            <input {...getInputProps()} />
            <p>
              {isError ? (
                <>
                  {fileRejections[fileRejections.length - 1].errors[0].message}.
                  Please try again
                </>
              ) : (
                'Drag an image here, or click to select a file'
              )}
            </p>
          </div>
        </div>
      </div>
      <div className={cn(style.optionsTitle, 'p-4 justify-center')}>
        <ImageIcon />
        Image Selection
      </div>
    </div>
  )
}

export default ImageOptions
