import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSunsetScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5.8;

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    currentMount.appendChild(renderer.domElement);

    // Main animated group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core: Luminous Translucent Sunset Orb
    const sphereGeo = new THREE.IcosahedronGeometry(1.45, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xD9532F), // Vibrant Terracotta
      emissive: new THREE.Color(0x9E2A0E),
      emissiveIntensity: 0.35,
      roughness: 0.18,
      metalness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transmission: 0.3,
      thickness: 1.4,
      reflectivity: 0.95,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(coreSphere);

    // 2. Inner Glowing 4-Point Star Core (Signature Aperture as in Reference 1)
    const starGeo = new THREE.OctahedronGeometry(0.55, 0);
    const starMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xFFF9EE),
      wireframe: false
    });
    const innerStar = new THREE.Mesh(starGeo, starMat);
    mainGroup.add(innerStar);

    // Secondary subtle star glow wire
    const starWireGeo = new THREE.OctahedronGeometry(0.72, 0);
    const starWireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xF4A261),
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const starWire = new THREE.Mesh(starWireGeo, starWireMat);
    mainGroup.add(starWire);

    // 3. Concentric Orbit Rings (Inspired by Reference 1 & Logo Concept 03)
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.045, 24, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xE9C46A), // Sun gold
      roughness: 0.25,
      metalness: 0.8,
      emissive: new THREE.Color(0x735700),
      emissiveIntensity: 0.2
    });
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitRing1);

    const ringGeo2 = new THREE.TorusGeometry(2.45, 0.035, 24, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x7F9C8D), // Sage accent
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.75
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.y = Math.PI / 4;
    orbitRing2.rotation.z = Math.PI / 6;
    mainGroup.add(orbitRing2);

    const ringGeo3 = new THREE.TorusGeometry(1.85, 0.025, 20, 80);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xC84523),
      transparent: true,
      opacity: 0.5
    });
    const orbitRing3 = new THREE.Mesh(ringGeo3, ringMat3);
    orbitRing3.rotation.x = -Math.PI / 4;
    mainGroup.add(orbitRing3);

    // 4. Orbital Satellites / Ecosystem Nodes (Amazon, Shopify, Web, AI, Brand, Campaigns)
    const nodeGroup = new THREE.Group();
    mainGroup.add(nodeGroup);

    const nodeColors = [
      0xF4A261, // Sunset amber (Marketplace)
      0xE9C46A, // Gold (Brand)
      0x7F9C8D, // Sage (Web)
      0xFFFFFF, // Core White (AI)
      0xD9532F, // Terracotta (Campaigns)
    ];

    const nodeMeshes = [];
    nodeColors.forEach((col, idx) => {
      const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(col) });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      
      const angle = (idx / nodeColors.length) * Math.PI * 2;
      const radius = 2.1;
      nodeMesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * Math.cos(Math.PI / 3) * radius,
        Math.sin(angle) * Math.sin(Math.PI / 3) * radius
      );
      nodeGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    });

    // 5. Golden Bloom Pixel Sparks
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const warmPalette = [
      new THREE.Color(0xE9C46A), // Gold
      new THREE.Color(0xF4A261), // Peach
      new THREE.Color(0xC84523), // Terracotta
      new THREE.Color(0xFFF7ED)  // White
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = warmPalette[Math.floor(Math.random() * warmPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 6. Balanced Atmospheric Lights
    const ambientLight = new THREE.AmbientLight(0xFFF7ED, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xF4A261, 2.6);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7F9C8D, 1.8);
    rimLight.position.set(-4, -3, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xD9532F, 3.2, 8);
    pointLight.position.set(0, 0, 1.8);
    scene.add(pointLight);

    // Mouse / Touch Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };

    const handlePointerMove = (clientX, clientY) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.45;
    };

    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    currentMount.addEventListener('touchmove', onTouchMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mainGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.3) * 0.08;
      mainGroup.rotation.y = currentRotationY + elapsedTime * 0.22;

      // Independent Star Core Counter-Rotation & Pulse
      innerStar.rotation.y = -elapsedTime * 0.8;
      innerStar.rotation.z = elapsedTime * 0.5;
      const starScale = 1 + Math.sin(elapsedTime * 2.5) * 0.12;
      innerStar.scale.set(starScale, starScale, starScale);

      starWire.rotation.x = elapsedTime * 0.6;
      starWire.rotation.y = elapsedTime * 0.4;

      // Independent ring counter-rotations
      orbitRing1.rotation.z = elapsedTime * 0.35;
      orbitRing2.rotation.x = elapsedTime * -0.25;
      orbitRing3.rotation.y = elapsedTime * 0.4;
      nodeGroup.rotation.z = elapsedTime * 0.2;
      particles.rotation.y = elapsedTime * 0.06;

      // Subtle breathing scale
      const breath = 1 + Math.sin(elapsedTime * 1.6) * 0.015;
      coreSphere.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount) {
        currentMount.removeEventListener('touchmove', onTouchMove);
      }
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      starWireGeo.dispose();
      starWireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[350px] lg:h-[420px] flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-terracotta-400/25 via-gold-sun/15 to-transparent blur-3xl pointer-events-none -z-10" />
      
      {/* Three.js Canvas container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating 3D Badge Overlay */}
      <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 ios-glass-pill px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] font-medium text-espresso-700 dark:text-cream-200 flex items-center gap-1.5 pointer-events-none shadow-xs backdrop-blur-md z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 animate-ping inline-block" />
        <span>3D Ecosystem Hub</span>
      </div>
    </div>
  );
}
