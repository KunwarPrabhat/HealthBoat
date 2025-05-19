import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";


const AmbulanceModel = ({ mouse, onWindowClick }) => {
  const modelRef = useRef();
  const { scene } = useGLTF("/ambulance_mod.glb");

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y = mouse.x * 0.5;
      modelRef.current.rotation.x = -mouse.y * 0.3;
    }
  });

  scene.traverse((child) => {
    if (child.name === "window") {
      child.userData.clickable = true;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.6}
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (e.object.userData.clickable) {
          onWindowClick();
        }
      }}
    />
  );
};

export default AmbulanceModel;
