'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function MacBook() {
  const groupRef = useRef<THREE.Group>(null)
  const screenGlow = useRef<THREE.PointLight>(null)
  const mouse  = useRef([0, 0])
  const smooth = useRef([0, 0])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth  - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  useFrame(({ clock }) => {
    smooth.current[0] += (mouse.current[0] - smooth.current[0]) * 0.05
    smooth.current[1] += (mouse.current[1] - smooth.current[1]) * 0.05

    if (groupRef.current) {
      groupRef.current.rotation.y = smooth.current[0] * 0.45
      groupRef.current.rotation.x = smooth.current[1] * 0.14 - 0.05
    }
    if (screenGlow.current) {
      screenGlow.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 1.6) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.35}>
        <group>

          {/* ── BASE ───────────────────────────────── */}
          <RoundedBox args={[3.0, 0.052, 2.05]} radius={0.045} smoothness={5} position={[0, 0, 0]}>
            <meshPhysicalMaterial color="#1d1d1f" metalness={0.96} roughness={0.16} clearcoat={0.6} clearcoatRoughness={0.1} />
          </RoundedBox>

          {/* keyboard deck (top face, subtle recess) */}
          <RoundedBox args={[2.62, 0.003, 1.55]} radius={0.02} smoothness={4} position={[0, 0.028, -0.1]}>
            <meshPhysicalMaterial color="#161616" metalness={0.7} roughness={0.35} />
          </RoundedBox>

          {/* trackpad */}
          <RoundedBox args={[0.82, 0.002, 0.52]} radius={0.025} smoothness={4} position={[0, 0.028, 0.72]}>
            <meshPhysicalMaterial color="#111" metalness={0.75} roughness={0.22} clearcoat={0.8} />
          </RoundedBox>

          {/* Touch ID bar (right edge of keyboard zone) */}
          <RoundedBox args={[0.1, 0.003, 0.09]} radius={0.01} smoothness={4} position={[1.16, 0.028, -0.62]}>
            <meshPhysicalMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
          </RoundedBox>

          {/* ── SCREEN assembly ─────────────────────── */}
          {/* hinge pivot at back top edge */}
          <group position={[0, 0.026, -1.025]}>
            <group rotation={[-1.18, 0, 0]}>

              {/* lid outer */}
              <RoundedBox args={[3.0, 2.05, 0.044]} radius={0.045} smoothness={5} position={[0, 1.025, 0]}>
                <meshPhysicalMaterial color="#1d1d1f" metalness={0.96} roughness={0.16} clearcoat={0.6} clearcoatRoughness={0.1} />
              </RoundedBox>

              {/* bezel / inner face */}
              <mesh position={[0, 1.025, 0.023]}>
                <planeGeometry args={[2.96, 2.01]} />
                <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
              </mesh>

              {/* display */}
              <mesh position={[0, 1.01, 0.025]}>
                <planeGeometry args={[2.6, 1.68]} />
                <meshStandardMaterial
                  color="#000c16"
                  emissive="#22c55e"
                  emissiveIntensity={0.52}
                  roughness={0.15}
                />
              </mesh>

              {/* screen glow light */}
              <pointLight ref={screenGlow} position={[0, 1.0, 0.6]} color="#22c55e" intensity={1.4} distance={4.5} />

              {/* webcam dot */}
              <mesh position={[0, 1.98, 0.024]}>
                <circleGeometry args={[0.022, 16]} />
                <meshStandardMaterial color="#111" roughness={0.6} />
              </mesh>

              {/* Apple logo — glowing ring on back */}
              <mesh position={[0, 1.0, -0.023]} rotation={[0, Math.PI, 0]}>
                <ringGeometry args={[0.13, 0.155, 48]} />
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.55} />
              </mesh>

            </group>
          </group>

          {/* hinge bar */}
          <mesh position={[0, 0.032, -1.015]}>
            <boxGeometry args={[2.7, 0.03, 0.04]} />
            <meshPhysicalMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
          </mesh>

        </group>
      </Float>

      {/* ground shadow */}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.55}
        blur={2.8}
        far={2.5}
        color="#000000"
      />
    </group>
  )
}

export default function HeroObject() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 3.8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Environment preset="city" />
      <ambientLight intensity={0.08} />
      <pointLight position={[-4, 4, 3]} intensity={1.2} color="#ffffff" />
      <MacBook />
    </Canvas>
  )
}
