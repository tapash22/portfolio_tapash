import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import LeaderBoardCard3d from "./LeaderBoardCard3d";
import type { LeaderItem } from "../../pages/Experience";
import { Suspense } from "react";

type Props = {
  leaders: LeaderItem[];
  animatedScores: Record<number, number>;
};

export default function LeaderBoardScene({ leaders, animatedScores }: Props) {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {leaders.map((leader) => (
          <LeaderBoardCard3d
            key={leader.rank}
            item={leader}
            animatedScore={animatedScores[leader.rank]}
          />
        ))}

        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  );
}
