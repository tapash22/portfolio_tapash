import gsap from "gsap";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";

import LeaderBoardCard from "../componants/card/LeaderBoardCard";
import { Canvas } from "@react-three/fiber";
// import LeaderBoardScene from "../componants/card/LeaderBoardScene";
// import LeaderBoardScene from "../componants/card/LeaderBoardScene";
import image from "../assets/images/yy.png";

export type LeaderItem = {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  isWinner?: boolean;
};

export default function Experience() {
  const leaders: LeaderItem[] = [
    {
      rank: 2,
      name: "Fariha Sultana",
      avatar: image,
      score: 40200,
    },
    {
      rank: 1,
      name: "Tania Akhter S.",
      avatar: image,
      score: 50449,
      isWinner: true,
    },
    {
      rank: 3,
      name: "Pranta Chandra",
      avatar: image,
      score: 30526,
    },
  ];

  const [animatedScores, setAnimatedScores] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
  });
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Scene Entrance Animation
      gsap.fromTo(
        sceneRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      );

      // 2. Score Counter Animation
      leaders.forEach((leader) => {
        gsap.to(
          {},
          {
            duration: 2,
            onUpdate: function () {
              const progress = this.progress();
              setAnimatedScores((prev) => ({
                ...prev,
                [leader.rank]: Math.floor(leader.score * progress),
              }));
            },
          },
        );
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        width: "30vw",
        height: "30vh",
        backgroundImage: `url(${image})`, // Correct syntax for variables
        backgroundSize: "cover", // Ensures the image fills the area
        backgroundPosition: "center", // Centers the background
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas camera={{ position: [0, 3, 8], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Environment preset="city" />

        {/* Suspense prevents the "Hide" issue while textures load */}
        <Suspense fallback={null}>
          <group position={[0, -2.0, -0.9]}>
            {leaders.map((leader) => {
              const xPos =
                leader.rank === 1 ? 0 : leader.rank === 2 ? -2.5 : 2.5;
              return (
                <LeaderBoardCard
                  key={leader.rank}
                  item={leader}
                  animatedScore={animatedScores[leader.rank]}
                  position={[xPos, 0, 0]}
                />
              );
            })}
          </group>
        </Suspense>

        <ContactShadows opacity={0.4} scale={15} blur={2.5} far={4.5} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
