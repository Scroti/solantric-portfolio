'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

const COUNT = 220

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const mouse = useRef([0, 0])
  const target = useRef([0, 0])
  const elapsed = useRef(0)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const green = new THREE.Color('#22c55e')
    const white = new THREE.Color('#e5e5e5')

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      const c = Math.random() > 0.72 ? green : white
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    elapsed.current += delta
    const t = elapsed.current

    // smooth mouse follow
    target.current[0] += (mouse.current[0] - target.current[0]) * 0.04
    target.current[1] += (mouse.current[1] - target.current[1]) * 0.04

    pointsRef.current.rotation.y = t * 0.018 + target.current[0] * 0.09
    pointsRef.current.rotation.x = t * 0.009 + target.current[1] * 0.06
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// R3F 9.x uses THREE.Clock internally; suppress the three.js deprecation warning
// until R3F updates to THREE.Timer
if (typeof window !== 'undefined') {
  const _warn = console.warn.bind(console)
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].startsWith('THREE.Clock')) return
    _warn(...args)
  }
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
