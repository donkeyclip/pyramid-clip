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
        color: "#fff",
        dithering: true,
        side: "BackSide",
      },
    ],
  },
  settings: {
    receiveShadow: true,
    position: { x: 0, y: -0, z: 5 },
    castShadow: true,
  },
};

const pyramid = {
  id: "pyramid",
  geometry: { type: "CylinderGeometry", parameters: [0, 1, 1.3, 4, 1] },
  material: {
    type: "MeshPhongMaterial",
    parameters: [
      {
        color: "#e2e1d7",
        shininess: 10,
      },
    ],
  },
  settings: {
    position: { x: 0, y: -4.5, z: 5 },
    castShadow: true,
    receiveShadow: true,
    rotation: { set: [0, 0.8, 0] },
  },
};

const cristalLight = {
  id: "cristalLight",
  geometry: { type: "OctahedronGeometry", parameters: [0.3, 0] },
  material: {
    type: "MeshBasicMaterial",
    parameters: [
      {
        color: "#d000ff",
      },
    ],
  },
  settings: {
    position: { x: 0, y: -0.2, z: 0 },
    scale: { x: 0.4, y: 0.9, z: 0.4 },
  },
  selector: "!#point_light",
};

const cristal = {
  id: "cristal",
  geometry: { type: "OctahedronGeometry", parameters: [0.3, 0] },
  material: {
    type: "MeshPhysicalMaterial",
    parameters: [
      {
        color: "#fff",
        metalness: 0.5,
        roughness: 0.31,
        ior: 2,
        envMapIntensity: 0.25,
        transmission: 1,
        specularIntensity: 0.1,
        opacity: 1,
        side: "DoubleSide",
      },
    ],
  },
  settings: {
    position: { x: 0, y: -3.5, z: 5 },
    scale: { x: 0.5, y: 1, z: 0.5 },
    rotation: { set: [0, 0.09716, 0] },
    // castShadow: true,
  },
  class: ["cristal"],
};

const object = {
  id: "myObj",
  object: true,
  settings: {
    position: { x: 0, y: -3, z: 2.7 },
  },
};

const plane = {
  id: "plane",
  geometry: { type: "PlaneBufferGeometry", parameters: [3, 3, 3] },
  material: {
    type: "MeshPhongMaterial",
    parameters: [
      {
        color: "#fff",
        side: "DoubleSide",
      },
    ],
  },
  settings: {
    position: { x: 0, y: -1.5, z: 3.5 },
    rotation: { x: Math.PI / 2, y: 0, z: 0 },
    castShadow: true,
  },
};
const plane1 = {
  id: "plane1",
  geometry: { type: "PlaneBufferGeometry", parameters: [3, 3, 3] },
  material: {
    type: "MeshPhongMaterial",
    parameters: [
      {
        color: "#fff",
        side: "DoubleSide",
      },
    ],
  },
  settings: {
    position: { x: -2, y: -1.5, z: 1.5 },
    rotation: { x: Math.PI / 2, y: 0, z: 0 },
    castShadow: true,
  },
};

const threeclip = new threejs.Clip(
  {
    postProcessing: {
      bloomPass: {
        parameters: [0, 0, 0],
        settings: {
          threshold: 0,
          strength: 1.1,
          radius: 0,
        },
      },
    },
    renderers: {
      type: "WebGLRenderer",
      parameters: [],
      settings: {
        setClearColor: ["#000"],
        shadowMap: { enabled: true, type: "PCFShadowMap" },
        physicallyCorrectLights: true,
      },
    },
    scenes: {},
    lights: [
      {
        id: "point_light_top",
        type: "PointLight",
        parameters: ["#3b4d51", 1],
        settings: {
          position: { x: -3, y: 2, z: 5 },
        },
      },
      {
        id: "DirectionalLight_light_top",
        type: "DirectionalLight",
        parameters: ["#3b4d51", 0.6],
        settings: {
          position: { x: -7, y: 2, z: -5 },
        },
      },
      {
        // window light
        id: "SpotLight",
        type: "SpotLight",
        parameters: ["#f5f7ea", 500],
        settings: {
          position: { x: 0, y: 0, z: 0 },
          intensity: 1.2,
          angle: 0.6,
          penumbra: 1,
          target: "!#myObj",
          distance: 10,
          decay: 0.5,
          castShadow: true,
        },
      },

      {
        // purple crystal light
        id: "point_light",
        type: "PointLight",
        parameters: ["#aa00ff", 1, 1.3],
        settings: {
          position: { x: 0, y: -3.3, z: 5 },
        },
        class: ["cristalL"],
      },
    ],
    cameras: {
      id: "camera_1",
      type: "PerspectiveCamera",
      settings: {
        position: {
          x: -3,
          y: -4.5,
          z: 3,
        },
        lookAt: [0, -4, 5],
        far: 10000,
        near: 1,
      },
    },
    entities: [box, pyramid, cristal, object, plane, plane1, cristalLight],
    // controls: { enable: true, enableEvents: true, maxPolarAngle: Math.PI },
    // stats: true,
    isCasi: true,
  },
  {
    selector: ".container",
    containerParams: { width: "1920px", height: "1080px" },
  }
);

const cristalAnimation = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3.2, z: 5 },
    },
  },
  {
    selector: "!.cristal",
    duration: 2000,
    easing: "easeInOutSine",
  }
);
threeclip.addIncident(cristalAnimation, 0);
const cristalAnimationRotate = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      rotation: { x: 0, y: Math.PI, z: 0 },
    },
  },
  {
    selector: "!.cristal",
    duration: 4000,
  }
);
threeclip.addIncident(cristalAnimationRotate, 0);

const pointlghtAnimation = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3, z: 5 },
    },
  },
  {
    selector: "!#point_light",
    easing: "easeInOutSine",
    duration: 2000,
  }
);
threeclip.addIncident(pointlghtAnimation, 0);
const pointlghtAnimationRotate = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      rotation: { x: 0, y: Math.PI, z: 0 },
    },
  },
  {
    selector: "!#point_light",
    duration: 4000,
  }
);
threeclip.addIncident(pointlghtAnimationRotate, 0);
const cristalAnimation2 = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3.5, z: 5 },
    },
  },
  {
    selector: "!.cristal",
    duration: 2000,
    easing: "easeInOutSine",
  }
);
threeclip.addIncident(cristalAnimation2, 2000);

const pointlghtAnimation2 = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3.3, z: 5 },
    },
  },
  {
    selector: "!#point_light",
    easing: "easeInOutSine",
    duration: 2000,
  }
);
threeclip.addIncident(pointlghtAnimation2, 2000);

clip.addIncident(threeclip, 0);
