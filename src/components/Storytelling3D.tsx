import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper to create ornate orange leather cover texture with golden baroque filigree (matching user reference)
function createOrnateOrangeCoverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1360;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Rich vibrant Orange Leather Background
  const bgGrad = ctx.createRadialGradient(512, 680, 80, 512, 680, 720);
  bgGrad.addColorStop(0, '#fb923c');   // Luminous warm orange
  bgGrad.addColorStop(0.45, '#f97316'); // Brand orange
  bgGrad.addColorStop(0.85, '#ea580c'); // Deep burnt orange
  bgGrad.addColorStop(1, '#9a3412');    // Rich leather edge
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle leather texture noise
  ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
  for (let i = 0; i < 5000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // 2. Embossed Golden Filigree Borders
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 4;

  // Outer primary gold border
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 8;
  ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76);

  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

  // Inner decorative gold border
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 5;
  ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

  // Pinstripe accent line
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(82, 82, canvas.width - 164, canvas.height - 164);

  // 3. Ornate Golden Corner Protectors with Leaf & Scroll Filigree
  const drawCorner = (cx: number, cy: number, rot: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    // Corner triangle gold plate
    ctx.fillStyle = '#eab308';
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(135, 0);
    ctx.quadraticCurveTo(90, 45, 45, 90);
    ctx.lineTo(0, 135);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Filigree swirl inside corner
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(42, 42, 22, 0, Math.PI * 1.5);
    ctx.stroke();

    // Rivet dots
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(24, 24, 6, 0, Math.PI * 2);
    ctx.arc(80, 18, 5, 0, Math.PI * 2);
    ctx.arc(18, 80, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  drawCorner(38, 38, 0);
  drawCorner(canvas.width - 38, 38, Math.PI / 2);
  drawCorner(canvas.width - 38, canvas.height - 38, Math.PI);
  drawCorner(38, canvas.height - 38, -Math.PI / 2);

  // 4. Ornate Center Baroque Mandala Medallion (Direct match to reference image)
  const mx = canvas.width / 2;
  const my = canvas.height / 2;

  // Draw 8 symmetrical baroque filigree petals
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(angle);

    // Outer Petal
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3.5;

    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.bezierCurveTo(55, -100, 95, -180, 0, -250);
    ctx.bezierCurveTo(-95, -180, -55, -100, 0, -35);
    ctx.fill();
    ctx.stroke();

    // Inner petal highlight
    ctx.strokeStyle = '#fef9c3';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.quadraticCurveTo(25, -145, 0, -220);
    ctx.stroke();

    // Side scrolls / leaves
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(40, -135, 26, 0, Math.PI);
    ctx.stroke();

    ctx.restore();
  }

  // Medallion Central Rosette (Seamless ornate gold & black engraving - white diamond removed)
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(mx, my, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Inner gold filigree ring & core
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(mx, my, 26, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(mx, my, 8, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper to create procedural butterfly wing texture
function createButterflyWingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 512, 512);

  // Outer wing gradient: Vibrant Monarch Orange to Amber Gold
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 260);
  grad.addColorStop(0, '#ffaa00');
  grad.addColorStop(0.35, '#f97316');
  grad.addColorStop(0.75, '#ea580c');
  grad.addColorStop(1, '#9a3412');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(80, 460);
  ctx.bezierCurveTo(40, 320, 30, 180, 140, 70);
  ctx.bezierCurveTo(240, -10, 440, 30, 480, 150);
  ctx.bezierCurveTo(500, 250, 420, 380, 320, 440);
  ctx.bezierCurveTo(220, 480, 140, 480, 80, 460);
  ctx.closePath();
  ctx.fill();

  // Dark wing veins
  ctx.strokeStyle = 'rgba(20, 10, 5, 0.78)';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  const veins = [
    [[140, 420], [220, 300], [320, 220], [440, 160]],
    [[140, 420], [240, 340], [380, 280], [460, 240]],
    [[140, 420], [200, 240], [260, 140], [330, 80]],
    [[140, 420], [170, 280], [180, 180], [210, 100]],
    [[240, 300], [290, 360], [370, 370]],
    [[220, 300], [280, 250], [380, 200]],
  ];

  veins.forEach((pts) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i][0], pts[i][1]);
    }
    ctx.stroke();
  });

  // Black wing border with white spots
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#18181b';
  ctx.stroke();

  // Scalloped white dots along border
  ctx.fillStyle = '#ffffff';
  const dots = [
    [450, 150], [430, 190], [410, 230], [380, 280], [340, 340],
    [300, 390], [250, 430], [200, 455], [150, 458]
  ];
  dots.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 4.5, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper to create dynamic book page texture with "Vabsgen" text
function createBookPageTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Soft cream/ivory background
  ctx.fillStyle = '#fbfaf8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle page border margin
  ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

  ctx.strokeStyle = 'rgba(217, 119, 6, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

  // Page Header
  ctx.fillStyle = '#78716c';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '6px';
  ctx.fillText('CHAPTER I — THE INCEPTION', canvas.width / 2, 160);

  // Decorative divider
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 80, 195);
  ctx.lineTo(canvas.width / 2 + 80, 195);
  ctx.stroke();

  // Divider center dot
  ctx.fillStyle = '#1c1917';
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 195, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Brand Name: "Vabsgen"
  ctx.fillStyle = '#1c1917';
  ctx.font = '900 108px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('Vabsgen', canvas.width / 2, 420);

  // Golden shimmer underline
  const grad = ctx.createLinearGradient(canvas.width / 2 - 160, 0, canvas.width / 2 + 160, 0);
  grad.addColorStop(0, '#f97316');
  grad.addColorStop(0.5, '#fbbf24');
  grad.addColorStop(1, '#f97316');
  ctx.strokeStyle = grad;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 140, 460);
  ctx.lineTo(canvas.width / 2 + 140, 460);
  ctx.stroke();

  // Elegant subtext paragraphs
  ctx.fillStyle = '#44403c';
  ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Empowering Intelligent Careers', canvas.width / 2, 540);

  ctx.fillStyle = '#78716c';
  ctx.font = '400 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '1px';
  ctx.fillText('Where talent meets infinite opportunity.', canvas.width / 2, 600);

  // Stylized text block lines
  const lines = [
    'A continuous journey from guided learning to career readiness.',
    'Bridging diagnostic skill gaps with conversational AI intelligence,',
    'real-time voice evaluations, and tailored recruitment pathways.'
  ];
  ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#a8a29e';
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, 700 + i * 44);
  });

  // Footer page number
  ctx.fillStyle = '#a8a29e';
  ctx.font = '500 22px monospace';
  ctx.fillText('• 01 •', canvas.width / 2, canvas.height - 100);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper to create soft circular particle glow sprite
