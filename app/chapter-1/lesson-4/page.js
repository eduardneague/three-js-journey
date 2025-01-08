"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    const axisHelper = new THREE.AxesHelper(5);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const geomtery2 = new THREE.SphereGeometry(1, 20, 10);
    const geomtery3 = new THREE.ConeGeometry(0.5, 3, 5, 5);
    const material = new THREE.MeshBasicMaterial({
      color: "lightblue",
      wireframe: true,
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: "lightpink",
      wireframe: true,
    });
    const material3 = new THREE.MeshBasicMaterial({
      color: "lightgreen",
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    const mesh2 = new THREE.Mesh(geomtery2, material2);
    const mesh3 = new THREE.Mesh(geomtery3, material3);

    const group = new THREE.Group();

    const mesh4 = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.6, 0.15, 50, 5),
      new THREE.MeshBasicMaterial({ color: "lightyellow", wireframe: true })
    );

    group.add(mesh, mesh2, mesh3, mesh4);

    mesh.rotation.reorder("XYZ");
    mesh.position.set(0.43, 0, 0.45);
    mesh.rotation.set(0.3, 2.4, 1);
    mesh.scale.set(1.2, 1, 2.5);

    mesh2.position.set(0.43, 1.5, 0.45);
    mesh2.scale.set(0.5, 0.5, 0.5);

    mesh3.lookAt(mesh2.position);
    mesh3.position.set(2, 0.1, 0.1);

    mesh4.position.set(-2, 0, 0);

    group.position.set(0, 0, 0);

    scene.add(group);
    scene.add(axisHelper);

    const sizes = {
      width: 800,
      height: 600,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(0.3, 0.2, 4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    return () => {
      //   renderer.dispose();
      //   geometry.dispose();
      //   material.dispose();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">Transform Objects</h1>
      <p>Chapter 1 - Lesson 4</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
