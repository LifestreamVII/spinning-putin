import * as THREE from './node_modules/three/build/three.module.js';

// scene
const scene = new THREE.Scene();
// camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(50, aspect, 1, 5000);
camera.position.set(0,0,8);

// renderer
let container = document.getElementById('container');

// renderer
const renderer = new THREE.WebGLRenderer({antialias: false, alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const meshs = [];

// 3 shapes

const createMesh = (geo, mat, posx, posy, posz)=>{
  
  const nb = 4;

  for(let j=0; j<nb; j++){
    posx+=2.9;
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(posx, posy, posz);
    mesh.rotation.set(0, 0, 0);
    scene.add(mesh);
    meshs.push(mesh);
  }
}

const loader = new THREE.TextureLoader();
loader.load('./assets/putin.png', (texture)=>{

  createMesh(
    new THREE.SphereBufferGeometry(1.1, 32, 32),
    new THREE.MeshLambertMaterial( { color: 0xeffffff, map: texture } ), -7.0, 0, 0);

  renderer.render(scene, camera);
});

const light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(5,5,5);
scene.add(light);

const ambient = new THREE.AmbientLight( 0x505050 ); // soft white light
scene.add( ambient );

function render() {
  
  meshs.forEach(m=>{
    m.rotateY(0.020);
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);

}

render();