function createGlowSprite(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.25, 'rgba(251, 146, 60, 0.85)');
  grad.addColorStop(0.6, 'rgba(249, 115, 22, 0.35)');
  grad.addColorStop(1, 'rgba(249, 115, 22, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Storytelling3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brandRevealRef = useRef<HTMLDivElement>(null);

  // Interactive scroll state
  const scrollProgress = useRef(0);
  const [showBrandText, setShowBrandText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3e6, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 2.6);
    dirLight.position.set(-2, 7, 5);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xf97316, 1.4);
    fillLight.position.set(5, -2, 3);
    scene.add(fillLight);

    // Dynamic point light tracking the butterfly
    const butterflyLight = new THREE.PointLight(0xff7700, 3.5, 6);
    scene.add(butterflyLight);

    // 3. Build 3D Realistic Ornate Orange Book (Matching Reference Image)
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Book dimensions
    const bookWidth = 1.95;
    const bookHeight = 2.5;
    const bookDepth = 0.24;

    // Materials
    const ornateOrangeCoverTexture = createOrnateOrangeCoverTexture();
    const ornateCoverMaterial = new THREE.MeshStandardMaterial({
      map: ornateOrangeCoverTexture,
      roughness: 0.32,
      metalness: 0.35
    });

    const pageBlockMaterial = new THREE.MeshStandardMaterial({
      color: 0xf6f3ea, // Ivory page block edge
      roughness: 0.8,
      metalness: 0.05
    });

    const openPageMaterial = new THREE.MeshStandardMaterial({
      map: createBookPageTexture(),
      roughness: 0.45,
      metalness: 0.08
    });

    // Book Base (Back cover)
    const baseCoverGeom = new THREE.BoxGeometry(bookWidth, bookHeight, 0.04);
    const baseCover = new THREE.Mesh(baseCoverGeom, ornateCoverMaterial);
    baseCover.position.set(0, 0, -bookDepth / 2);
    bookGroup.add(baseCover);

    // Internal Page block (thick realistic paper stack)
    const pageBlockGeom = new THREE.BoxGeometry(bookWidth * 0.96, bookHeight * 0.96, bookDepth * 0.85);
    const pageBlock = new THREE.Mesh(pageBlockGeom, pageBlockMaterial);
    pageBlock.position.set(0, 0, 0);
    bookGroup.add(pageBlock);

    // Book Right Page (revealed text page inside)
    const pageSurfaceGeom = new THREE.PlaneGeometry(bookWidth * 0.94, bookHeight * 0.94);
    const rightPageSurface = new THREE.Mesh(pageSurfaceGeom, openPageMaterial);
    rightPageSurface.position.set(0, 0, (bookDepth * 0.85) / 2 + 0.002);
    bookGroup.add(rightPageSurface);

    // Spine
    const spineGeom = new THREE.CylinderGeometry(bookDepth / 2, bookDepth / 2, bookHeight, 16, 1, false, -Math.PI / 2, Math.PI);
    const spine = new THREE.Mesh(spineGeom, ornateCoverMaterial);
    spine.rotation.z = Math.PI / 2;
    spine.position.set(-bookWidth / 2, 0, 0);
    bookGroup.add(spine);

    // Ornate Golden Binding Rings along spine (matching user's reference image)
    const ringCount = 12;
    const ringGeom = new THREE.TorusGeometry(0.065, 0.016, 12, 24, Math.PI * 1.5);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.22,
      metalness: 0.88
    });
    for (let r = 0; r < ringCount; r++) {
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      const yPos = -bookHeight / 2 + 0.18 + (r * (bookHeight - 0.36)) / (ringCount - 1);
      ringMesh.position.set(-bookWidth / 2 - 0.015, yPos, 0);
      ringMesh.rotation.y = Math.PI / 2;
      bookGroup.add(ringMesh);
    }

    // Front Cover (Hinged at left spine x = -bookWidth / 2)
    const frontCoverPivot = new THREE.Group();
    frontCoverPivot.position.set(-bookWidth / 2, 0, (bookDepth * 0.85) / 2);
    bookGroup.add(frontCoverPivot);

    const frontCoverMesh = new THREE.Mesh(baseCoverGeom, ornateCoverMaterial);
    frontCoverMesh.position.set(bookWidth / 2, 0, 0.02);
    frontCoverPivot.add(frontCoverMesh);

    // Turning Page (Dynamic curl effect with Plane segments)
    const turnPageWidth = bookWidth * 0.92;
    const turnPageHeight = bookHeight * 0.92;
    const turnPageGeom = new THREE.PlaneGeometry(turnPageWidth, turnPageHeight, 24, 4);
    const turnPageMat = new THREE.MeshStandardMaterial({
      color: 0xfbfaf8,
      roughness: 0.5,
      side: THREE.DoubleSide
    });
    const turnPagePivot = new THREE.Group();
    turnPagePivot.position.set(-bookWidth / 2 + 0.04, 0, (bookDepth * 0.85) / 2 + 0.004);
    bookGroup.add(turnPagePivot);

    const turnPageMesh = new THREE.Mesh(turnPageGeom, turnPageMat);
    turnPageMesh.position.set(turnPageWidth / 2, 0, 0);
    turnPagePivot.add(turnPageMesh);

    // Default book placement (starts lower down, rises on scroll)
    const isMobile = window.innerWidth < 768;
    const initialBookX = isMobile ? 0 : -2.1;
    const targetBookY = isMobile ? -0.3 : 0.05;
    bookGroup.position.set(initialBookX, -4.5, 0);
    bookGroup.rotation.set(0.35, 0.45, -0.1);

    // 4. Build 3D Realistic Orange Butterfly
    const butterflyGroup = new THREE.Group();
    scene.add(butterflyGroup);

    const wingTexture = createButterflyWingTexture();
    const wingMaterial = new THREE.MeshStandardMaterial({
      map: wingTexture,
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.2,
      alphaTest: 0.05
    });

    // Butterfly Body
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.4,
      metalness: 0.4
    });

    const thoraxGeom = new THREE.CapsuleGeometry(0.045, 0.22, 8, 12);
    const thorax = new THREE.Mesh(thoraxGeom, bodyMaterial);
    thorax.rotation.x = Math.PI / 2;
    butterflyGroup.add(thorax);

    const headGeom = new THREE.SphereGeometry(0.04, 12, 12);
    const head = new THREE.Mesh(headGeom, bodyMaterial);
    head.position.set(0, 0.15, 0.02);
    butterflyGroup.add(head);

    // Left Wings
    const leftWingPivot = new THREE.Group();
    leftWingPivot.position.set(-0.03, 0, 0.02);
    butterflyGroup.add(leftWingPivot);

    const leftForewingGeom = new THREE.PlaneGeometry(0.55, 0.7);
    leftForewingGeom.translate(-0.25, 0.15, 0);
    const leftForewing = new THREE.Mesh(leftForewingGeom, wingMaterial);
    leftForewing.rotation.z = 0.2;
    leftWingPivot.add(leftForewing);

    // Right Wings
    const rightWingPivot = new THREE.Group();
    rightWingPivot.position.set(0.03, 0, 0.02);
    butterflyGroup.add(rightWingPivot);

    const rightForewingGeom = new THREE.PlaneGeometry(0.55, 0.7);
    rightForewingGeom.translate(0.25, 0.15, 0);
    const rightForewing = new THREE.Mesh(rightForewingGeom, wingMaterial);
    rightForewing.rotation.z = -0.2;
    rightForewing.scale.x = -1; // Mirror horizontally
    rightWingPivot.add(rightForewing);

    // Scale butterfly down initially
    butterflyGroup.scale.set(0.001, 0.001, 0.001);
    butterflyGroup.position.set(initialBookX, targetBookY, 0.3);

    // 5. Butterfly Glowing Particle Trails
    const trailCount = 80;
    const trailGeom = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    const trailAlphas = new Float32Array(trailCount);
    const trailSizes = new Float32Array(trailCount);

    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3] = 0;
      trailPositions[i * 3 + 1] = -100;
      trailPositions[i * 3 + 2] = 0;
      trailAlphas[i] = 0;
      trailSizes[i] = 0.12;
    }

    trailGeom.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeom.setAttribute('alpha', new THREE.BufferAttribute(trailAlphas, 1));
    trailGeom.setAttribute('size', new THREE.BufferAttribute(trailSizes, 1));

    const glowSprite = createGlowSprite();
    const trailMaterial = new THREE.PointsMaterial({
      size: 0.2,
      map: glowSprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffa338
    });

    const trailPoints = new THREE.Points(trailGeom, trailMaterial);
    scene.add(trailPoints);

    // Trail history points
    const trailHistory: { x: number; y: number; z: number; age: number }[] = [];

    // 6. Cinematic Explosion Particles (Burst for Brand Reveal)
    const burstCount = 280;
    const burstGeom = new THREE.BufferGeometry();
    const burstPositions = new Float32Array(burstCount * 3);
    const burstVelocities = new Float32Array(burstCount * 3);
    const burstColors = new Float32Array(burstCount * 3);

    const goldPalette = [
      new THREE.Color('#f97316'), // Brand orange
      new THREE.Color('#fbbf24'), // Gold
      new THREE.Color('#ffffff'), // Sparkle white
      new THREE.Color('#fdba74'), // Light amber
    ];

    for (let i = 0; i < burstCount; i++) {
      burstPositions[i * 3] = 1.9;
      burstPositions[i * 3 + 1] = 0.2;
      burstPositions[i * 3 + 2] = 0.3;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 0.8 + Math.random() * 2.8;

      burstVelocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      burstVelocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      burstVelocities[i * 3 + 2] = Math.cos(phi) * speed * 0.7;

      const col = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      burstColors[i * 3] = col.r;
      burstColors[i * 3 + 1] = col.g;
      burstColors[i * 3 + 2] = col.b;
    }

    burstGeom.setAttribute('position', new THREE.BufferAttribute(burstPositions, 3));
    burstGeom.setAttribute('color', new THREE.BufferAttribute(burstColors, 3));

    const burstMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: glowSprite,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const burstPoints = new THREE.Points(burstGeom, burstMaterial);
    scene.add(burstPoints);

    // 7. Scroll & Animation Timeline Synchronization
    let targetProgress = 0;
    let currentProgress = 0;
    let animFrameId: number | null = null;
    let isInView = false;
    let prevShowBrand = false;
    let prevTurnT = -1;
    let prevBurstT = -1;
    const clock = new THREE.Clock();

    const updateScrollProgress = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      targetProgress = progress;
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 8. Flight Trajectory Curve for Butterfly (From Left Book to Right Brand Reveal)
    const flightTargetX = isMobile ? 0.3 : 2.1;
    const flightPoints = [
      new THREE.Vector3(initialBookX + 0.1, targetBookY + 0.15, 0.4),      // On the book
      new THREE.Vector3(initialBookX + 0.6, targetBookY + 1.2, 0.9),       // Ascend
      new THREE.Vector3(0.0, 0.4, 1.4),                                    // Swoop center
      new THREE.Vector3(flightTargetX - 0.5, 0.9, 0.8),                    // Approach right
      new THREE.Vector3(flightTargetX, 0.15, 0.4)                          // Land at brand reveal
    ];
    const flightCurve = new THREE.CatmullRomCurve3(flightPoints);

    // 9. Main Animation Render Loop (only active while section is in or near viewport)
    const render = () => {
      if (!isInView) {
        animFrameId = null;
        return;
      }

      animFrameId = requestAnimationFrame(render);

      const delta = Math.min(0.05, clock.getDelta());
      const elapsed = clock.getElapsedTime();

      // Smooth lerp progress
      currentProgress += (targetProgress - currentProgress) * 0.14;
      scrollProgress.current = currentProgress;

      const p = currentProgress;

      // -----------------------------------------------------------------
      // PHASE 1: 3D Book Rises (Progress 0.00 -> 0.30)
      // -----------------------------------------------------------------
      if (p <= 0.30) {
        const riseT = Math.min(1, p / 0.28);
        const easeRise = 1 - Math.pow(1 - riseT, 3);

        bookGroup.position.y = -4.5 + (targetBookY - -4.5) * easeRise;
        bookGroup.position.x = initialBookX;
        bookGroup.rotation.y = 0.45 - easeRise * 0.25;
        bookGroup.rotation.x = 0.35 - easeRise * 0.2;
        bookGroup.rotation.z = -0.1 + easeRise * 0.05;

        frontCoverPivot.rotation.y = 0;
        turnPagePivot.rotation.y = 0;
      } else {
        bookGroup.position.y = targetBookY;
        bookGroup.position.x = initialBookX;
        bookGroup.rotation.set(0.15, 0.2, -0.05);
      }

      // -----------------------------------------------------------------
      // PHASE 2: 3D Book Opens & Page Turning Physics (Progress 0.20 -> 0.52)
      // -----------------------------------------------------------------
      if (p > 0.20) {
        const openT = Math.max(0, Math.min(1, (p - 0.20) / 0.24));
        const easeOpen = Math.sin((openT * Math.PI) / 2);

        // Open front cover smoothly to the left (-170 degrees)
        frontCoverPivot.rotation.y = -easeOpen * (Math.PI * 0.92);

        // Page turns with realistic flex curl
        const turnT = Math.max(0, Math.min(1, (p - 0.26) / 0.22));
        turnPagePivot.rotation.y = -turnT * (Math.PI * 0.88);

        // Only recalculate turning page vertices when turnT changed
        if (Math.abs(turnT - prevTurnT) > 0.0005) {
          prevTurnT = turnT;
          const posAttr = turnPageGeom.attributes.position;
          const flexAmplitude = Math.sin(turnT * Math.PI) * 0.18;
          for (let i = 0; i < posAttr.count; i++) {
            const u = posAttr.getX(i) / turnPageWidth;
            const zOffset = Math.sin(u * Math.PI) * flexAmplitude;
            posAttr.setZ(i, zOffset);
          }
          posAttr.needsUpdate = true;
        }
      }

      // -----------------------------------------------------------------
      // PHASE 3: Butterfly Emerges & Realistic Flight (Progress 0.40 -> 0.82)
      // -----------------------------------------------------------------
      if (p > 0.40 && p < 0.95) {
        const flyT = Math.max(0, Math.min(1, (p - 0.40) / 0.42));

        const scaleVal = Math.min(1, flyT * 4) * 0.95;
        butterflyGroup.scale.set(scaleVal, scaleVal, scaleVal);

        const curvePoint = flightCurve.getPoint(flyT);
        curvePoint.y += Math.sin(elapsed * 6) * 0.05;
        curvePoint.x += Math.cos(elapsed * 4) * 0.03;
        butterflyGroup.position.copy(curvePoint);

        const tangent = flightCurve.getTangent(flyT);
        butterflyGroup.lookAt(curvePoint.clone().add(tangent));
        butterflyGroup.rotation.z += Math.sin(flyT * Math.PI * 2) * 0.25;

        // Realistic wing flapping: dynamic frequency
        const flapSpeed = 22 + (1 - flyT) * 12;
        const flapAngle = Math.sin(elapsed * flapSpeed) * 0.75;
        leftWingPivot.rotation.y = flapAngle;
        rightWingPivot.rotation.y = -flapAngle;

        // Point light on butterfly
        butterflyLight.position.copy(curvePoint);
        butterflyLight.intensity = 2.8 * scaleVal;

        // Add to particle trail
        if (Math.random() > 0.3) {
          trailHistory.unshift({
            x: curvePoint.x + (Math.random() - 0.5) * 0.08,
            y: curvePoint.y - 0.08 + (Math.random() - 0.5) * 0.08,
            z: curvePoint.z + (Math.random() - 0.5) * 0.08,
            age: 0
          });
        }
      } else if (p <= 0.40) {
        butterflyGroup.scale.set(0.001, 0.001, 0.001);
        butterflyLight.intensity = 0;
      }

      // Update Particle Trail only while active
      if (trailHistory.length > 0) {
        while (trailHistory.length > trailCount) {
          trailHistory.pop();
        }
        for (let i = 0; i < trailCount; i++) {
          if (i < trailHistory.length) {
            const pt = trailHistory[i];
            pt.age += delta * 1.5;
            trailPositions[i * 3] = pt.x;
            trailPositions[i * 3 + 1] = pt.y - pt.age * 0.15;
            trailPositions[i * 3 + 2] = pt.z;
          } else {
            trailPositions[i * 3 + 1] = -100;
          }
        }
        trailGeom.attributes.position.needsUpdate = true;
      }

      // -----------------------------------------------------------------
      // PHASE 4: Brand Reveal & Cinematic Golden Particle Burst (Progress 0.72 -> 0.95)
      // -----------------------------------------------------------------
      const brandThreshold = 0.72;
      const shouldShowBrand = p >= brandThreshold;
      if (shouldShowBrand !== prevShowBrand) {
        prevShowBrand = shouldShowBrand;
        setShowBrandText(shouldShowBrand);
      }

      if (shouldShowBrand) {
        const burstT = Math.min(1, (p - brandThreshold) / 0.16);

        burstMaterial.opacity = Math.max(0, 1 - burstT * 0.9);
        burstMaterial.size = 0.18 * (1 + burstT * 1.5);

        if (Math.abs(burstT - prevBurstT) > 0.0005) {
          prevBurstT = burstT;
          const positions = burstGeom.attributes.position.array as Float32Array;
          for (let i = 0; i < burstCount; i++) {
            positions[i * 3] = flightTargetX + burstVelocities[i * 3] * burstT * 1.6;
            positions[i * 3 + 1] = 0.2 + burstVelocities[i * 3 + 1] * burstT * 1.6 - burstT * burstT * 0.4;
            positions[i * 3 + 2] = 0.3 + burstVelocities[i * 3 + 2] * burstT * 1.6;
          }
          burstGeom.attributes.position.needsUpdate = true;
        }
      } else {
        burstMaterial.opacity = 0;
        prevBurstT = -1;
      }

      // Smooth fade out when exiting storytelling section into next content
      if (p > 0.92) {
        const exitT = (p - 0.92) / 0.08;
        renderer.domElement.style.opacity = (1 - exitT).toString();
      } else {
        renderer.domElement.style.opacity = '1';
      }

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (animFrameId === null && isInView) {
        clock.getDelta();
        animFrameId = requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          updateScrollProgress();
          startLoop();
        }
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', handleResize);
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white"
      style={{ height: '380vh' }}
      aria-label="3D Storytelling Experience"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">

        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Ambient Orange & Golden Radial Lighting */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-25 blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.6) 0%, rgba(251,146,60,0.2) 50%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.5) 0%, rgba(249,115,22,0.2) 60%, transparent 80%)' }}
        />

        {/* Brand Reveal Text Overlay (Right side of screen) */}
        <div
          ref={brandRevealRef}
          className={`absolute right-6 md:right-14 lg:right-24 top-1/2 -translate-y-1/2 max-w-xl z-20 transition-all duration-700 ease-out flex flex-col items-start ${showBrandText
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-12 scale-90'
            }`}
        >
          {/* Main Brand Title with Moving Text Color & High Impact Typography */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.02] mb-5 select-none">
            <span className="moving-title-1 drop-shadow-[0_12px_35px_rgba(249,115,22,0.55)]">
              Vabsgen
            </span>{' '}
            <br />
            <span className="moving-title-2 drop-shadow-[0_12px_35px_rgba(251,191,36,0.5)]">
              Technology
            </span>
          </h2>

          {/* Strong, impactful application-focused content */}
          <p className="text-white/95 text-lg sm:text-xl font-medium leading-relaxed max-w-lg drop-shadow-md">
            The intelligent ecosystem uniting <span className="text-orange-400 font-bold">real-time AI voice interviews</span>, <span className="text-amber-300 font-bold">personalized career roadmaps</span>, and measurable placement readiness into one seamless college platform.
          </p>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[11px] font-medium tracking-widest text-gray-400 uppercase">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-orange-500 rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
