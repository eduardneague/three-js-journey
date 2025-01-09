"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    const sizes = {
      width: 800,
      height: 600,
    };
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 3, 3, 3),
      new THREE.MeshBasicMaterial({ color: "white", wireframe: true })
    );
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

    camera.position.z = 2;
    camera.lookAt(mesh.position);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock();

    const cursor = {
      x: 0,
      y: 0,
    };

    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    });

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    // controls.target.y = 1;
    // controls.update();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // camera.position.x = cursor.x * 8;
      // camera.position.y = cursor.y * 3;
      // camera.lookAt(mesh.position);

      // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
      // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
      // camera.position.y = cursor.y * 5;
      // camera.lookAt(mesh.position);

      mesh.rotation.x = elapsedTime;
      mesh.rotation.y = elapsedTime;

      mesh.rotation.y = elapsedTime;
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
      <h1 className="text-2xl font-bold">Cameras</h1>
      <p>Chapter 1 - Lesson 6</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
