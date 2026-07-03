import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./HeroScene.css";

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xfff8f0, 0.6);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xfff3e0, 1.8);
    dirLight.position.set(4, 6, 5);
    scene.add(dirLight);
    const pointLight1 = new THREE.PointLight(0xa8804e, 1.2, 20);
    pointLight1.position.set(-4, 2, 3);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.6, 15);
    pointLight2.position.set(3, -2, 4);
    scene.add(pointLight2);

    // Materials
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x131110, roughness: 0.6, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x1c2438, roughness: 0.5, metalness: 0.15 }),
      new THREE.MeshStandardMaterial({ color: 0x5c1626, roughness: 0.65, metalness: 0.05 }),
      new THREE.MeshStandardMaterial({ color: 0xa8804e, roughness: 0.4, metalness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0x2a3020, roughness: 0.7, metalness: 0.05 }),
    ];

    // Create jacket-like shapes (abstracted geometric forms)
    function createJacket(matIndex) {
      const group = new THREE.Group();

      // Body
      const bodyGeo = new THREE.BoxGeometry(1.0, 1.4, 0.18, 2, 2, 2);
      const body = new THREE.Mesh(bodyGeo, materials[matIndex]);
      group.add(body);

      // Left shoulder/sleeve
      const sleeveL = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.85, 0.16),
        materials[matIndex]
      );
      sleeveL.position.set(-0.64, 0.2, 0);
      sleeveL.rotation.z = 0.12;
      group.add(sleeveL);

      // Right shoulder/sleeve
      const sleeveR = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.85, 0.16),
        materials[matIndex]
      );
      sleeveR.position.set(0.64, 0.2, 0);
      sleeveR.rotation.z = -0.12;
      group.add(sleeveR);

      // Lapel left
      const lapelL = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.5, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xa8804e, roughness: 0.3, metalness: 0.4 })
      );
      lapelL.position.set(-0.2, 0.45, 0.1);
      lapelL.rotation.z = 0.22;
      group.add(lapelL);

      // Lapel right
      const lapelR = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.5, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xa8804e, roughness: 0.3, metalness: 0.4 })
      );
      lapelR.position.set(0.2, 0.45, 0.1);
      lapelR.rotation.z = -0.22;
      group.add(lapelR);

      // Button (gold)
      const btnGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 16);
      const btnMat = new THREE.MeshStandardMaterial({ color: 0xc9a96e, metalness: 0.9, roughness: 0.1 });
      [-0.2, 0, 0.2].forEach((y) => {
        const btn = new THREE.Mesh(btnGeo, btnMat);
        btn.position.set(0, y, 0.1);
        btn.rotation.x = Math.PI / 2;
        group.add(btn);
      });

      return group;
    }

    // Place 5 floating jackets
    const jackets = [];
    const positions = [
      [-2.4, 0.5, -1],
      [-0.8, -0.4, 0.5],
      [0.9, 0.7, 0],
      [2.5, -0.3, -0.8],
      [-0.2, -1.4, -0.5],
    ];
    const scales = [0.7, 1.0, 0.85, 0.75, 0.65];
    const speeds = [0.42, 0.28, 0.36, 0.22, 0.48];
    const phases = [0, 1.2, 2.4, 0.8, 3.1];

    positions.forEach((pos, i) => {
      const jacket = createJacket(i % materials.length);
      jacket.position.set(...pos);
      jacket.scale.setScalar(scales[i]);
      jacket.rotation.y = (i * 0.6) - 0.8;
      scene.add(jacket);
      jackets.push({ mesh: jacket, speed: speeds[i], phase: phases[i], baseY: pos[1] });
    });

    // Particle field (gold dust)
    const particleCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const positions3 = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions3[i] = (Math.random() - 0.5) * 16;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions3, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xa8804e, size: 0.03, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    function onMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      jackets.forEach(({ mesh, speed, phase, baseY }) => {
        mesh.position.y = baseY + Math.sin(t * speed + phase) * 0.18;
        mesh.rotation.y += 0.003;
        mesh.rotation.x = Math.sin(t * speed * 0.4 + phase) * 0.06;
      });

      // Subtle camera sway on mouse
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 0.2 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      particles.rotation.y = t * 0.015;

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    function onResize() {
      const W2 = mount.clientWidth;
      const H2 = mount.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" />;
}
