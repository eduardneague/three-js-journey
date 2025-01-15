"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

export default function Page1() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gui = new GUI();

    // Canvas
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();
    const fontLoader = new FontLoader();

    const axesHelper = new THREE.AxesHelper();
    // scene.add(axesHelper);

    const textureLoader = new THREE.TextureLoader();
    const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
    const matcapTexture2 = textureLoader.load("/textures/matcaps/2.png");
    const matcapTexture3 = textureLoader.load("/textures/matcaps/3.png");
    const matcapTexture4 = textureLoader.load("/textures/matcaps/4.png");
    const matcapTexture5 = textureLoader.load("/textures/matcaps/5.png");
    const matcapTexture6 = textureLoader.load("/textures/matcaps/6.png");
    const matcapTexture7 = textureLoader.load("/textures/matcaps/7.png");
    const matcapTexture8 = textureLoader.load("/textures/matcaps/8.png");

    matcapTexture.colorSpace = THREE.SRGBColorSpace;

    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const geo = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

      const mat = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
      const mat2 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture2 });
      const mat3 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture3 });
      const mat4 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture4 });
      const mat5 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture5 });
      const mat6 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture6 });
      const mat7 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture7 });
      const mat8 = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 });

      const materials = [mat, mat2, mat3, mat4, mat5, mat6, mat7, mat8];

      const textGeometry = new TextGeometry("escalapreta", {
        font: font,
        size: 0.5,
        depth: 0.2,
        curveSegments: 150,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });
      console.log(Math.floor(Math.random() * materials.length));
      textGeometry.computeBoundingBox();
      textGeometry.center();
      const textMaterial = new THREE.MeshMatcapMaterial({
        transparent: false,
        opacity: 0.5,
        metalness: 1,
        roughness: 0.2,
        color: "white",
        wireframe: false,
        matcap: materials[Math.floor(Math.random() * materials.length)].matcap, // random one here.
      });
      const text = new THREE.Mesh(textGeometry, textMaterial);
      scene.add(text);

      for (let i = 0; i < 300; i++) {
        const randomNumber = Math.floor(Math.random() * 8);
        const donut = new THREE.Mesh(geo, materials[randomNumber]);
        donut.position.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        );

        donut.rotation.set(
          (Math.random() - 0.5) * Math.PI,
          (Math.random() - 0.5) * Math.PI,
          (Math.random() - 0.5) * Math.PI
        );

        // donut.scale.set(Math.random(), Math.random(), Math.random());

        scene.add(donut);
      }
    });

    /**
     * Object
     */
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({
        transparent: true,
        opacity: 0.5,
        color: "green",
      })
    );

    // scene.add(cube);

    /**
     * Sizes
     */
    const sizes = {
      width: 800,
      height: 600,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = 800; // Fixed width
      sizes.height = 600; // Fixed height

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
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

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      // renderer.dispose();
      // geometry.dispose();
      // material.dispose();
    };
  }, []);

  return (
    <main className="pt-[2rem]">
      <h1 className="text-2xl font-bold">3D Text</h1>
      <p>Chapter 1 - Lesson 12</p>
      <canvas
        ref={canvasRef}
        className="webgl border border-gray-300 shadow-lg mt-[2rem]"
        style={{ width: "800px", height: "600px" }} // Fixed canvas size
      ></canvas>
    </main>
  );
}
