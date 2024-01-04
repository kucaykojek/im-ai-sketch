'use client'

import { AudioWaveformIcon, PaletteIcon, ShapesIcon } from 'lucide-react'
import { useState } from 'react'
import React from 'react'

import {
  Tools as SketchDrawTool,
  useSketchDrawContext
} from '@/components/SketchDraw'
import { cn } from '@/libs/utils'

import style from './Dock.module.css'

const DockTools = () => {
  const { isReady } = useSketchDrawContext()
  const [isExpandedGroup, setIsExpandedGroup] = useState<{
    [_: string]: boolean
  }>({
    'group-1': true,
    'group-2': true,
    'group-3': true
  })

  const groupedTools = [
    {
      key: 'group-1',
      title: 'Free Draw',
      class: {
        button: '!text-branding-cyan hover:!bg-branding-cyan hover:!text-white',
        buttonActive: '!bg-branding-cyan !text-white',
        loader: 'w-28'
      },
      icon: <AudioWaveformIcon />,
      tools: [
        <SketchDrawTool.Pencil key="pencil-tools" />,
        <SketchDrawTool.Highlighter key="highlighter-tools" />,
        <SketchDrawTool.Eraser key="eraser-tools" />
      ]
    },
    {
      key: 'group-2',
      title: 'Shape',
      class: {
        button: '!text-branding-pink hover:!bg-branding-pink hover:!text-white',
        buttonActive: '!bg-branding-pink !text-white',
        loader: 'w-28'
      },
      icon: <ShapesIcon />,
      tools: [
        <SketchDrawTool.Rectangle key="square-tools" />,
        <SketchDrawTool.Circle key="circle-tools" />,
        <SketchDrawTool.Triangle key="triangle-tools" />
      ]
    },
    {
      key: 'group-3',
      title: 'Color',
      class: {
        button: '!text-branding-blue hover:!bg-branding-blue hover:!text-white',
        buttonActive: '!bg-branding-blue !text-white',
        loader: 'w-48'
      },
      icon: <PaletteIcon />,
      tools: [<SketchDrawTool.ColorPalette key="color-palette-tools" />]
    }
  ]

  return (
    <>
      {groupedTools.map((group, index) => (
        <div
          key={`tool-group-${index}`}
          className={cn(
            style.toolGroup,
            isExpandedGroup[group.key] && style.toolGroupActive
          )}
        >
          <button
            className={cn(
              style.toolGroupButton,
              group.class.button,
              isExpandedGroup[group.key] && group.class.buttonActive
            )}
            title={group.title}
            onClick={() =>
              setIsExpandedGroup({
                ...isExpandedGroup,
                [group.key]: !isExpandedGroup[group.key]
              })
            }
          >
            {group.icon}
          </button>
          <div className={style.toolItems}>
            {isReady ? (
              <>
                {group.tools.map((tool, toolIndex) => (
                  <React.Fragment key={`tool-${index}-${toolIndex}`}>
                    {tool}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <div
                className={cn(
                  'animate-pulse rounded-lg bg-neutral-300 h-8',
                  group.class.loader
                )}
              ></div>
            )}
          </div>
        </div>
      ))}

      <div className="border-l flex items-center space-x-2 pl-2">
        {isReady ? (
          <>
            <SketchDrawTool.Text />
            <SketchDrawTool.Image />
          </>
        ) : (
          <>
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-8"></div>
            <div className="animate-pulse rounded-lg bg-neutral-300 h-8 w-8"></div>
          </>
        )}
      </div>
    </>
  )
}

export default DockTools
