import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  function Model() {
    const { scene } = useGLTF('/static/images/house1.glb')
    return <primitive object={scene} />
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <Environment files="/static/images/studio_small_03_1k.hdr" />
      <Model />
    </group>
  )
}

useGLTF.preload('/static/images/uncharted-ring-draco-transformed.glb')
