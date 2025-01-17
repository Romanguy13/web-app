// import { MathUtils } from 'three';
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  Lightformer,
} from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import {
  Physics,
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
  Vector3Array,
} from '@react-three/rapier';
import { useTexture } from '@react-three/drei';

export default function Coins() {
  return (
    <>
      {/* Lighting, environment and colors */}
      <color attach="background" args={['#FFFDF7']} />
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[-10, 10, 10]}
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0001}
        castShadow
        intensity={0.5}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10]} />
      </directionalLight>
      <Environment resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={2} />
        <Lightformer position={[10, 0, -10]} scale={10} intensity={3} />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={2} />
        <Lightformer position={[0, 10, 0]} scale={10} intensity={2} />
      </Environment>
      {/* Moon physics */}
      <Physics gravity={[0, -1, 0]}>
        <Cylinders />
        <RigidBody position={[0, -1, 0]} type="fixed" colliders={false}>
          <CuboidCollider restitution={0.1} args={[1000, 1, 1000]} />
        </RigidBody>
      </Physics>
      {/* Soft shadows, they stop rendering after 1500 frames */}
      <AccumulativeShadows
        temporal
        frames={1500}
        alphaTest={1}
        blend={200}
        scale={1}
        position={[0, -0.1, 0]}
      >
        <RandomizedLight
          amount={1}
          mapSize={512}
          radius={5}
          ambient={0.5}
          position={[-10, 10, 5]}
          size={10}
          bias={0.001}
        />
      </AccumulativeShadows>
      {/* Effects */}
      <EffectComposer>
        <DepthOfField target={[0, 0, 0]} bokehScale={8} />
      </EffectComposer>
      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.2}
        enabled={true}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 4}
      />
    </>
  );
}

function Cylinders({ count = 7 }) {
  const colorMap = useTexture('tex.png');
  // const positions = Array.from({ length: count }, (_, i) => [
  //   rand(2) - 1.5,
  //   10 + i / 2,
  //   rand(2) + 3,
  // ]);
  const positions: Vector3Array[] = [
    [-1.5, 8, 7],
    [-3, 11, 6],
    [-5, 13, 6],
    [-4, 16, -1],
    [0, 19, 2],
    [7, 21, -3],
    [7, 22, 3],
    [-3, 25, 0],
  ];

  const rotations: Vector3Array[] = Array.from({ length: count }, () => [
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

  return (
    <InstancedRigidBodies
      positions={positions}
      rotations={rotations}
      colliders="hull"
    >
      <instancedMesh
        receiveShadow
        castShadow
        args={[undefined, undefined, count]}
        dispose={null}
      >
        {/* Merging the hat into one clump bc instances need a single geometry to function */}
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial map={colorMap} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
