import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, OrbitControls } from '@react-three/drei';
import { ArrowUpRight } from 'lucide-react';
import * as THREE from 'three';
import { CURATED_BRANDS } from '../data/products';

const SCALE = 0.0066;
const to3D = (svgX: number, svgY: number): [number, number] => [
  (svgX - 185) * SCALE,
  (100 - svgY) * SCALE,
];

function createDidoneShapes() {
  // High-contrast Didone C
  const cShape = new THREE.Shape();
  cShape.moveTo(...to3D(138, 28));
  cShape.lineTo(...to3D(138, 66));
  cShape.lineTo(...to3D(132, 66));
  cShape.bezierCurveTo(...to3D(127, 44), ...to3D(112, 33), ...to3D(90, 33));
  cShape.bezierCurveTo(...to3D(62, 33), ...to3D(49, 60), ...to3D(49, 100));
  cShape.bezierCurveTo(...to3D(49, 140), ...to3D(62, 167), ...to3D(92, 167));
  cShape.bezierCurveTo(...to3D(115, 167), ...to3D(130, 155), ...to3D(137, 136));
  cShape.lineTo(...to3D(143, 139));
  cShape.bezierCurveTo(...to3D(134, 163), ...to3D(116, 176), ...to3D(88, 176));
  cShape.bezierCurveTo(...to3D(46, 176), ...to3D(20, 144), ...to3D(20, 100));
  cShape.bezierCurveTo(...to3D(20, 56), ...to3D(46, 24), ...to3D(88, 24));
  cShape.bezierCurveTo(...to3D(109, 24), ...to3D(125, 26), ...to3D(138, 28));
  cShape.closePath();

  // High-contrast Didone H
  const hShape = new THREE.Shape();
  const hPts: [number, number][] = [
    [166, 26], [222, 26], [222, 33], [208, 33], [208, 95], [268, 95],
    [268, 33], [254, 33], [254, 26], [310, 26], [310, 33], [296, 33],
    [296, 167], [310, 167], [310, 174], [254, 174], [254, 167], [268, 167],
    [268, 103], [208, 103], [208, 167], [222, 167], [222, 174], [166, 174],
    [166, 167], [180, 167], [180, 33], [166, 33],
  ];
  hShape.moveTo(...to3D(hPts[0][0], hPts[0][1]));
  for (let i = 1; i < hPts.length; i++) {
    hShape.lineTo(...to3D(hPts[i][0], hPts[i][1]));
  }
  hShape.closePath();

  // Baseline period
  const dotShape = new THREE.Shape();
  const [dx, dy] = to3D(336, 160);
  dotShape.absarc(dx, dy, 14 * SCALE, 0, Math.PI * 2, false);

  return [cShape, hShape, dotShape];
}

function MedallionMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useMemo(() => createDidoneShapes(), []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 28,
    }),
    [],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const scrollAngle = (window.scrollY || 0) * 0.0011;
    const targetY = state.pointer.x * 0.42 + Math.sin(state.clock.elapsedTime * 0.45) * 0.14 + scrollAngle;
    const targetX = -state.pointer.y * 0.28;

    const damp = 1 - Math.exp(-delta * 4.5);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, damp);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, damp);
  });

  return (
    <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.22}>
      <group ref={groupRef}>
        {/* Outer refractive glass bezel */}
        <mesh>
          <torusGeometry args={[1.64, 0.13, 32, 96]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.86}
            ior={1.48}
            thickness={0.75}
            roughness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.05}
            attenuationColor="#F6F4EF"
            attenuationDistance={2.8}
          />
        </mesh>

        {/* Inner brushed obsidian chrome collar */}
        <mesh>
          <torusGeometry args={[1.42, 0.04, 24, 96]} />
          <meshPhysicalMaterial
            color="#1b1b1e"
            metalness={0.96}
            roughness={0.14}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Surgical Rojo Charol Eléctrico hairline inlay */}
        <mesh position={[0, 0, 0.04]}>
          <torusGeometry args={[1.5, 0.012, 16, 96]} />
          <meshPhysicalMaterial
            color="#D90429"
            metalness={0.45}
            roughness={0.2}
            clearcoat={1}
          />
        </mesh>

        {/* Extruded 3D CH. chrome monogram */}
        <group position={[0, 0, -0.08]}>
          {shapes.map((shape, idx) => (
            <mesh key={idx} castShadow receiveShadow>
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshPhysicalMaterial
                color="#17171a"
                metalness={0.97}
                roughness={0.09}
                clearcoat={1}
                clearcoatRoughness={0.04}
                reflectivity={1}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function MedallionFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#EAE4DC] p-8 select-none">
      <div className="w-48 h-48 rounded-full border border-[#121212]/15 bg-[#F6F4EF]/70 flex items-center justify-center shadow-inner relative">
        <span className="display-heading text-6xl font-bold text-[#121212]">CH.</span>
        <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-[#D90429] text-[#F6F4EF] text-[10px] font-medium tracking-[0.16em] uppercase">
          Herraje
        </span>
      </div>
    </div>
  );
}

export function Medallion3DSection() {
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setWebglReady(false);
    } catch {
      setWebglReady(false);
    }
  }, []);

  return (
    <section
      aria-label="Medallón escultórico 3D CH."
      className="w-full px-6 md:px-10 lg:px-12 py-20 md:py-28 bg-[#F6F4EF]"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-5 flex flex-col items-start">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#B80322] mb-4">
            Materialidad &amp; Herrajes
          </p>

          <h2 className="display-heading text-4xl sm:text-5xl xl:text-[3.5rem] font-semibold text-[#121212] mb-6">
            Detalles que definen la pieza
          </h2>

          <p className="text-[15px] md:text-base text-[#5A5550] leading-relaxed max-w-lg mb-6">
            Cada cartera de nuestra selección pasa por una revisión de terminaciones, costuras y
            herrajes antes de llegar a tus manos. Criterio estético y funcionalidad real para todos
            los días.
          </p>

          <p className="font-serif text-lg text-[#121212] mb-8">
            {CURATED_BRANDS.join(' · ')}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="/coleccion"
              className="min-h-[44px] inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#121212] text-[#F6F4EF] text-[13px] font-medium tracking-[0.04em] hover:bg-[#D90429] transition-colors active:scale-[0.97]"
            >
              <span>Explorar catálogo completo</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
            </Link>

            <Link
              to="/sobre-ch"
              className="editorial-link min-h-[44px] inline-flex items-center text-[13px] font-medium text-[#121212] hover:text-[#D90429] transition-colors"
            >
              Conocer la curaduría
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            data-cursor="ROTAR 3D"
            className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] bg-[#EAE4DC] overflow-hidden select-none"
          >
            {webglReady ? (
              <CanvasErrorBoundary fallback={<MedallionFallback />}>
                <Suspense fallback={<MedallionFallback />}>
                  <Canvas
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 5.2], fov: 36 }}
                    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                  >
                    <ambientLight intensity={0.45} />
                    <directionalLight position={[4, 6, 5]} intensity={1.35} color="#F6F4EF" />
                    <directionalLight position={[-4, -3, 3]} intensity={0.75} color="#D90429" />

                    <Environment resolution={256} frames={1}>
                      <Lightformer
                        form="rect"
                        intensity={2.6}
                        color="#F6F4EF"
                        position={[-4, 4, 4]}
                        scale={[8, 6, 1]}
                        target={[0, 0, 0]}
                      />
                      <Lightformer
                        form="rect"
                        intensity={4.5}
                        color="#D90429"
                        position={[5, 0.5, 2]}
                        scale={[2.2, 6, 1]}
                        target={[0, 0, 0]}
                      />
                      <Lightformer
                        form="rect"
                        intensity={1.5}
                        color="#EAE4DC"
                        position={[0, -5, 2]}
                        scale={[8, 4, 1]}
                        target={[0, 0, 0]}
                      />
                      <Lightformer
                        form="ring"
                        intensity={2.2}
                        color="#ffffff"
                        position={[0, 5, -2]}
                        scale={[5, 5, 1]}
                        target={[0, 0, 0]}
                      />
                    </Environment>

                    <MedallionMesh />

                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      enableDamping
                      dampingFactor={0.08}
                      rotateSpeed={0.75}
                    />
                  </Canvas>
                </Suspense>
              </CanvasErrorBoundary>
            ) : (
              <MedallionFallback />
            )}

            <p className="pointer-events-none absolute bottom-4 left-5 text-[11px] font-medium tracking-[0.14em] uppercase text-[#5A5550]">
              Arrastrá o mové el cursor para rotar el herraje CH.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
