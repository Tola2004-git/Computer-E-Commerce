'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  useEffect(() => {
    import('@splinetool/react-spline').catch(() => {})
  }, [])

  return (
    <div className={`w-full h-full ${className ?? ''}`}>
      <Spline scene={scene} />
    </div>
  )
}
