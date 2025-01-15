"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gui = new GUI();

    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    const textureLoader = new THREE.TextureLoader();

    // Texture loading remains the same
    const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
    const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
    const doorAmbientOcclusionTexture = textureLoader.load(
      "/textures/door/ambientOcclusion.jpg"
    );
    const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
    const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
    const doorMetalnessTexture = textureLoader.load(
      "/textures/door/metalness.jpg"
    );
    const doorRoughnessTexture = textureLoader.load(
      "/textures/door/roughness.jpg"
    );
    const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
    const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

    doorColorTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.colorSpace = THREE.SRGBColorSpace;

    /**
     * Environment map
     */
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
      environmentMap.mapping = THREE.EquirectangularReflectionMapping;

      // Set the environment map globally for the scene
      scene.environment = environmentMap;
      scene.background = environmentMap;

      // Apply the environment map to the material
      material.envMap = environmentMap;
      material.needsUpdate = true;
    });

    /**
     * MeshPhysicalMaterial
     */
    const material = new THREE.MeshPhysicalMaterial();
    material.metalness = 1;
    material.roughness = 0;
    material.transmission = 1;
    material.ior = 1.5;
    material.thickness = 0.5;
    material.side = THREE.DoubleSide;

    // Adjusting environment map intensity through the GUI
    gui.add(material, "metalness").min(0).max(1).step(0.0001);
    gui.add(material, "roughness").min(0).max(1).step(0.0001);
    gui.add(material, "transmission").min(0).max(1).step(0.0001);
    gui.add(material, "ior").min(1).max(10).step(0.0001);
    gui.add(material, "thickness").min(0).max(1).step(0.0001);

    // Objects
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      material
    );
    sphere.position.x = -1.5;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 100, 100),
      material
    );

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 64, 128),
      material
    );
    torus.position.x = 1.5;

    scene.add(sphere, plane, torus);

    /**
     * Sizes
     */
    const sizes = {
      width: 800,
      height: 600,
    };

    /**
     * Camera
     */
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.1 * elapsedTime;
      plane.rotation.y = 0.1 * elapsedTime;
      torus.rotation.y = 0.1 * elapsedTime;

      sphere.rotation.x = -0.15 * elapsedTime;
      plane.rotation.x = -0.15 * elapsedTime;
      torus.rotation.x = -0.15 * elapsedTime;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">Materials</h1>
      <p>Chapter 1 - Lesson 11</p>
      <canvas
        ref={canvasRef}
        style={{ width: "800px", height: "600px" }}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
