"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    return () => {
      //   renderer.dispose();
      //   geometry.dispose();
      //   material.dispose();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">Cameras</h1>
      <p>Chapter 1 - Lesson 5</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
