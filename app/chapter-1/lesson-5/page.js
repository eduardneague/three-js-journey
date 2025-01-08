"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: "white",
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const meshGroup = new THREE.Group();

    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 10, 10),
      new THREE.MeshBasicMaterial({
        color: "lightpink",
        wireframe: true,
      })
    );

    const mesh3 = new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 1, 10),
      new THREE.MeshBasicMaterial({
        color: "lightgreen",
        wireframe: true,
      })
    );

    meshGroup.add(mesh, mesh2, mesh3);
    scene.add(meshGroup);

    const sizes = {
      width: 800,
      height: 600,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    // clock

    gsap.to(mesh.position, { duraiton: 1, delay: 1, x: 2 });
    gsap.to(mesh.position, { duraiton: 1, delay: 2, x: 0 });

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      console.log(elapsedTime);

      mesh.rotation.x = elapsedTime;
      mesh.rotation.y = elapsedTime;
      mesh.position.y = Math.tan(elapsedTime);
      mesh.position.x = Math.sin(elapsedTime);

      mesh2.rotation.x = elapsedTime;
      mesh2.rotation.y = elapsedTime;
      mesh2.position.x = Math.sin(elapsedTime);
      mesh2.position.z = Math.cos(elapsedTime);

      mesh3.rotation.x = elapsedTime;
      mesh3.rotation.y = elapsedTime;
      mesh3.position.x = Math.cos(elapsedTime);
      mesh3.position.z = Math.cos(elapsedTime);

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
      <h1 className="text-2xl font-bold">Animations</h1>
      <p>Chapter 1 - Lesson 5</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
