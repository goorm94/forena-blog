import { useState, useEffect } from 'react'
import { AdaptiveEvents } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import UnchartedRingControl from './UnchartedRingControl'

const UnchartedRing = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-52">
      <Canvas
        style={{ height: '300px' }}
        mode="concurrent"
        camera={{ fov: 50, near: 0.2, far: 1500, position: [0, 0, 9] }}
      >
        <UnchartedRingControl />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}

export default UnchartedRing
