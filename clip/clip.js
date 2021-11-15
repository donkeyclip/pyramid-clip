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
        color: "#7a7a7a",
        shininess: 10,
        // specular: 0x111111,
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
  geometry: { type: "CylinderGeometry", parameters: [0, 1, 1, 4, 1] },
  material: {
    type: "MeshPhongMaterial",
    parameters: [{
      color: "#6e7778",
      shininess: 10,
      // specular: 0x111111,
      dithering: true,
      // side: "BackSide",
    },],
  },
  settings: {
    position: { x: 0, y: -4.5, z: 5 },
    castShadow: true,
    receiveShadow: true,
    rotation:{x:0,y:.8,z:0}
  },
};



const cristal2 = {
  id: "cristal2",
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
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 0.4, y: .9, z: 0.4 },
    rotation:{ x:0 , y:35 , z:0 },
  },
  selector: "!#point_light"
};

const params = {
  color: 0xfff,
  transmission: 1,
  opacity: 1,
  metalness: .5,
  roughness: 0.31,
  ior: 2,
  thickness: 1,
  specularIntensity: .1,
  specularTint: 0xffffff,
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
        color: "#fff",
        metalness: params.metalness,
        roughness: params.roughness,
        ior: params.ior,
        envMapIntensity: params.envMapIntensity,
        transmission: params.transmission,
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
    rotation:{ x:0 , y:35 , z:0 },
    castShadow: true,
  },
  class: ["cristal"],

};

const object = {
  id: "myObj",
  object: true,
  settings: {
    position: { x: 0, y: -3, z: 1.7 },
  },
};
const SpotLight =  {
  // addHelper:true,
  id: "SpotLight",
  type: "SpotLight",
  parameters: ["0xfff",1.5],
  settings: {
    position: { x: 0, y: -1, z: 0},
    intensity:1.2,
    angle:.6,
    penumbra:1,
    target: "!#myObj",
    distance:40,
    decay:.5,
    castShadow :true
  },
}

const plane = {
  id: "plane",
  model: {
    loader: "GLTFLoader",
    file: "/plane2.glb",
  },
  settings:{
    position: { x:0, y: -1.5, z: .5 },
    // rotation:{x:-0.99,y:0,z:0},
    castShadow:true
  },
  children:["Plane",]
};

const threeclip = new threejs.Clip(
  {
    postProcessing: {
      bloomPass: {
        parameters: [0, 0, 0],
        settings: {
          threshold: 0,
          strength: 1,
          radius: 0.3,
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
        parameters: ["#e0e0e0", 1],
        settings: {
          position: { x: -3, y: 2, z: 5 },
        },
      },
      {
        addHelper:true,
        id: "DirectionalLight_light_top",
        type: "DirectionalLight",
        parameters: ["#c8d9db", .6],
        settings: {
          position: { x: -7, y: 2, z: -5 },
        },
      },
      SpotLight,
      {
        id: "point_light",
        type: "PointLight",
        parameters: ["#aa00ff", 1, 1.3],
        settings: {
          // target: "!#myObj",
          position: { x: 0, y: -3.5, z: 5 },
        },
        class: ["cristalL"]
      },
    ],
    cameras: {
      id: "camera_1",
      type: "PerspectiveCamera",
      settings: {
        position: { x: -4.791122175950593,
          y: -4.6115762068483175,
          z: 1.2913128345334934 },
        lookAt: [0,  -4.4,  5],
        far: 10000,
        near: 1,
      },
    },
    entities: [box, pyramid, cristal, object,plane,cristal2],
    controls: { enable: true, enableEvents: true, maxPolarAngle: Math.PI },
  },
  {
    selector: ".container",
    containerParams: { width: "1920px", height: "1080px" },
  }
);

const cristalAnimation = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3, z: 5 },
    },
  },
  {
    selector: "!.cristal",
    duration: 2000,
    easing:"easeInOutSine"
  }
);
threeclip.addIncident(cristalAnimation, 0);

const pointlghtAnimation = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3, z: 5 },
    },
  },
  {
    selector: "!#point_light",
    easing:"easeInOutSine",
    duration: 2000,
  }
);
threeclip.addIncident(pointlghtAnimation, 0);

const cristalAnimation2 = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3.5, z: 5 },
    },
  },
  {
    selector: "!.cristal",
    duration: 2000,
    easing:"easeInOutSine"
  }
);
threeclip.addIncident(cristalAnimation2, 2000);

const pointlghtAnimation2 = new threejs.ObjectAnimation(
  {
    animatedAttrs: {
      position: { x: 0, y: -3.5, z: 5 },
    },
  },
  {
    selector: "!#point_light",
    easing:"easeInOutSine",
    duration: 2000,
  }
);
threeclip.addIncident(pointlghtAnimation2, 2000);

clip.addIncident(threeclip, 0);
