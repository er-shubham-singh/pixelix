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
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    currentMount.appendChild(renderer.domElement);

    // Group for animated elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core Sphere (Sunset Pixel - Soft Dimensional Edge)
    const sphereGeo = new THREE.IcosahedronGeometry(1.6, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xD9532F), // Terracotta vibrant
      emissive: new THREE.Color(0x8E2C14),
      emissiveIntensity: 0.25,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transmission: 0.15,
      thickness: 1.2,
      reflectivity: 0.9,
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(coreSphere);

    // 2. Terracotta Orbit Ring (Logo Concept 03)
    const ringGeo = new THREE.TorusGeometry(2.35, 0.08, 32, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xD4A373), // Muted gold
      roughness: 0.3,
      metalness: 0.7,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitRing1);

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.05, 32, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x7F9C8D), // Sage accent
      roughness: 0.4,
      metalness: 0.5,
      transparent: true,
      opacity: 0.7
    });
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.y = Math.PI / 4;
    orbitRing2.rotation.z = Math.PI / 6;
    mainGroup.add(orbitRing2);

    // 3. Pixel Sparks (Golden Horizon & Bloom particles)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const warmPalette = [
      new THREE.Color(0xE9C46A), // Sun gold
      new THREE.Color(0xF4A261), // Warm peach
      new THREE.Color(0xC84523), // Terracotta
      new THREE.Color(0xFFF7ED)  // Cream white
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 2.5;
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
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Lighting (Warm sunset directional + cool sage rim)
    const ambientLight = new THREE.AmbientLight(0xFFF7ED, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xF4A261, 2.5);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x7F9C8D, 1.8);
    rimLight.position.set(-5, -3, -2);
    scene.add(rimLight);

    const warmPoint = new THREE.PointLight(0xD9532F, 3, 10);
    warmPoint.position.set(0, 0, 2);
    scene.add(warmPoint);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.45;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
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
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mainGroup.rotation.x = currentRotationX + Math.sin(elapsedTime * 0.3) * 0.1;
      mainGroup.rotation.y = currentRotationY + elapsedTime * 0.25;

      // Independent ring counter-rotations
      orbitRing1.rotation.z = elapsedTime * 0.4;
      orbitRing2.rotation.x = elapsedTime * -0.3;
      particles.rotation.y = elapsedTime * 0.08;

      // Breathing scale
      const breath = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      coreSphere.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] md:h-[560px] flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-terracotta-400/20 via-gold-sun/10 to-transparent blur-3xl pointer-events-none -z-10" />
      
      {/* Three.js Canvas container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating 3D Badge Overlay */}
      <div className="absolute bottom-4 right-4 glass-card px-4 py-2 rounded-full text-xs font-medium text-espresso-800 flex items-center gap-2 pointer-events-none shadow-soft">
        <span className="w-2.5 h-2.5 rounded-full bg-terracotta-500 animate-ping inline-block" />
        <span>Interactive 3D Sunset Pixel</span>
      </div>
    </div>
  );
}
