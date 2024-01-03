import { ImageIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import useSketchDrawContext from '@/components/SketchDraw/SketchDraw.context'
import style from '@/components/SketchDraw/components/Tools/Tools.module.css'
import useActiveObjectId from '@/components/SketchDraw/store/useActiveObjectId'
import useCanvasObjects from '@/components/SketchDraw/store/useCanvasObjects'
import useCanvasWorkingSize from '@/components/SketchDraw/store/useCanvasWorkingSize'
import useUserMode from '@/components/SketchDraw/store/useUserMode'
import { cn } from '@/components/SketchDraw/utils/common'
import fileToBase64 from '@/components/SketchDraw/utils/fileToBase64'
import generateUniqueId from '@/components/SketchDraw/utils/generateUniqueId'
import getImageElementFromUrl from '@/components/SketchDraw/utils/getImageElementFromUrl'
import saveObjectsToStorage from '@/components/SketchDraw/utils/saveObjectsToStorage'

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
