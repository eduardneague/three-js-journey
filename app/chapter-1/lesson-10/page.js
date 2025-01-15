"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = canvasRef.current;

    const loadingManager = new THREE.LoadingManager();

    loadingManager.onStart = () => {};

    loadingManager.onLoad = () => {
      console.log("load");
    };

    loadingManager.onProgress = () => {};

    loadingManager.onError = () => {};

    const textureLoader = new THREE.TextureLoader(loadingManager);

    const colorTexture = textureLoader.load("/textures/minecraft.png");
    const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
    const heightTexture = textureLoader.load("/textures/door/height.jpg");
    const normalTexture = textureLoader.load("/textures/door/normal.jpg");
    const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
    const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
    const ambientOcclusionTexture = textureLoader.load(
      "/textures/door/ambientOcclusion.jpg"
    );

    colorTexture.colorSpace = THREE.SRGBColorSpace;
    alphaTexture.colorSpace = THREE.SRGBColorSpace;
    heightTexture.colorSpace = THREE.SRGBColorSpace;
    normalTexture.colorSpace = THREE.SRGBColorSpace;
    roughnessTexture.colorSpace = THREE.SRGBColorSpace;
    metalnessTexture.colorSpace = THREE.SRGBColorSpace;
    ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;

    colorTexture.magFilter = THREE.NearestFilter;
    colorTexture.minFilter = THREE.NearestFilter;
    colorTexture.generateMipmaps = false;

    /**
     * Object
     */
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: colorTexture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
    camera.position.z = 1;
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
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };

    tick();

    return () => {
      // Clean up resources when component unmounts
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">Textures</h1>
      <p>Chapter 1 - Lesson 10</p>
      <canvas
        ref={canvasRef}
        style={{ width: "800px", height: "600px" }}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
      ></canvas>
    </main>
  );
}
