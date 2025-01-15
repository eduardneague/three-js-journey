"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    // Initialize GUI
    const gui = new GUI({ width: 300 });
    const debugObject = {
      color: "#76ec36",
      spin: () => {
        gsap.to(mesh.rotation, {
          duration: 1,
          y: mesh.rotation.y + Math.PI * 2,
        });
      },
      subdivision: 2,
    };

    // Create sphere geometry and material
    const geometry = new THREE.SphereGeometry(1, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: debugObject.color,
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // GUI: Sphere tweaks
    const sphereTweaks = gui.addFolder("Sphere Tweaks");
    sphereTweaks.open();

    const positionTweaks = sphereTweaks.addFolder("Position");
    positionTweaks.add(mesh.position, "x", -3, 3, 0.01).name("X-axis");
    positionTweaks.add(mesh.position, "y", -3, 3, 0.01).name("Y-axis");
    positionTweaks.add(mesh.position, "z", -3, 3, 0.01).name("Z-axis");

    const materialTweaks = sphereTweaks.addFolder("Material");
    materialTweaks.add(mesh, "visible").name("Visibility");
    materialTweaks.add(material, "wireframe").name("Wireframe");
    materialTweaks
      .addColor(debugObject, "color")
      .onChange((value) => material.color.set(value))
      .name("Color");

    const animationTweaks = sphereTweaks.addFolder("Animations");
    animationTweaks.add(debugObject, "spin").name("Spin");

    materialTweaks
      .add(debugObject, "subdivision", 1, 20, 1)
      .onFinishChange((value) => {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.SphereGeometry(1, 20, value);
      })
      .name("Subdivision");

    // Renderer and camera setup
    const sizes = { width: 800, height: 600 };
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(1, 1, 2);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const clock = new THREE.Clock();

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      // Cleanup
      gui.destroy();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">Debug UI</h1>
      <p>Chapter 1 - Lesson 9</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
        style={{ width: "800px", height: "600px" }}
      ></canvas>
    </main>
  );
}
