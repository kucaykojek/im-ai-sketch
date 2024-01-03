import { ImageIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useCanvas from '@/components/SketchDraw/store/useCanvas'
import { cn, fileToBase64 } from '@/components/SketchDraw/utils/common'

const ImageOptions = () => {
  const { isReady } = useSketchDrawContext()
  const { canvasOptions } = useCanvas()

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

  const pushImageObject = async ({
    image: _imageUrl,
    width: _w,
    height: _h
  }: {
    image: string
    width: number
    height: number
  }) => {
    // TODO:
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleFileSelected(acceptedFiles[0])
    }
  }, [acceptedFiles, handleFileSelected])

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
