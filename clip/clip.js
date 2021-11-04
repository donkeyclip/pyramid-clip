import { HTMLClip, loadPlugin } from "@donkeyclip/motorcortex";
// import initParams from "./initParams";
import ThreeDefinition from "@donkeyclip/motorcortex-threejs";
const threejs = loadPlugin(ThreeDefinition);

export const clip = new HTMLClip({
  html: `
    <div class="container"></div>`,
  css: `
  .container {
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items: center;
    color: {{ initParams.color }};
  }
  `,
  host: document.getElementById("clip"),
  containerParams: {
    width: "1920px",
    height: "1080px",
  },
});

const box = {
  id: "box",
  geometry: { type: "BoxGeometry", parameters: [10, 10, 10] },
  material: {
    type: "MeshPhongMaterial",
    parameters: [
      {
        color: 0xa0adaf,
        shininess: 10,
        specular: 0x111111,
        dithering: true,
        side: "BackSide",
      },
    ],
  },
  settings: {
    receiveShadow: true,
    position: { x: 0, y: -0, z: 5 },
    castShadow: true,
    // rotation:{x:- Math.PI * 0.5,y:0,z:0}
  },
};

const pyramid = {
  id: "pyramid",
  geometry: { type: "CylinderGeometry", parameters: [0, 1, 1, 4, 1] },
  material: {
    type: "MeshPhongMaterial",
    parameters: [{}],
  },
  settings: {
    position: { x: 0, y: -4.4, z: 5 },
    castShadow: true,
    receiveShadow: true,
    // rotation:{x:- Math.PI * 0.5,y:0,z:0}
  },
};

const test = {
  id: "light_point",
  geometry: { type: "SphereGeometry", parameters: [0.1, 30, 6] },
  material: {
    type: "MeshBasicMaterial",
    parameters: [
      {
        color: "#d000ff",
      },
    ],
  },
  settings: {
    position: { x: 0, y: 0, z: 0 },
    castShadow: true,
    receiveShadow: true,
    // rotation:{x:- Math.PI * 0.5,y:0,z:0}
  },
  selector: "!#point_light",
};

const params = {
  color: 0x591369,
  transmission: 1,
  opacity: 1,
  metalness: 0,
  roughness: 0.41,
  ior: 2,
  thickness: 5,
  specularIntensity: 1,
  specularTint: 0x511298,
  envMapIntensity: 0.25,
  lightIntensity: 1,
  exposure: 1,
};

const cristal = {
  id: "cristal",
  geometry: { type: "OctahedronGeometry", parameters: [0.3, 0] },
  material: {
    type: "MeshPhysicalMaterial",
    parameters: [
      {
        color: "#591369",
        metalness: params.metalness,
        roughness: params.roughness,
        ior: params.ior,
        envMapIntensity: params.envMapIntensity,
        transmission: params.transmission, // use material.transmission for glass materials
        specularIntensity: params.specularIntensity,
        specularTint: params.specularTint,
        opacity: params.opacity,
        side: "DoubleSide",
        transparent: true,
      },
    ],
  },
  settings: {
    position: { x: 0, y: -3.5, z: 5 },
    scale: { x: 0.5, y: 1, z: 0.5 },
    castShadow: true,
    receiveShadow: true,
  },
  class: ["cristal"],
  // selector: "!#PointLight"
};

const threeclip = new threejs.Clip(
  {
    renderers: {
      type: "WebGLRenderer",
      parameters: [{ powerPreference: "high-performance" }],
      settings: {
        setClearColor: ["#111"],
        shadowMap: { enabled: true, type: "PCFSoftShadowMap" },
        physicallyCorrectLights: true,
      },
    },
    scenes: {},
    lights: [
      {
        id: "light_spot_pink",
        type: "PointLight",
        parameters: ["#969696", 1],
        settings: {
          position: { x: -3, y: 2, z: 5 },
        },
      },
      // {
      //   id: "DirectionalLight",
      //   type: "DirectionalLight",
      //   parameters: ["0xfff",1],
      //   settings: {
      //     position: { x: 0, y: -2, z: 10 }
      //   },
      // },
      {
        id: "point_light",
        type: "PointLight",
        parameters: ["#aa00ff", 1, 1.5],
        settings: {
          position: { x: 0, y: -3.5, z: 5 },
        },
      },
    ],
    cameras: {
      id: "camera_1",
      type: "PerspectiveCamera",
      settings: {
        position: { x: -5, y: -2, z: 15 },
        lookAt: [5, -45, 10],
        far: 10000,
        near: 1,
      },
    },
    entities: [box, pyramid, cristal, test],
    controls: { enable: true, enableEvents: false, maxPolarAngle: Math.PI },
  },
  {
    selector: ".container",
    containerParams: { width: "1920px", height: "1080px" },
  }
);

const cristalAnimation = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -2.5, z: 5 },
    },
  },
  {
    selector: "!#cristal",
    duration: 1000,
  }
);
threeclip.addIncident(cristalAnimation, 0);

const pointlghtAnimation = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -2.5, z: 5 },
    },
  },
  {
    selector: "!#point_light",
    duration: 1000,
  }
);
threeclip.addIncident(cristalAnimation, 0);
threeclip.addIncident(pointlghtAnimation, 0);

clip.addIncident(threeclip, 0);
