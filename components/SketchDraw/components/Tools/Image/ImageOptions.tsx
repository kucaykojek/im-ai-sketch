import { ImageIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import useSketchDrawContext from '@/sketch-draw/SketchDraw.context'
import style from '@/sketch-draw/components/Tools/Tools.module.css'
import useActiveObjectId from '@/sketch-draw/store/useActiveObjectId'
import useCanvasObjects from '@/sketch-draw/store/useCanvasObjects'
import useCanvasWorkingSize from '@/sketch-draw/store/useCanvasWorkingSize'
import useUserMode from '@/sketch-draw/store/useUserMode'
import { cn } from '@/sketch-draw/utils/common'
import fileToBase64 from '@/sketch-draw/utils/fileToBase64'
import generateUniqueId from '@/sketch-draw/utils/generateUniqueId'
import getImageElementFromUrl from '@/sketch-draw/utils/getImageElementFromUrl'
import saveObjectsToStorage from '@/sketch-draw/utils/saveObjectsToStorage'

const ImageOptions = () => {
  const { isReady } = useSketchDrawContext()
  const { canvasObjects, appendImageObject } = useCanvasObjects()
  const { setActiveObjectId } = useActiveObjectId()
  const { setUserMode } = useUserMode()
  const { canvasWorkingSize } = useCanvasWorkingSize()

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
        width: canvasWorkingSize.width,
        height: canvasWorkingSize.height
      })

      if (result) {
        pushImageObject(result)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const pushImageObject = async ({
    image: imageUrl,
    width,
    height
  }: {
    image: string
    width: number
    height: number
  }) => {
    const imageElement = await getImageElementFromUrl(imageUrl)
    const createdObjectId = generateUniqueId()
    const imageObject = {
      id: createdObjectId,
      x: (canvasWorkingSize.width - width) / 2, // center
      y: (canvasWorkingSize.height - height) / 2, // center
      width: width,
      height: height,
      imageOpts: {
        imageUrl,
        imageElement
      }
    }

    appendImageObject(imageObject)
    setActiveObjectId(createdObjectId)
    setUserMode('select')

    const clonedCanvasObjects = [...canvasObjects]
    clonedCanvasObjects.push({ ...imageObject, type: 'image', opacity: 100 })

    saveObjectsToStorage(clonedCanvasObjects)
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
