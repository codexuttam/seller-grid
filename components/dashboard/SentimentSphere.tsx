"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.1;
            meshRef.current.rotation.y = time * 0.15;
        }
        if (outerRef.current) {
            outerRef.current.rotation.x = -time * 0.05;
            outerRef.current.rotation.y = -time * 0.1;
        }
    });

    return (
        <group>
            <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
                <Sphere ref={meshRef} args={[1, 100, 100]}>
                    <MeshDistortMaterial
                        color="#4f46e5"
                        distort={0.4}
                        speed={4}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={outerRef} args={[1.2, 100, 100]}>
                    <MeshDistortMaterial
                        color="#818cf8"
                        distort={0.3}
                        speed={3}
                        transparent
                        opacity={0.1}
                        wireframe
                    />
                </Sphere>
            </Float>
        </group>
    );
}

export default function SentimentSphere() {
    return (
        <div className="h-full w-full relative">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} color="#6366f1" intensity={1} />
                <AnimatedSphere />
            </Canvas>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <div className="relative inline-block">
                        <span className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full" />
                        <h2 className="relative text-7xl font-black tracking-tighter text-white">84%</h2>
                    </div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] mt-4 opacity-80">Aggregate Positive Rating</p>
                </div>
            </div>
        </div>
    );
}
