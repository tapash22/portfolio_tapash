import { Html } from "@react-three/drei";
import { type LeaderItem } from "../../pages/Service";

type Props = {
  item: LeaderItem;
  animatedScore: number;
};

export default function LeaderBoardCard3d({ item, animatedScore }: Props) {
  return (
    <group position={[item.rank * 2 - 4, 0, 0]}>
      {/* 🟦 3D CARD BOX */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, item.rank === 1 ? 2.6 : 2.2, 0.4]} />
        <meshStandardMaterial
          color={item.isWinner ? "#9333ea" : "#1e1e1e"}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* 🌐 HTML OVERLAY */}
      <Html position={[0, 0, 0]} center transform>
        <div className={`card ${item.isWinner ? "winner" : ""}`}>
          {/* 🏆 Trophy */}
          {item.rank === 1 && <div className="trophy">🏆</div>}

          {/* Avatar */}
          <div className="avatar-wrapper">
            <div className="shield">
              <img src={item.avatar} className="avatar" />
            </div>
          </div>

          {/* Rank */}
          <div className="rank">#{item.rank}</div>

          {/* Name */}
          <div className="name">{item.name}</div>

          {/* Score */}
          <div className="score">{animatedScore.toLocaleString()}</div>
        </div>
      </Html>
    </group>
  );
}
