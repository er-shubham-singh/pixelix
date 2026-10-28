import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TerracottaOrbitCanvas({ className = "w-48 h-48" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Terracotta C-shaped / Torus Orbit
    const orbitGeometry = new THREE.TorusGeometry(1.4, 0.35, 24, 60, Math.PI * 1.7);
    const orbitMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xC84523,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
    });
    const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
    group.add(orbitMesh);

    // Golden Pixel Spark in the center (Cube with beveled appearance)
    const sparkGeometry = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const sparkMaterial = new THREE.MeshStandardMaterial({
      color: 0xE9C46A,
      roughness: 0.2,
      metalness: 0.6,
      emissive: 0xD4A373,
      emissiveIntensity: 0.4
    });
    const sparkMesh = new THREE.Mesh(sparkGeometry, sparkMaterial);
    group.add(sparkMesh);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xFFFBF7, 2.5);
    light1.position.set(4, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xF4A261, 2, 8);
    light2.position.set(-3, -2, 2);
    scene.add(light2);

    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      group.rotation.x = 0.2 + Math.sin(time * 0.8) * 0.15;
      group.rotation.y = time * 0.75;
      
      sparkMesh.rotation.x = time * -1.2;
      sparkMesh.rotation.y = time * 1.4;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      sparkGeometry.dispose();
      sparkMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
