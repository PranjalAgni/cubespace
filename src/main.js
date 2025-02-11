import "./style.css";
import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { World } from "./core/world";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { createUI } from "./ui/hud";

// Constants for light positions
const LIGHT1_POSITION = { x: 1, y: 1, z: 1 };
const LIGHT2_POSITION = { x: -1, y: 1, z: -0.5 };
const AMBIENT_LIGHT_INTENSITY = 0.1;

// Stats setup
const stats = new Stats();
document.body.appendChild(stats.dom);

// Renderer setup
const renderer = new Three.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.set(-32, 16, -32);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

// Scene setup
const scene = new Three.Scene();
const world = new World();
world.generate();
scene.add(world);

// Light setup
function setupLights() {
  const light1 = new Three.DirectionalLight();
  light1.position.set(LIGHT1_POSITION.x, LIGHT1_POSITION.y, LIGHT1_POSITION.z);
  scene.add(light1);

  const light2 = new Three.DirectionalLight();
  light2.position.set(LIGHT2_POSITION.x, LIGHT2_POSITION.y, LIGHT2_POSITION.z);
  scene.add(light2);

  const ambient = new Three.AmbientLight();
  ambient.intensity = AMBIENT_LIGHT_INTENSITY;
  scene.add(ambient);
}

// Handle window resize
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls on each animation frame
  stats.update(); // Update stats on each animation frame
  renderer.render(scene, camera);
}

// Event listeners
window.addEventListener("resize", handleResize);

// Initialize scene and start animation
setupLights();
createUI(world);
animate();
