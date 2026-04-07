import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Box } from "./Box";

export default function Scene() {
  return (
    <Canvas camera={{ position: [2, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />

      <Box />

      <OrbitControls />
    </Canvas>
  );
}
