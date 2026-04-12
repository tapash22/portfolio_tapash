import { type LeaderItem } from "../../pages/Experience";
import * as THREE from "three";
import { Text, useTexture } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo } from "react";

type Props = {
  item: LeaderItem;
  animatedScore: number;
  position: [number, number, number]; // Add position prop
};

const createShieldShape = (width: number, height: number) => {
  const shape = new THREE.Shape();
  const topWidth = width * 0.8;
  const bottomPointHeight = height * 0.35;

  shape.moveTo(-topWidth / 2, height / 2);
  shape.lineTo(topWidth / 2, height / 2);
  shape.quadraticCurveTo(width / 2, height * 0.2, width / 2, -height * 0.1);
  shape.quadraticCurveTo(
    width / 4,
    -height / 2,
    0,
    -(height / 2 + bottomPointHeight),
  );
  shape.quadraticCurveTo(-width / 4, -height / 2, -width / 2, -height * 0.1);
  shape.quadraticCurveTo(-width / 2, height * 0.2, -topWidth / 2, height / 2);
  return shape;
};

export default function LeaderBoardCard({
  item,
  animatedScore,
  position,
}: Props) {
  const blockHeight = item.rank === 1 ? 3.0 : item.rank === 2 ? 2.5 : 2.2;
  const avatarTexture = useTexture(item.avatar);

  // Setup texture correctly
  // 2. CRITICAL FIX: Configure texture with useLayoutEffect
  useLayoutEffect(() => {
    if (avatarTexture) {
      avatarTexture.colorSpace = THREE.SRGBColorSpace;
      avatarTexture.anisotropy = 16;
      avatarTexture.needsUpdate = true; // This makes the image appear
    }
  }, [avatarTexture]);

  // Memoize Geometry to prevent memory leaks
  const shieldGeometry = useMemo(() => {
    const shape = createShieldShape(0.9, 1.1);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 5,
    });
  }, []);

  const borderShape = useMemo(() => createShieldShape(0.84, 1.04), []);
  const imageShape = useMemo(() => createShieldShape(0.78, 0.98), []);

  // Strict Cleanup for VRAM
  useEffect(() => {
    return () => {
      shieldGeometry.dispose();
    };
  }, [shieldGeometry]);

  const color =
    item.rank === 1 ? "#FFD700" : item.rank === 2 ? "#C0C0C0" : "#CD7F32";

  return (
    <group position={position}>
      {/* Podium Base */}
      <mesh position={[0, blockHeight / 2, 0]}>
        <boxGeometry args={[2.2, blockHeight, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* --- AVATAR SECTION --- */}
      {/* Adjusted Y to blockHeight + 0.9 to lift it up 20px visually */}
      <group position={[0, blockHeight + 0.9, 0.6]}>
        {/* 1. Main Shield Frame */}
        <mesh geometry={shieldGeometry}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 2. Inner White Border */}
        <mesh position={[0, 0, 0.11]}>
          <shapeGeometry args={[borderShape]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* 3. The Actual Avatar Image */}
        {/* Z position 0.13 ensures it sits in front of the border */}
        <mesh position={[0, 0, 0.13]}>
          <shapeGeometry args={[imageShape]} />
          <meshBasicMaterial
            map={avatarTexture}
            side={THREE.DoubleSide}
            transparent={true}
            alphaTest={0.1}
          />
        </mesh>
      </group>

      {/* Labels */}
      <Text
        position={[0, blockHeight - 0.5, 0.61]}
        fontSize={0.35}
        color="black"
        fontStyle="bold"
      >
        {item.rank}
      </Text>
      <Text
        position={[0, blockHeight - 1.0, 0.61]}
        fontSize={0.22}
        color="black"
      >
        {item.name}
      </Text>
      <Text
        position={[0, blockHeight - 1.5, 0.61]}
        fontSize={0.28}
        color="white"
      >
        {animatedScore.toLocaleString()}
      </Text>
    </group>
  );
}
