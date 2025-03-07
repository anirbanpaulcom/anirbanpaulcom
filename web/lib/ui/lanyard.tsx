'use client';

import type React from 'react';

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  Canvas,
  useThree,
  useFrame,
  type ThreeEvent,
  extend,
} from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyProps,
  type RapierRigidBody,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';
import { useTheme } from 'next-themes';

extend({ MeshLineGeometry, MeshLineMaterial });

// Type definitions
interface CustomRigidBody extends RapierRigidBody {
  lerped?: THREE.Vector3;
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: { args: ConstructorParameters<typeof MeshLineGeometry> };
    meshLineMaterial: { args: ConstructorParameters<typeof MeshLineMaterial> };
  }
}

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  containerClassname?: string;
}

interface GLTFResult extends GLTF {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
  };
}

// Memoized segment properties
const SEGMENT_PROPS: RigidBodyProps = {
  type: 'dynamic',
  canSleep: true,
  colliders: false,
  angularDamping: 4,
  linearDamping: 4,
};

// Optimized touch device detection
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
export function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  containerClassname = '',
}: LanyardProps) {
  return (
    <div
      className={`relative bg-transparent w-full flex justify-center items-center transform scale-100 origin-center ${containerClassname}`}
    >
      <Canvas
        camera={{ position, fov }}
        gl={{
          alpha: transparent,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Optimize for different pixel ratios
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, transparent ? 0 : 1);
        }}
        performance={{ min: 0.5 }} // Allow performance scaling
      >
        <ambientLight intensity={Math.PI} />
        <Physics
          gravity={gravity}
          timeStep={1 / 60}
          interpolate={true} // Disable interpolation for better performance
        >
          <Band />
        </Physics>
        <Suspense fallback={null}>
          <Environment blur={0.75} preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const { theme } = useTheme();
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<CustomRigidBody>(null);
  const j1 = useRef<CustomRigidBody>(null);
  const j2 = useRef<CustomRigidBody>(null);
  const j3 = useRef<CustomRigidBody>(null);
  const card = useRef<CustomRigidBody>(null);

  // Memoize vectors to prevent unnecessary object creation
  const vectors = useMemo(
    () => ({
      vec: new THREE.Vector3(),
      ang: new THREE.Vector3(),
      rot: new THREE.Vector3(),
      dir: new THREE.Vector3(),
    }),
    [],
  );

  const { vec, ang, rot, dir } = vectors;

  // Load model based on theme
  const { nodes, materials } = useGLTF(
    theme === 'light' ? 'idcardlight.glb' : 'idcarddark.glb',
  ) as GLTFResult;

  const { width, height } = useThree((state) => state.size);

  // Memoize curve to prevent recreation
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        Array(4)
          .fill(0)
          .map(() => new THREE.Vector3()),
      ),
    [],
  );

  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  // Setup physics joints
  useRopeJoint(
    fixed as React.RefObject<RapierRigidBody>,
    j1 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useRopeJoint(
    j1 as React.RefObject<RapierRigidBody>,
    j2 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useRopeJoint(
    j2 as React.RefObject<RapierRigidBody>,
    j3 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1],
  );
  useSphericalJoint(
    j3 as React.RefObject<RapierRigidBody>,
    card as React.RefObject<RapierRigidBody>,
    [
      [0, 0, 0],
      [0, 1.38, 0],
    ],
  );

  // Update cursor style based on interaction state
  useEffect(() => {
    document.body.style.cursor = hovered
      ? dragged
        ? 'grabbing'
        : 'grab'
      : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, dragged]);

  // Memoize line material properties
  const lineMaterialProps = useMemo(
    () => ({
      color: theme === 'light' ? 'white' : 'black',
      lineWidth: 1,
      repeat: new THREE.Vector2(-4, 1),
      resolution: new THREE.Vector2(width, height),
    }),
    [theme, width, height],
  );

  // Optimized animation frame update
  useFrame((state, delta) => {
    if (!card.current) return;

    // Handle dragging
    if (
      dragged &&
      dragged instanceof THREE.Vector3 &&
      card.current &&
      !isTouchDevice()
    ) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      // Wake up bodies only when necessary
      if (card.current.isSleeping()) {
        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      }

      card.current.setNextKinematicTranslation(vec.sub(dragged));
    }

    if (dragged && isTouchDevice() && card.current) {
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
    }

    if (fixed.current && j1.current && j2.current && j3.current) {
      // Initialize and update lerped positions
      [j1, j2].forEach((ref) => {
        const current = ref.current;
        if (current) {
          if (!current.lerped)
            current.lerped = new THREE.Vector3().copy(current.translation());
          const translation = current.translation();
          const clampedDistance = Math.max(
            0.1,
            Math.min(1, current.lerped.distanceTo(translation)),
          );
          current.lerped.lerp(
            translation,
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
          );
        }
      });

      // Update curve points
      if (j1.current.lerped && j2.current.lerped) {
        curve.points[0].copy(j3.current.translation());
        curve.points[1].copy(j2.current.lerped);
        curve.points[2].copy(j1.current.lerped);
        curve.points[3].copy(fixed.current.translation());
      }

      // Update mesh line geometry
      if (band.current?.geometry) {
        const points = curve.getPoints(32);
        if (
          !points.some(
            (point) => isNaN(point.x) || isNaN(point.y) || isNaN(point.z),
          )
        ) {
          (band.current.geometry as MeshLineGeometry).setPoints(points);
        }
      }

      // Apply angular damping to card
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(ang.setY(ang.y - rot.y * 0.25), false);
    }
  });

  // Optimized event handlers
  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!card.current) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragged(
      new THREE.Vector3().copy(e.point).sub(card.current.translation()),
    );
  }, []);

  const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setDragged(false);
  }, []);

  const handleTouchStart = useCallback((e: ThreeEvent<TouchEvent>) => {
    e.stopPropagation();
    setHovered(true);
    if (!card.current) return;
    const touch = e.touches[0];
    const x = (touch.clientX / window.innerWidth) * 2 - 1;
    const y = -(touch.clientY / window.innerHeight) * 2 + 1;
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), e.camera);
    const touchPoint = new THREE.Vector3();
    raycaster.ray.at(30, touchPoint);
    setDragged(
      new THREE.Vector3().copy(touchPoint).sub(card.current.translation()),
    );
  }, []);

  const handleTouchMove = useCallback(
    (e: ThreeEvent<TouchEvent>) => {
      if (!dragged || !card.current) return;
      e.stopPropagation();
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth) * 2 - 1;
      const y = -(touch.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), e.camera);
      const touchPoint = new THREE.Vector3();
      raycaster.ray.at(30, touchPoint);
      vec.copy(touchPoint);
      card.current.setNextKinematicTranslation(
        vec.sub(dragged as THREE.Vector3),
      );
    },
    [dragged, vec],
  );

  const handleTouchEnd = useCallback((e: ThreeEvent<TouchEvent>) => {
    e.stopPropagation();
    setHovered(false);
    setDragged(false);
  }, []);

  // Memoized event handlers object
  const pointerHandlers = useMemo(
    () => ({
      onPointerOver: () => setHovered(true),
      onPointerOut: () => setHovered(false),
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    }),
    [
      handlePointerDown,
      handlePointerUp,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    ],
  );

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...SEGMENT_PROPS} type="fixed" />
        <RigidBody ref={j1} position={[0.5, 0, 0]} {...SEGMENT_PROPS}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j2} position={[1, 0, 0]} {...SEGMENT_PROPS}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody ref={j3} position={[1.5, 0, 0]} {...SEGMENT_PROPS}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          {...SEGMENT_PROPS}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group scale={2.25} position={[0, -1.2, -0.05]} {...pointerHandlers}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={0}
                clearcoatRoughness={0.3}
                roughness={1}
                metalness={0.9}
                toneMapped={true}
                emissive={new THREE.Color(0x111111)}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry args={[]} />
        <meshLineMaterial args={[lineMaterialProps]} />
      </mesh>
    </>
  );
}

// Preload models to improve initial loading performance
useGLTF.preload('idcardlight.glb');
useGLTF.preload('idcarddark.glb');
