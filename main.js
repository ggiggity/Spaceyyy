import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CubeTextureLoader } from "three";
import stars from "./stars.jpeg";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
//cam
camera.position.set(0, 10, 100);
///

//////light
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 40);
////star
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.23, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  let glows = [];
  star.position.set(x, y, z);
  scene.add(star);

  for (let i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
    let starGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2, 1),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      })
    );
    starGlow.castShadow = false;
    scaleX += 0.1 + Math.random() * 0.2;
    scaleY += 0.1 + Math.random() * 0.2;
    scaleZ += 0.1 + Math.random() * 0.2;
    starGlow.scale.set(scaleX, scaleY, scaleZ);
    starGlow.origScale = {
      x: scaleX,
      y: scaleY,
      z: scaleZ,
    };
    glows.push(starGlow);
    scene.add(starGlow);
  }
};
Array(500).fill().forEach(addStar);
///

const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
// scene.background = spaceTexture;

///sun
const sunTexture = new THREE.TextureLoader().load("sun2.jpeg");
const suntex = new THREE.TextureLoader().load("suntex.jpeg");
const geometry = new THREE.SphereGeometry(25, 50, 30);
const material = new THREE.MeshBasicMaterial({
  map: sunTexture,
  normalMap: suntex,
});
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);
///
///
const mercuryTexture = new THREE.TextureLoader().load("mercury.jpeg");
// const mercury = new THREE.TextureLoader().load("moon2.jpg");
const mercuryObj = new THREE.Object3D();
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(1.8, 18, 100),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);
mercuryObj.add(mercury);
scene.add(mercuryObj);
mercury.position.z = 30;

///moon

///
///venus
const venusTexture = new THREE.TextureLoader().load("venus.jpeg");
const venusObj = new THREE.Object3D();
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 18, 100),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venusObj.add(venus);
scene.add(venusObj);
venus.position.z = 40;
///
///earth
const earthTexture = new THREE.TextureLoader().load("earth.jpeg");
const earthObj = new THREE.Object3D();

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3.6, 18, 100),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);

earthObj.add(earth);
scene.add(earthObj);
earth.rotation.x = 0.3;
earth.position.z = 50;

const moonTexture = new THREE.TextureLoader().load("moon3.jpeg");
const texture = new THREE.TextureLoader().load("moon2.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 18, 100),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: texture,
  })
);
earth.add(moon);
moon.position.z = 5;
///mars
const marsTexture = new THREE.TextureLoader().load("mars.jpeg");
const marsObj = new THREE.Object3D();

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2, 18, 100),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
marsObj.add(mars);
scene.add(marsObj);
mars.position.z = 63;
mars.rotation.x = 0.3;

///
const aesTexture = new THREE.TextureLoader().load("aest.png");
const aestrid = new THREE.Mesh(
  new THREE.TorusGeometry(70, 1, 13, 80),
  new THREE.MeshStandardMaterial({
    wireframe: true,
  })
);
sun.add(aestrid);
aestrid.rotation.x = -0.5 * Math.PI;
///
///jupiter
const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpeg");
const jupiterObj = new THREE.Object3D();
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5, 18, 100),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiterObj.add(jupiter);
scene.add(jupiterObj);
jupiter.position.z = 80;
///saturn
const saturnTexture = new THREE.TextureLoader().load("saturn.jpeg");
const saturnNormal = new THREE.TextureLoader().load("saturn.jpeg");
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(8, 3, 2, 100),
  new THREE.MeshStandardMaterial({
    map: saturnNormal,
  })
);
const saturnObj = new THREE.Object3D();
saturnObj.add(ring);
ring.position.z = 95;
ring.rotation.x = -0.28 * Math.PI;

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4.3, 18, 100),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);
saturnObj.add(saturn);
scene.add(saturnObj);
saturn.rotation.x = 0.6;
saturn.position.z = 95;

///

function animate() {
  requestAnimationFrame(animate);
  sun.rotation.y += 0.006;
  moon.rotation.y += 0.008;
  mercury.rotation.y += 0.002;
  venus.rotation.y += 0.0008;
  earth.rotation.y += 0.06;
  mars.rotation.y += 0.06;
  jupiter.rotation.y += 0.2;
  saturn.rotation.y += 0.2;
  ring.rotateZ(0.2);
  /////
  mercuryObj.rotateY(0.04);
  venusObj.rotateY(0.008);
  earthObj.rotateY(0.006);
  marsObj.rotateY(0.0037);
  jupiterObj.rotateY(0.0009);
  saturnObj.rotateY(0.0001);

  renderer.render(scene, camera);
}
animate();
