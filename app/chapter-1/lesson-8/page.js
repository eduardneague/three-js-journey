"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: "white",
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 20),
      new THREE.MeshBasicMaterial({
        color: "lightpink",
        wireframe: true,
      })
    );

    const BufferGeometry = new THREE.BufferGeometry();

    const triangleCount = 50;
    const positionsArray = new Float32Array(triangleCount * 3 * 3);

    for (let i = 0; i < positionsArray.length; i++) {
      positionsArray[i] = Math.random() - 0.5;
    }

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
    BufferGeometry.setAttribute("position", positionsAttribute);

    const mesh3 = new THREE.Mesh(
      BufferGeometry,
      new THREE.MeshBasicMaterial({
        color: "lightblue",
        wireframe: true,
      })
    );

    const group = new THREE.Group();
    group.add(mesh, mesh2, mesh3);
    scene.add(group);

    mesh3.position.set(2, 0, 0);
    mesh2.position.set(0, -2, 3);

    // Sizes
    const sizes = {
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    };

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 10;
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      //   renderer.dispose();
      //   geometry.dispose();
      //   material.dispose();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">Geometries</h1>
      <p>Chapter 1 - Lesson 8</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
